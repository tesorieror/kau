app.directive('rSelection', function() {
	return {
		restrict : 'E',
		templateUrl : 'directives/r-selection.html',
		controller : 'RSelectionCtrl',
		scope : {
			items : '=',
			selection : '=',
			label : '@',
			changed : '&',
		},
	};
});

app.controller('RSelectionCtrl', function($scope, $log, $attrs) {
	$scope.filterString = '';
	$scope.selection = {};
	$scope.clearFilterString = function() {
	}
});