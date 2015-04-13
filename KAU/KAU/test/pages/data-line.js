app.controller("DataLineCtrl", function($http, $q, $log, $routeParams, $scope,
		dataStoreService) {

	$scope.accordionStatus = {
		category : false,
		subcategory : false,
		group : false,
		subsubcategory : false,
		filter : false,
		period : false
	};

	$scope.selected = [];
	$scope.indicator = new Indicator();

	$q.all([ dataStoreService.getYears(), dataStoreService.getDataMetadata() ])
			.then(function(results) {
				$scope.period = $scope.period = new Period(results[0]);
				$scope.data = results[1];
				initialize();
			});

	function initialize() {
		$scope.selected[0] = $scope.data.filter(function(elem, index, array) {
			return elem.name == $routeParams.category;
		})[0];
		$scope.selected[1] = $scope.selected[0].children.filter(function(elem,
				index, array) {
			return elem.name == $routeParams.subcategory;
		})[0];
		$scope.selected[2] = $scope.selected[1].children.filter(function(elem,
				index, array) {
			return elem.name == $routeParams.group;
		})[0];
		$scope.selected[3] = $scope.selected[2].children.filter(function(elem,
				index, array) {
			return elem.name == $routeParams.subsubcategory;
		})[0];
		$scope.selected[4] = $scope.selected[3].children.filter(function(elem,
				index, array) {
			return elem.name == $routeParams.filter;
		})[0];

		$scope.categoryChanged();
		$scope.periodChanged();
	}

	$scope.categoryChanged = function() {
		$log.log("Category changed");
		if ($scope.selected[0]) {
			$scope.indicator.category = $scope.selected[0].name;
			$scope.selected[1] = $scope.selected[0].children[0];
			$scope.subcategoryChanged();
		} else {
			$scope.indicator.category = null;
			$scope.selected[1] = null;
		}
	}

	$scope.subcategoryChanged = function() {
		$log.log("Subcategory changed");
		if ($scope.selected[1]) {
			$scope.indicator.subcategory = $scope.selected[1].name;
			$scope.selected[2] = $scope.selected[1].children[0];
			$scope.groupChanged();
		} else {
			$scope.indicator.subcategory = null;
			$scope.selected[2] = null;
		}
	}

	$scope.groupChanged = function() {
		$log.log("Group changed");
		if ($scope.selected[2]) {
			$scope.indicator.group = $scope.selected[2].name;
			$scope.selected[3] = $scope.selected[2].children[0];
			$scope.subsubcategoryChanged()
		} else {
			$scope.indicator.group = null;
			$scope.selected[3] = null;

		}
	}

	$scope.subsubcategoryChanged = function() {
		$log.log("Subsubcategory changed");
		if ($scope.selected[3]) {
			$scope.indicator.subsubcategory = $scope.selected[3].name;
			$scope.selected[4] = $scope.selected[3].children[0];
			$scope.filterChanged();
		} else {
			$scope.indicator.subsubcategory = null;
			$scope.selected[4] = null;
		}
	}

	$scope.filterChanged = function() {
		$scope.indicator.filter = $scope.selected[4];
		$log.log("Filter changed");
		$scope.updateChart();
	}
	$scope.periodChanged = function() {
		$log.log("Period changed");
		$scope.indicator.years = $scope.period.getPeriod();
		$scope.updateChart();
	}

	$scope.updateChart = function() {
		$log.log('Update chart');
	}

});