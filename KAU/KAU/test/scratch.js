var app = angular.module('scratchApp', []);

/**
 * Avoid cache (review this for optimization)
 */
app.config([ '$httpProvider', function($httpProvider) {
	// initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}
	// disable IE ajax request caching
	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
} ]);
