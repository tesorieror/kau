app.directive('rDateFromTo', function() {
	return {
		restrict : 'E',
		templateUrl : 'directives/r-date-from-to.html',
		controller : 'RDateFromToCtrl',
		scope : {
			years : '=',
			period : '=',
			fromChange : '&',
			toChange : '&'
		},
	};
});

app.filter("filterFromYears", function() {
	return function(years, toYear) {
		var answer = [];
		angular.forEach(years, function(value, key) {
			if (value <= toYear)
				answer.push(value);
		});
		return answer;
	};
});

app.filter("filterToYears", function() {
	return function(years, fromYear) {
		var answer = [];
		angular.forEach(years, function(value, key) {
			if (value >= fromYear)
				answer.push(value);
		});
		return answer;
	};
});

app.controller('RDateFromToCtrl', function($scope, $log) {
	// $scope.period.years = $scope.years;
	// $scope.period.fromYear = $scope.years[0];
	// $scope.period.toYear = $scope.years[$scope.years.length - 1];

	$scope.updatePeriod = function() {
		var yrs = $scope.years;
		$scope.period.years = yrs.slice(yrs.indexOf($scope.period.toYear), yrs
				.indexOf($scope.period.fromYear) + 1);
		$log.log('Period changed ', $scope.period);
	}
});