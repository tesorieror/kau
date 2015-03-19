app.directive('myPie', function() {
	return {
		restrict : 'E',
		templateUrl : './controller/pie.html',
		controller : 'pieCtrl',
		scope : {
			onselect : '&onSelect',
			onready : '&onReady',
			onTitleClick : '&',
			title : '@',
			chart : '='
		},
	};
});

app.controller('pieCtrl', function($scope, $log, $http) {
//	$log.log('Pie controller ok!');
});