/**
 * New node file
 */

var app = angular.module('app', []);

app.controller('CompositionController', function($scope, $log) {
	$log.log("Composition");

	function sayHello(name) {
		$log.log('Hello ' + name);
	}

	function run(f){
		$log.log("Running run");
		return f();
	}
	
	//run(function(){sayHello('Richard')});
	var crun = curry(run);
	var cSayHello = curry(sayHello);
	crun(cSayHello('Richard'));
	
});