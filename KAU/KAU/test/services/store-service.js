/**
 * New node file
 */

/**
 * Factory for data access
 */

var DATA_JSON = '../test/json/';

function Indicator() {
	category: null;
	subcategory: null;
	subsubcategory: null;
	filter: null;
	years: [];
}

Indicator.prototype.setValuesFromArray = function(arr) {	
	this.category = ('category' in arr) ? arr['category'] : this.category;
	this.subcategory = ('subcategory' in arr) ? arr['subcategory'] : this.subcategory;
	this.subsubcategory = ('subcategory' in arr) ? arr['subsubcategory'] : this.subsubcategory;
	this.filter = ('filter' in arr) ? arr['filter'] : this.filter;
	this.years = ('years' in arr) ? arr['years'] : this.years;
}

Indicator.prototype.getDataFilenames = function() {
	var category = this.category.toLowerCase();
	var subcategory = this.subcategory.toLowerCase();
	// var subsubcategoty = this.subsubcategory.toLowerCase();
	// var filter = this.filter.toLowerCase();
	var result = [];
	angular.forEach(this.years, function(yr) {
		result.push(DATA_JSON + yr + '_' + category + '_' + subcategory + '_data.json')
	});
	return result;
}

Indicator.prototype.getDescriptionFilenames = function() {
	var category = this.category.toLowerCase();
	var subcategory = this.subcategory.toLowerCase();
	// var subsubcategoty = this.subsubcategory.toLowerCase();
	// var filter = this.filter.toLowerCase();
	var result = [];
	for (yr in this.years)
		result.push(DATA_JSON + years[yr] + '_' + category + '_' + subcategory + '_desc.json');
	return result;
}

app.factory('dataStoreService', function($http, $q, $log) {

	function toJsonDescriptionFilename(indicator) {
		var category = indicator.category.toLowerCase();
		var subcategory = indicator.subcategory.toLowerCase();
		return DATA_JSON + category + '_' + subcategory + '_desc.json';
	}

	function getYearsFilename() {
		return DATA_JSON + 'years.json';
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
				// $log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		// getDataForYear : function(year, indicator) {
		// var deferred = $q.defer();
		// $http.get(toJsonDataFilename(year, indicator)).then(function(result) {
		// deferred.resolve(answer.data);
		// }, function(error) {
		// $log.error(error);
		// deferred.reject(error);
		// }, function(update) {
		// deferred.update(update);
		// });
		// return deferred.promise;
		// },

		// getDataForYears : function(years, indicator) {
		// var yearCalls = [];
		// angular.forEach(years, function(year) {
		// yearCalls.push($http.get(toJsonDataFilename(year, indicator)));
		// });
		//
		// var deferred = $q.defer();
		// $q.all(yearCalls).then(function(results) {
		// var answer = [];
		// angular.forEach(years, function(yr, i) {
		// answer[yr] = results[i].data
		// });
		// deferred.resolve(answer);
		// }, function(errors) {
		// $log.error(errors);
		// deferred.reject(errors);
		// }, function(updates) {
		// deferred.update(updates);
		// });
		// return deferred.promise;
		// },

		getData : function(indicator) {
			$log.log(indicator);

			var yearCalls = [];
			angular.forEach(indicator.getDataFilenames(), function(fn) {
				yearCalls.push($http.get(fn));
			});
			var deferred = $q.defer();
			$q.all(yearCalls).then(function(results) {
				var answer = [];
				angular.forEach(indicator.years, function(yr, i) {
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
		},

		getHighlights : function() {
			var deferred = $q.defer();
			$http.get(DATA_JSON + 'highlights.json').then(function(result) {
				// $log.log("Result", result.data);
				deferred.resolve(result.data);
			}, function(error) {
				deferred.reject(error);
				$log.error(error);
			}, function(update) {
				deferred.update(update);
				$log.error(update);
			});
			return deferred.promise;
		},

		getCategories : function() {
			var deferred = $q.defer();
			$http.get(DATA_JSON + 'categories.json').then(function(result) {
				// $log.log("Result", result.data);
				deferred.resolve(result.data);
			}, function(error) {
				deferred.reject(error);
				$log.error(error);
			}, function(update) {
				deferred.update(update);
				$log.error(update);
			});
			return deferred.promise;
		},

		getSubCategories : function(category) {
			var deferred = $q.defer();
			$http.get(DATA_JSON + category + '.json').then(function(result) {
				// $log.log("Result", result.data);
				deferred.resolve(result.data);
			}, function(error) {
				deferred.reject(error);
				$log.error(error);
			}, function(update) {
				deferred.update(update);
				$log.error(update);
			});
			return deferred.promise;
		}
	};
});