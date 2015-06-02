/**
 * New node file
 */
/**
 * Factory for data access
 */

app.factory('indicatorFactory', function($http, $q, $log, dataStoreService) {

	var factory = {};

	var params = [ '', 'category', 'subcategory', 'subsubcategory',
	    'subsubsubcategory', 'subsubsubsubcategory' ];

	var _stringPath = null;
	var _stringPathArray = [];
	var _categoryArray = [];
	var _categories = null;

	var _years = null;
	var _from = null;
	var _to = null;

	factory.load = function(stringPath, loaded) {
		$log.info('Loading UI for ' + stringPath);
		_stringPath = stringPath;
		_stringPathArray = getPathStringArray();

		var rootString = _stringPathArray[0];

		$q
		    .all(
		        [ dataStoreService.getMetadata(rootString),
		            dataStoreService.getYears() ]).then(function(results) {
			    _categories = results[0];
			    _years = results[1];
			    _from = _.last(_years);
			    _to = _.first(_years);
			    loaded();
		    });
	};

	factory.getTitle = function() {
		var revPath = _stringPathArray.slice(0).reverse();
		// Converts data into Data
		revPath[revPath.length - 1] = revPath[revPath.length - 1].firstToUpper();
		return _.reduce(revPath, function(result, elem) {
			return result.concat(elem).concat(' ');
		}, '');
	};

	factory.getCategoryAtLevel = function(level) {
		var children = _categories;
		var result = _stringPathArray[0];
		for (i = 1; i <= level; i++) {
			result = _.detect(children, function(cat) {
				return cat.name == _stringPathArray[i];
			});
			children = result.children;
		}
		return result;
	}

	/**
	 * Period
	 */

	factory.getYears = function() {
		return _years;
	};

	factory.getFrom = function() {
		return _from
	};

	factory.getTo = function() {
		return _to
	};

	factory.setFrom = function(from) {
		_from = from
	};

	factory.setTo = function(to) {
		_to = to
	};

	/**
	 * Auxiliary functions
	 */

	function getPathStringArray() {
		var result = [];
		$log.log("_stringPath", _stringPath);
		var path = _stringPath.split("/");
		$log.log("path", path);
		// Remove empty spaces
		path = _.filter(path, function(e) {
			return e.length > 0;
		});
		$log.log("path", path);
		// Remove category separators
		var j = 0;
		for (i = 0; i < path.length; i++)
			if (i % 2 == 0)
				result[j++] = path[i];
		$log.log("getPathStringArray result", result);
		return result;
	}

	return factory;
});

// {
//
// load : load,
// getRootString : _getRootString,
// getTitle : _getTitle,
// getPathString : _getPathString,
// setYears : _setYears,
// setFrom : _setFrom,
// setTo : _setTo,
// getPeriod : _getPeriod,
// getCategoryAt : _getCategoryAt,
// // getChildrenCategoryNamesAt : _getChildrenCategoryNamesAt,
// getPathStringAt : _getPathStringAt,
// getPathStringAtFor : _getPathStringAtFor,
// retrieveData : _retrieveData
// };
//
// function _load(pPathString, pLoaded) {
// // Path
// this.pathString = pPathString;
// updatePath();
//
// $q.all(
// [ dataStoreService.getMetadata(_getRootString()),
// dataStoreService.getYears() ]).then(function(results) {
// $log.log("Results", results);
//
// // Category
// this.metadata = results[0];
//
// // Period
// this.years = results[1];
// updatePeriod();
//
// // Data
// updateTitle();
//
// pLoaded();
// }, function(error) {
// $log.error(error)
// }, function(notice) {
// $log.info(notice)
// });
// }
//
// function updateTitle() {
//
// }
//
// function updatePath() {
//
// }
//
// function updatePeriod() {
// this.from = _.last(this.years);
// this.to = _.first(this.years);
// }
//
// function _getRootString() {
// return path[0];
// }
//
//
//
// function _getPathString() {
// return _getPathStringAt(path.length - 1);
// // var result = '/'.concat(this.path[0] ? this.path[0].concat('/') : '');
// // for (i = 2; i < this.path.length; i = i + 2)
// // result = result.concat(this.path[i] ? this.path[i - 1].concat('/')
// // .concat(this.path[i]).concat('/') : '');
// // return result;
// }
//
// function _getTitle() {
// var revPath = path.reverse();
// return _.reduce(revPath, function(result, elem) {
// return result.concat(elem).concat(' ');
// }, '');
// }
//
// function _setFrom(pFrom) {
// from = pFrom;
// }
//
// function _setTo(pTo) {
// to = pTo;
// }
//
// function _getPeriod() {
// var s = years.indexOf(to);
// var e = years.indexOf(from);
// return years.slice(s, e + 1);
// }
//
// function _getCategoryAt(level) {
// $log.log("getCategoryAt", level);
// $log.log("Metadata", metadata);
// var children = metadata;
// var result = null;
// for (i = 1; i < level + 1; i++) {
// result = _.detect(children, function(cat) {
// // return cat.name == categoryName;
// return cat.name == path[i];
// });
// children = result.children;
// }
// return result;
// }
//
// function _getChildrenCategoryNamesAt(level) {
// return _.map(_getCategoryAt(level).children, function(cat) {
// return cat.name;
// });
// }
//
// function _getPathStringAt(level) {
// var result = '/' + path[0];
// for (i = 1; i <= level; i++)
// result = result.concat('/').concat(categoryParams[i]).concat('/').concat(
// path[i]);
// return result;
// }
//
// function _getPathStringAtFor(level, category) {
// return _getPathStringAt(level).concat(categoryParams[level + 1])
// .concat('/').concat(category.name);
// }
//
// function _retrieveData(dataRetrieved) {
// var period = _getPeriod();
// $q.all(_.map(period, function(year) {
// return dataStoreService.getDataForYear(this.path, year);
// })).then(function(results) {
// var data = _.reduce(period, function(res, year) {
// res[year] = results[period.indexOf(year)];
// return res;
// }, []);
// dataRetrieved(data);
// // var type = $scope.selectedChartType.id;
// // var filter = $scope.filter;
// // var chart = build(type, data, filter, period);
// // $scope.chart = chart;
// });
//
// }

// });
