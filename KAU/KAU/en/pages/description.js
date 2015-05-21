/**
 * New node file
 */

app
    .controller(
        'DescriptionCtrl',
        function($scope, $http, $q, $log, $routeParams, dataStoreService,
            $window) {
	        $log.log("Route Params", $routeParams);

	        // Path
	        var path = [ $routeParams.root, $routeParams.category,
	            $routeParams.subcategory, $routeParams.subsubcategory,
	            $routeParams.subsubsubcategory ];
	        if ($routeParams.subsubsubsubcategory)
		        path.push($routeParams.subsubsubsubcategory);

	        // Chart types
	        $scope.chartTypes = [ {
	          label : "Table",
	          id : "Table",
	          draw : buildTable
	        }, {
	          label : "Column",
	          id : "ColumnChart",
	          draw : buildColumnChart
	        }, {
	          label : "Line",
	          id : "LineChart",
	          draw : buildLineChart
	        }, ];

	        $scope.chartType = $scope.chartTypes[0];

	        // Chart object
	        this.chartObject = {};
	        $scope.data = [];

	        // Data
	        var years;
	        var descriptions;

	        $q.all(
	            [ dataStoreService.getYears(),
	                dataStoreService.getDescriptionForPath(path) ]).then(
	            function(results) {
		            years = results[0];
		            descriptions = results[1];
		            initialize();
	            });

	        /**
					 * Initialization
					 */

	        function initialize() {
		        // Period
		        $scope.years = years;
		        $scope.from = _.last(years);
		        $scope.to = _.first(years);

		        // Description
		        // $log.log("descriptions", descriptions);
		        // $log.log("subsub", $routeParams.subsubcategory);
		        // $log.log("subsubsub", $routeParams.subsubsubcategory);
		        var desc = descriptions[$routeParams.subsubcategory][$routeParams.subsubsubcategory];
		        if ($routeParams.subsubsubsubcategory)
			        desc = desc[$routeParams.subsubsubsubcategory];
		        $scope.description = desc;
		        $log.log("Description", $scope.description);

		        // Title
		        $scope.title = $scope.description.title;
		        $scope.chartRefresh();
	        }

	        /**
					 * Period
					 */

	        $scope.periodChanged = function() {
		        $scope.chartRefresh();
	        }

	        function getPeriod() {
		        var s = $scope.years.indexOf($scope.to);
		        var e = $scope.years.indexOf($scope.from);
		        return $scope.years.slice(s, e + 1);
	        }

	        /**
					 * Chart refresh
					 */

	        $scope.chartRefresh = function() {
		        var period = getPeriod();

		        $q.all(_.map(period, function(year) {
			        return dataStoreService.getDataForPath(path.concat(year));
		        })).then(function(results) {
			        var data = _.reduce(period, function(data, year) {
				        data[year] = results[period.indexOf(year)];
				        return data;
			        }, []);
			        $log.log("Data", data);
			        $scope.chartObject = $scope.chartType.draw(data);
			        $log.log("Chart Object", $scope.chartObject);

		        });
	        }

	        /**
					 * Chart builder
					 */

	        function buildColumnChart() {
		        var rows = [];
		        var actual = -1;
		        var last = -1;
		        var total = 0;
		        for (yr in $scope.data) {
			        var value = $scope.data[yr];
			        if (yr >= $scope.indicator.fromYear
			            && yr <= $scope.indicator.toYear) {
				        var val = value[$scope.indicator.subsubcategory][$scope.indicator.filter];
				        total = total + val;
			        }
		        }

		        for (yr in $scope.data) {
			        var value = $scope.data[yr];
			        if (yr >= $scope.indicator.fromYear
			            && yr <= $scope.indicator.toYear) {
				        last = actual;
				        actual = value[$scope.indicator.subsubcategory][$scope.indicator.filter];
				        var growth = (actual / total) * 100;

				        rows.push({
					        "c" : [ {
						        "v" : yr
					        }, {
						        "v" : actual
					        }, {
						        "v" : growth
					        } ]
				        });
			        }
		        }

		        return {
		          "type" : 'ColumnChart',
		          "displayed" : true,
		          "data" : {
		            "cols" : [ {
		              "id" : "year",
		              "label" : "Year",
		              "type" : "string",
		              "p" : {}
		            }, {
		              "id" : "value-id",
		              "label" : "Freshmen",
		              "type" : "number",
		              "p" : {}
		            }, {
		              "type" : "number",
		              "role" : "annotation"
		            } ],
		            "rows" : rows
		          },
		          "options" : {
		            "title" : $scope.description.title,
		            "legend" : {
			            "position" : "bottom"
		            },
		            "isStacked" : "true",
		            "fill" : 20,
		            "displayExactValues" : true,
		            "vAxis" : {
		              "title" : "Students",
		              "gridlines" : {
			              "count" : 10
		              }
		            },
		            "hAxis" : {
			            "title" : "Year"
		            }
		          },
		          "formatters" : {
			          "number" : [ {
			            "columnNum" : 2,
			            "suffix" : "%",
			            "fractionDigits" : 2
			          } ]
		          }
		        };

	        }

	        function buildLineChart() {
		        var chData = buildColumnChart();
		        chData['type'] = 'LineChart';
		        return chData;
	        }

	        function buildPieChart() {
		        var chData = buildColumnChart();
		        chData["options"]["legend"]["position"] = "right";
		        chData['type'] = 'PieChart';
		        return chData;
	        }

	        /**
					 * Table
					 */

	        function buildTable(data) {
		        var rows = [];
		        var actual = -1;
		        var last = -1;

		        var period = Object.keys(data).reverse();
		        $log.log(period);

		        period
		            .forEach(function(yr) {
			            var value = data[yr];
			            if (yr >= _.first(period) && yr <= _.last(period)) {
				            last = actual;
				            actual = value[$routeParams.subsubcategory][$routeParams.subsubsubcategory];
				            if ($routeParams.subsubsubsubcategory)
					            actual = actual[$routeParams.subsubsubsubcategory];
				            var growth = (last == -1) ? 0 : (actual / last - 1) * 100;
				            rows.push({
					            "c" : [ {
						            "v" : yr
					            }, {
						            "v" : actual
					            }, {
						            "v" : growth
					            } ]
				            });
			            }
		            });

		        rows = rows.reverse();
		        return {
		          "type" : 'Table',
		          "displayed" : true,
		          "data" : {
		            "cols" : [ {
		              "id" : "year",
		              "label" : "Year",
		              "type" : "string",
		              "p" : {}
		            }, {
		              "id" : "value-id",
		              "label" : "Value",
		              "type" : "number",
		              "p" : {}
		            }, {
		              "id" : "growth-id",
		              "label" : "Growth rate",
		              "type" : "number",
		              "p" : {}
		            } ],
		            "rows" : rows
		          },
		          "options" : {
		            "width" : "100%",
		            "title" : $scope.description.title,
		            "legend" : {
			            "position" : "bottom"
		            },
		            "isStacked" : "true",
		            "fill" : 20,
		            "displayExactValues" : true,
		            "vAxis" : {
		              "title" : "Students",
		              "gridlines" : {
			              "count" : 10
		              }
		            },
		            "hAxis" : {
			            "title" : "Year"
		            }
		          },
		          "formatters" : {
		            "number" : [ {
		              "columnNum" : 2,
		              "suffix" : "%",
		              "fractionDigits" : 2
		            } ],
		            "arrow" : [ {
		              "columnNum" : 2,
		              "suffix" : "%",
		              "fractionDigits" : 2,
		              "base" : 0
		            } ]
		          }
		        };
	        }

	        /**
					 * Back button
					 */
	        $scope.back = function() {
		        $window.history.back();
	        }

        });
