/**
 * New node file
 */

app.controller('RouteCtrl', function($scope, $route, $routeParams, $location) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
})

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/Book/:bookId', {
		templateUrl : 'book.html',
		controller : 'BookCtrl',
		resolve : {
			delay : function($q, $timeout) {
				var delay = $q.defer();
				$timeout(delay.resolve, 1000);
				return delay.promise;
			}
		}
	}).when('/Book/:bookId/ch/:chapterId', {
		templateUrl : 'chapter.html',
		controller : 'ChapterCtrl'
	}).when('/Main', {
		templateUrl : './pages/main.html',
		controller : 'MainCtrl'
	}).when('/Highlights', {
		templateUrl : './pages/highlights.html',
		controller : 'HighlightsCtrl'
	}).when('/Freshmen', {
		templateUrl : './pages/freshmen.html',
		controller : 'FreshmenCtrl'
	}).when('/Description/:category/:subcategory/:subsubcategory/:filter', {
		templateUrl : './pages/description.html',
		controller : 'DescriptionCtrl'
	}).when('/AboutUnit', {
		templateUrl : './pages/about-unit.html',
		controller : 'AboutUnitCtrl'
	}).when('/GoalOfTheUnit', {
		templateUrl : './pages/goal-of-the-unit.html',
		controller : 'GoalOfTheUnitCtrl'
	}).when('/Data/:category/:subcategory', {
		templateUrl : './pages/data-table.html',
		controller : 'DataTableCtrl'
	}).when('/Data/:category/:subcategory/:group', {
		templateUrl : './pages/data-bar.html',
		controller : 'DataBarCtrl'
	}).when('/Data/:category/:subcategory/:group/:subsubcategory', {
		templateUrl : './pages/data-line.html',
		controller : 'DataLineCtrl'
	}).otherwise({
		redirectTo : '/index.html'
	});
	// configure html5 to get links working on jsfiddle
	// $locationProvider.html5Mode(true);
});