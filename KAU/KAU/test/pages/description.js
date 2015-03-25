/**
 * New node file
 */

app.controller('DescriptionCtrl', function($scope, $http, $q, $log,
		$routeParams, dataStoreService) {

	$scope.title = "DESCRIPTION";
	var indicator = new Indicator();
	indicator.setValuesFromArray($routeParams);	
	$log.log(indicator);
	
	dataStoreService.getDescriptionFor(indicator).then(function(result){
		$scope.description=result[indicator.category][indicator.subcategory][indicator.subsubcategory][indicator.filter];
	});
	
});