/**
 * New node file
 */

/**
 * Factory for data access
 */

app.factory('dataStoreService', function($http, $q, $log) {

	function toJsonDescriptionFilename(indicator) {
		var category = indicator.category.toLowerCase();
		var subcategory = indicator.subcategory.toLowerCase();
		return DATA_JSON + category + '_' + subcategory + '_desc.json';
	}

	function getYearsFilename() {
		return DATA_JSON + 'years.json';
	}

	function getDataBarGroupsFilename() {
		return DATA_JSON + 'data-bar-groups.json';
	}
	function getDataBarLegendsFilename() {
		return DATA_JSON + 'data-bar-legends.json';
	}
	function getDataMetadataFilename() {
		return DATA_JSON + 'data-metadata.json';
	}
	return {

		getDataMetadata : function() {
			var deferred = $q.defer();
			// $log.log(getYearsFilename());
			$http.get(getDataMetadataFilename()).then(function(result) {
				deferred.resolve(result.data);
			}, function(error) {
				$log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		getYears : function() {
			var deferred = $q.defer();
			// $log.log(getYearsFilename());
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

		getData : function(indicator) {
			// $log.log("Data indicator: ", indicator);

			var yearCalls = [];
			angular.forEach(indicator.getDataFilenames(), function(fn) {
				yearCalls.push($http.get(fn));
			});

			$log.log('Indicator data filenames ', indicator.getDataFilenames());
			$log.log('yearCalls ', yearCalls);
			
			var deferred = $q.defer();
			$q.all(yearCalls).then(function(results) {
				var answer = [];
				$log.log('years ', indicator.years);
				$log.log('results ', results);
				angular.forEach(indicator.years, function(yr, i) {
					answer[yr] = results[i].data;
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

		getDataBarGroups : function() {
			var deferred = $q.defer();
			$http.get(getDataBarGroupsFilename()).then(function(result) {
				deferred.resolve(result.data);
			}, function(error) {
				$log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
			});
			return deferred.promise;
		},

		getDataBarLegends : function() {
			var deferred = $q.defer();
			$http.get(getDataBarLegendsFilename()).then(function(result) {
				deferred.resolve(result.data);
			}, function(error) {
				$log.error(error);
				deferred.reject(error);
			}, function(update) {
				deferred.update(update);
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
		},

		getAboutUnit : function() {
			var deferred = $q.defer();
			$http.get(DATA_JSON + 'about-unit.json').then(function(result) {
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
	};
});