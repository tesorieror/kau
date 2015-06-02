/**
 * New node file
 */

app.controller('RouteCtrl', function($scope, $route, $routeParams, $location) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
})

app
    .config(function($routeProvider, $locationProvider) {
	    $routeProvider
	        .when('/Book/:bookId', {
	          templateUrl : 'book.html',
	          controller : 'BookCtrl',
	          resolve : {
		          delay : function($q, $timeout) {
			          var delay = $q.defer();
			          $timeout(delay.resolve, 1000);
			          return delay.promise;
		          }
	          }
	        })
	        .when('/Book/:bookId/ch/:chapterId', {
	          templateUrl : 'chapter.html',
	          controller : 'ChapterCtrl'
	        })
	        .when('/main', {
	          templateUrl : './pages/main.html',
	          controller : 'MainCtrl'
	        })
	        .when('/Highlights', {
	          templateUrl : './pages/highlights.html',
	          controller : 'HighlightsCtrl'
	        })
	        .when('/Freshmen', {
	          templateUrl : './pages/freshmen.html',
	          controller : 'FreshmenCtrl'
	        })
	        .when(
	            '/description/:root/category/:category/subcategory/:subcategory/subsubcategory/:subsubcategory/subsubsubcategory/:subsubsubcategory',
	            {
	              templateUrl : './pages/description.html',
	              controller : 'DescriptionCtrl'
	            })
	        .when(
	            '/description/:root/category/:category/subcategory/:subcategory/subsubcategory/:subsubcategory/subsubsubcategory/:subsubsubcategory/subsubsubsubcategory/:subsubsubsubcategory',
	            {
	              templateUrl : './pages/description.html',
	              controller : 'DescriptionCtrl'
	            })
	        .when('/aboutUnit', {
	          templateUrl : './pages/about-unit.html',
	          controller : 'AboutUnitCtrl'
	        })
	        .when('/goalOfUnit', {
	          templateUrl : './pages/goal-of-the-unit.html',
	          controller : 'GoalOfTheUnitCtrl'
	        })
	        .when('/data', {
	          templateUrl : './pages/category.html',
	          controller : 'CategoryCtrl'
	        })
	        .when('/data/category/:category', {
	          templateUrl : './pages/category.html',
	          controller : 'CategoryCtrl'
	        })
	        .when('/data/category/:category/subcategory/:subcategory', {
	          templateUrl : './pages/table.html',
	          controller : 'TableCtrl'
	        })
	        .when(
	            '/data/category/:category/subcategory/:subcategory/subsubcategory/:subsubcategory',
	            {
	              templateUrl : './pages/bar.html',
	              controller : 'BarCtrl'

	            })
	        .when(
	            '/data/category/:category/subcategory/:subcategory/subsubcategory/:subsubcategory/subsubsubcategory/:subsubsubcategory',
	            {
	              templateUrl : './pages/bar-2.html',
	              controller : 'BarCtrl2'
	            }).otherwise({
		        redirectTo : '/index.html'
	        });
	    // configure html5 to get links working on jsfiddle
	    // $locationProvider.html5Mode(true);
    });