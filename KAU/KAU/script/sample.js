/**
 * New node file
 */
var app = angular.module('app', []);

app.service('service', function() {
	var _name = 'Noname';
	var _children = [];

	this.getName = function() {
		return _name;
	}

	this.setName = function(name) {
		_name = name;
	}

	this.getChildren = function() {
		return _children;
	}

	this.addChildren = function(ch) {
		_children.push(ch);
	}

});

//app.provider('provider', function() {
//
//});

app.factory('factory', function() {
	var result = {};
	
	var _name = 'Noname';
	var _children = [];

	result.getName = function() {
		return _name;
	}

	result.setName = function(name) {
		_name = name;
	}

	result.getChildren = function() {
		return _children;
	}

	result.addChildren = function(ch) {
		_children.push(ch);
	}	
	
	return result;
});

app.controller('ServiceController', function($scope, $log, service, factory) {
	$scope.name = 'None';
	service.setName('Root');
	$scope.name = service.getName();
});

app.controller('ServiceController2', function($scope, $log, service, factory) {
	$scope.name = 'None2';
//	service.setName('Root2');
	$scope.name = service.getName();
});


app.controller('FactoryController', function($scope, $log, service, factory) {
	$scope.name = 'None';
	factory.setName('FRoot');
	$scope.name = factory.getName();
});

app.controller('FactoryController2', function($scope, $log, service, factory) {
	$scope.name = 'None2';
//	factory.setName('FRoot2');
	$scope.name = factory.getName();
});

