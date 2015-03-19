var app = angular.module('ui.bootstrap.demo', [ 'ui.bootstrap', "googlechart"  ]);

app.config([ '$httpProvider', function($httpProvider) {
	// initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}
	// disable IE ajax request caching
	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
} ]);

app.controller('ModalDemoCtrl', function($scope, $modal, $log) {

	$scope.open = function(size) {

		var modalInstance = $modal.open({
			templateUrl : 'modal-dialog.html',
			controller : 'modalDialogInstanceCtrl',
			size : size,
			resolve : {
				indicator : function() {
					return {
						category : 'Students',
						subcategory : 'Freshmen',
						filters : [ "Male" ]
					};
				}
			}
		});
	};
});

app.factory('dataStoreService', function($http, $q, $log) {

	function toJsonDataFilename(year, indicator) {
		var category = indicator.category.toLowerCase();
		var subcategory = indicator.subcategory.toLowerCase();
		return './json/' + year + '_' + category + '_' + subcategory + '_data.json';
	}

	function toJsonDescriptionFilename(indicator) {
		var category = indicator.category.toLowerCase();
		var subcategory = indicator.subcategory.toLowerCase();
		return './json/' + category + '_' + subcategory + '_desc.json';
	}

	function getYearsFilename() {
		return './json/years.json';
	}

	return {
		getYears : function() {
			var deferred = $q.defer();
			$log.log(getYearsFilename());
			$http.get(getYearsFilename()).then(function(result) {
				deferred.resolve(result.data);
			}, function(error) {
				$log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		getDescriptionFor : function(indicator) {
			var deferred = $q.defer();
			$log.log(toJsonDescriptionFilename(indicator));

			$http.get(toJsonDescriptionFilename(indicator)).then(function(result) {
				deferred.resolve(result.data);
			}, function(error) {
				//$log.error(error);
				deferred.reject(error);  
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		getDataForYear : function(years, indicator) {
			var deferred = $q.defer();

			$http.get(toJsonDataFilename(year, indicator)).then(function(result) {
				deferred.resolve(answer.data);
			}, function(error) {
				$log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		getDataForYears : function(years, indicator) {
			var yearCalls = [];
			angular.forEach(years, function(year) {
				yearCalls.push($http.get(toJsonDataFilename(year, indicator)));
			});

			var deferred = $q.defer();
			$q.all(yearCalls).then(function(results) {
				var answer = [];
				angular.forEach(years, function(yr, i) {
					answer[yr] = results[i].data
				});
				deferred.resolve(answer);
			}, function(errors) {
				$log.error(errors);
				deferred.reject(errors);
			}, function(updates) {
				deferred.update(updates);
			});
			return deferred.promise;
		}
	}
});