/**
 * New node file
 */
app.directive('myCell', function() {
	return {
		restrict : 'E',
		templateUrl : './controller/cell.html',
		controller : 'myCellCtrl',
		scope : {
			title : '@',
			subtitle1 : '@',
			subtitle2 : '@',
			arrow : '@',
			description : '@',
			onCellClick : '&',
			row : '@',
			col : '@',
		},
	};
});

app.controller('myCellCtrl', function($scope, $log, $http, $attrs) {

	$log.log($scope.row + '@' + $scope.col);

});