console.log('Start');

var app = angular.module("app", []);

app.controller('appCtrl', function($scope, $http, $q, $log) {

	// $http.get('../json/', function(result){$log.log(result);});

	// for the purpose of this example let's assume that variables `$q` and
	// `okToGreet`
	// are available in the current lexical scope (they could have been injected
	// or passed in).

	function asyncGreet(name) {
		// perform some asynchronous operation, resolve or reject the promise when
		// appropriate.
		
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (okToGreet(name)) {
					resolve('Hello, ' + name + '!');
				} else {
					reject('Greeting ' + name + ' is not allowed.');
				}
			}, 1000);
		});
	}

	var promise = asyncGreet('Robin Hood');
	promise.then(function(greeting) {
		alert('Success: ' + greeting);
	}, function(reason) {
		alert('Failed: ' + reason);
	});

	$log.log("Hola");
});