app.controller("DataLineCtrl", function($http, $q, $log, $routeParams, $scope,
		dataStoreService) {

	$scope.hierarchicalFilter = null;

	$scope.accordionStatus = {
		filter : false,
		period : false
	};

	$scope.radioModel = 'Field';

	$scope.filter = {};

	$scope.indicator = new Indicator();
	$scope.indicator.setValuesFromArray($routeParams);
	$scope.period = {};

	$log.log("Route params", $routeParams);
});