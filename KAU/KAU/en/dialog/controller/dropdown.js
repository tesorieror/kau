app.directive('myDropdown', function() {
	return {
		restrict : 'E',
		scope : {
			selection : '=',
			source : '=',
			items : '=?'
		},
		templateUrl : './controller/dropdown.html',
		controller : 'dropdownCtrl'
	};
});

app.controller('dropdownCtrl', function($scope, $log, $http, $attrs) {
	// $log.log($attrs.items);
	// if ($scope.aItems)
	// $scope.items = $scope.aItems;
	// else
	// $scope.items = [];
	$scope.items = ($scope.items != null) ? $scope.items : [];

	$scope.selected = 'No selection';

	$scope.setSelected = function(item) {
		$scope.selected = item;
		$scope.selection(item);
	}

	$scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	};

	if ($scope.source != null && $scope.items.length == 0)
		$http.get($scope.source).success(function(response) {
			$scope.items = response;
			if ($scope.items.length > 0)
				$scope.setSelected($scope.items[0]);
			else
				$scope.setSelected('NO SELECTION');
		});

});