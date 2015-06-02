/**
 * New node file
 */

app.controller('BarCtrl2', function($scope, $log, $location, $q, $route,
    $filter, $location, indicatorFactory) {
	$log.info("Loading Column Bar Data Controller");

	// Set up indicator
	var indicator = indicatorFactory;

	// Load data
	indicator.load($location.path(), initialize);

	// Initialize
	function initialize() {
		// Title
		$scope.title = indicator.getTitle();

		// Category
		var category = indicator.getCategoryAtLevel(1);

		// Subcategories
		$scope.subcategories = category.children;
		$scope.subcategory = indicator.getCategoryAtLevel(2);

		// Subsubcategories
		$scope.subsubcategories = $scope.subcategory.children;
		$scope.subsubcategory = indicator.getCategoryAtLevel(3);

		// Subsubsubcategories
		$scope.subsubsubcategories = $scope.subsubcategory.children;
		$scope.subsubsubcategory = indicator.getCategoryAtLevel(4);

		// Subsubsubsubcategories
		$scope.subsubsubsubcategories = $scope.subsubsubcategory.children;

		// Period
		$scope.years = indicator.getYears();
		$scope.from = indicator.getFrom();
		$scope.to = indicator.getTo();

		// ChartType
		$scope.chartTypes = [ {
		  name : "Columns",
		  id : "ColumnChart"
		}, {
		  name : "Lines",
		  id : "LineChart"
		} ];

		$scope.chartType = $scope.chartTypes[0];

	}

	// Column Bar
	function build(type, data, filter, period) {

		var keys = buildKeys(metadata, filter);
		var chart = {
		  "type" : type,
		  "displayed" : true,
		  "data" : {
		    "cols" : buildCols(keys),
		    "rows" : buildRows(keys, data, period)
		  },
		  "options" : {
		    "isStacked" : true,
		    "backgroundColor" : "transparent",
		    "chartArea" : {
		      "left" : "100",
		      "top" : "20",
		      "height" : "350"
		    },
		    "titlePosition" : "none",
		    "title" : buildTitle() + " " + buildSubtitle(period),
		    "legend" : {
		      "position" : "right",
		      "maxLines" : "3",
		      "textStyle" : {
			      "fontSize" : "11"
		      },
		    },
		    "vAxis" : {
			    "title" : "Students"
		    },
		    "hAxis" : {
			    "title" : "Years"
		    }
		  }
		};
		// $log.log("Column Chart ", chart);
		return chart;
	}

	function buildTitle() {
		return $scope.subcategory.name.firstToUpper() + " "
		    + $scope.category.name.firstToUpper() + " by "
		    + $scope.subsubcategory.name.firstToUpper();
	}

	function buildSubtitle(period) {
		return "from " + _.last(period) + " to " + _.first(period);
	}

	function buildKeys(metadata, filter) {
		var result;
		var cat = $scope.subsubcategory;

		// Subsubsubcotegory names
		result = _.map(cat.children, function(subcat) {
			return subcat.name
		});

		// Subsubcategory key
		result = _.map(result, function(name) {
			var subcat = _.detect(cat.children, function(c) {
				return c.name == name;
			});
			if (subcat.children.length == 0)
				return [ cat.name, name ];
			else
				return [ cat.name, name, 'Total' ];
		});

		// Filter
		result = result.filter(function(curr, ind, arr) {
			return filter[curr[1]];
		});
		return result;
	}

	function buildCols(keys) {
		var result;
		result = keys.reduce(function(prev, curr, ind, arr) {
			prev.push({
			  "id" : curr[1] + "ID",
			  "label" : curr[1],
			  "type" : "number",
			  "p" : {}
			});
			return prev;
		}, [ {
		  "id" : "indicator",
		  "label" : "Indicator",
		  "type" : "string",
		  "p" : {},
		} ]);
		return result;
	}

	function buildRows(keys, data, period) {
		return period.map(function(year, ind, arr) {
			return {
				"c" : keys.reduce(function(prev, key, ind, arr) {
					prev.push({
						"v" : rowValue(data[year], key)
					});
					return prev;
				}, [ {
					"v" : year
				} ])
			}
		});
	}

	function rowValue(obj, key) {
		return key.reduce(function(prev, k, ind, arr) {
			return prev[k];
		}, obj);
	}
});