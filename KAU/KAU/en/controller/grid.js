app.directive('myGrid', function() {
	return {
		restrict : 'E',
		templateUrl : './controller/grid.html',
		controller : 'gridCtrl',
		scope : {
			matrix : '=',
		},
	};
});

app.controller('gridCtrl', function($scope, $log, $http, $attrs) {
	$log.log('Grid controller ok!');
	$log.log($attrs.matrix);
});

