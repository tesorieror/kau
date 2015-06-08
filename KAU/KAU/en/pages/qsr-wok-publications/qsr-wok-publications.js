app.controller('QSRWoKPublicationsCtrl', function($scope, $log, $location, $q,
    $route, $filter, $location, indicatorFactory, qsrWoKPublicationsTable) {

	$log.info("Loading QSRWoKPublicationsCtrl Controller");
//	$log.log("Params", $route.current.params);

	// Set up indicator
	var indicator = indicatorFactory;

	// Load data
	indicator.load($location.path(), initialize);

	// Initialize
	function initialize() {
		// Title
		$scope.title = indicator.getTitle();
		//
		// Category
		var category = indicator.getCategoryAtLevel(1);

		// Subcategories
		$scope.subcategories = category.children;
		$scope.subcategory = indicator.getCategoryAtLevel(2);
		//
		// Subsubcategories
		$scope.subsubcategories = $scope.subcategory.children;
		$scope.subsubcategory = indicator.getCategoryAtLevel(3);

		// Subsubsubcategories
		$scope.subsubsubcategories = $scope.subsubcategory.children;

		$log.log($scope.subsubcategory);

		// $scope.subsubsubcategory = indicator.getCategoryAtLevel(4);
		//
		// // Subsubsubsubcategories
		// $scope.subsubsubsubcategories = $scope.subsubsubcategory.children;
		//
		// Period
		$scope.years = indicator.getYears();
		$scope.from = indicator.getFrom();
		$scope.to = indicator.getTo();
		//
		// ChartType
		$scope.chartTypes = [ {
		  name : "Table",
		  id : "Table",
		  factory : qsrWoKPublicationsTable
		}, {
		  name : "Columns",
		  id : "ColumnChart",
		  factory : null
		}, {
		  name : "Lines",
		  id : "LineChart",
		  factory : null
		// TODO Set properly
		} ];

		$scope.chartType = $scope.chartTypes[0];

		// filter
		$scope.filter = indicator.getFilter();

		// Refresh chart
		$scope.refreshChart = function() {
			indicator.setFrom($scope.from);
			indicator.setTo($scope.to);
			indicator.setFilter($scope.filter);
			$scope.chartType.factory.build(function(chart) {
				$scope.chart = chart;
			});
		}
		// Show default chart
		$scope.refreshChart();
	}
	//
	// /**
	// * Hide chart if no information is chosen
	// */
	//
	// $scope.isFilterEmpty = function() {
	// var result = false;
	// for (filterElement in $scope.filter)
	// result = result || $scope.filter[filterElement];
	// return !result;
	// }
});