app.controller('detailModalDialogCtrl', function($scope, $http, $q, $modalInstance, $log, indicator, dataStoreService) {

	$scope.indicator = indicator;

	$scope.years = [];
	$scope.fromYear = null;
	$scope.toYear = null;
	$scope.fromYears = [];
	$scope.toYears = [];

	$scope.description = {};
	$scope.data = [];
	$scope.displayTypes = [ 'Table', 'ColumnChart', 'LineChart', "PieChart" ];
	$scope.displayType = $scope.displayTypes[0];

	this.chartObject = {};

	$scope.ok = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.close = function() {
		$modalInstance.close();
	};

	var chartBuilder = {};

	chartBuilder[$scope.displayTypes[0]] = buildTable;
	chartBuilder[$scope.displayTypes[1]] = buildColumnChart;
	chartBuilder[$scope.displayTypes[2]] = buildLineChart;
	chartBuilder[$scope.displayTypes[3]] = buildPieChart;
	
	
	function buildColumnChart() {

		var rows = [];
		var actual = -1;
		var last = -1;

		var total = 0;
		for (yr in $scope.data) {
			var value = $scope.data[yr];
			if (yr >= $scope.fromYear && yr <= $scope.toYear) {
				var val = ($scope.indicator.filters.length > 1) ? value[$scope.indicator.filters[0]][$scope.indicator.filters[1]] : value[$scope.indicator.filters[0]];
				total = total + val;
			}
		}

		for (yr in $scope.data) {
			var value = $scope.data[yr];
			if (yr >= $scope.fromYear && yr <= $scope.toYear) {
				last = actual;
				actual = ($scope.indicator.filters.length > 1) ? value[$scope.indicator.filters[0]][$scope.indicator.filters[1]] : value[$scope.indicator.filters[0]];
				// $log.log('actual', actual);
				// $log.log('last', last);
				// $log.log('total', total);
				var growth = (actual / total) * 100;
				// $log.log('growth', growth);
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
	
	function buildTable() {
		var rows = [];
		var actual = -1;
		var last = -1;

		for (yr in $scope.data) {
			var value = $scope.data[yr];
			if (yr >= $scope.fromYear && yr <= $scope.toYear) {
				last = actual;
				actual = ($scope.indicator.filters.length > 1) ? value[$scope.indicator.filters[0]][$scope.indicator.filters[1]] : value[$scope.indicator.filters[0]];
				// $log.log('actual', actual);
				// $log.log('last', last);
				var growth = (last == -1) ? 0 : (actual / last - 1) * 100;
				// $log.log('growth', growth);
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

	dataStoreService.getYears().then(function(years) {
		$scope.years = years;
		$scope.fromYears = years.slice();
		$scope.toYears = years.slice();
		$scope.fromYear = $scope.fromYears[$scope.fromYears.length - 1];
		$scope.toYear = $scope.toYears[0];
		$q.all([ dataStoreService.getDataForYears(years, indicator), dataStoreService.getDescriptionFor(indicator) ]).then(function(result) {
			var data = result[0];
			var description = result[1];
			if (indicator.filters.length > 1)
				$scope.description = description[indicator.filters[0]][indicator.filters[1]];
			else
				$scope.description = description[indicator.filters[0]];
			$scope.data = data;
			$scope.updateData();
		});
	});

	$scope.updateData = function() {
		// $log.log('Update data', $scope.displayType);

		// $log.log('Indicator filters:', $scope.indicator.filters);
		// $log.log('Data: ', $scope.data);
		// $log.log('Data size: ', $scope.data.length);
		// $log.log('Description: ', $scope.description);

		$scope.chartObject = chartBuilder[$scope.displayType]();

	}

});
