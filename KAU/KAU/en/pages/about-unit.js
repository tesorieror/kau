/**
 * New node file
 */

app.controller('AboutUnitCtrl', function($scope, $log, $location,
    dataStoreService) {
	$scope.activePath = $location.path();
	// Data
	// $scope.data = {};

	// dataStoreService.getAboutUnit().then(function(result) {
	// $scope.data = result;
	// });

});