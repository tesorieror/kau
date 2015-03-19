/**
 * New node file
 */

app.controller('DescriptionCtrl',
		function($scope, $http, $q, $log, dataStoreService) {
			$log.log('Description Controller');
			$scope.title = "DESCRIPTION";
			$log.log($scope.indicator);
		});