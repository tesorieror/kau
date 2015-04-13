app
		.controller(
				"DataLineCtrl",
				function($http, $q, $log, $routeParams, $scope, dataStoreService) {

					$scope.accordionStatus = {
						category : false,
						subcategory : false,
						group : false,
						subsubcategory : false,
						filter : false,
						period : false
					};

					// var data = [ {
					// name : "Students",
					// children : [
					// {
					// name : "Freshmen",
					// children : [
					// {
					// name : "Gender",
					// children : [ {
					// name : "Male",
					// children : []
					// }, {
					// name : "Female",
					// children : []
					// } ]
					// },
					// {
					// name : "Nationality",
					// children : [ {
					// name : "Saudi",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Non-Saudi",
					// children : [ "Male", "Female", "Total" ]
					// } ]
					// },
					// {
					// name : "Degree",
					// children : [ {
					// name : "Bachelore",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Diploma",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Higher Diploma",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Master",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "PhD",
					// children : [ "Male", "Female", "Total" ]
					// } ]
					// },
					// {
					// name : "Field",
					// children : [
					// {
					// name : "Education",
					// children : [ "Male", "Female", "Total" ]
					// },
					// {
					// name : "Humanities and Arts",
					// children : [ "Male", "Female", "Total" ]
					// },
					// {
					// name : "Social Sciences: Business and Law",
					// children : [ "Male", "Female", "Total" ]
					// },
					// {
					// name : "Science",
					// children : [ "Male", "Female", "Total" ]
					// },
					// {
					// name : "Engineering: Manufacturing Industries and Construction",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Agriculture",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Health and Social Services",
					// children : [ "Male", "Female", "Total" ]
					// }, {
					// name : "Not known programmes",
					// children : [ "Male", "Female", "Total" ]
					// } ]
					// }, {
					// name : "Adminsitrative Areas",
					// children : [ {
					// name : "Riyad",
					// children : []
					// }, {
					// name : "Makkah",
					// children : []
					// }, {
					// name : "Jazan",
					// children : []
					// }, {
					// name : "Eastern Province",
					// children : []
					// }, {
					// name : "Asir",
					// children : []
					// }, {
					// name : "Al-Qassim",
					// children : []
					// }, {
					// name : "Ha'il",
					// children : []
					// }, {
					// name : "Al-Madinah",
					// children : []
					// }, {
					// name : "Al-Baha",
					// children : []
					// }, {
					// name : "Northern Border",
					// children : []
					// }, {
					// name : "Tabuk",
					// children : []
					// }, {
					// name : "Najran",
					// children : []
					// }, {
					// name : "Al-Jawf",
					// children : []
					// } ]
					// } ]
					// }, {
					// name : "Enrolled",
					// children : []
					// }, {
					// name : "Graduated",
					// children : []
					// }, {
					// name : "Aboard",
					// children : []
					// } ]
					// } ];

					var filterData = {
						"Students" : {
							"Freshmen" : {
								"Gender" : {
									"Male" : [],
									"Female" : [],
								},
								"Nationality" : {
									"Saudi" : [ "Male", "Female", "Total" ],
									"Non-Saudi" : [ "Male", "Female", "Total" ],
								},
								"Degree" : {
									"Diploma" : [ "Male", "Female", "Total" ],
									"Bachelore" : [ "Male", "Female", "Total" ],
									"Higher Diploma" : [ "Male", "Female", "Total" ],
									"Master" : [ "Male", "Female", "Total" ],
									"PhD" : [ "Male", "Female", "Total" ],
								},
								"Field" : {
									"Education" : [ "Male", "Female", "Total" ],
									"Humanities and Arts" : [ "Male", "Female", "Total" ],
									"Social Sciences: Business and Law" : [ "Male", "Female",
											"Total" ],
									"Science" : [ "Male", "Female", "Total" ],
									"Engineering: Manufacturing Industries and Construction" : [
											"Male", "Female", "Total" ],
									"Agriculture" : [ "Male", "Female", "Total" ],
									"Health and Social Services" : [ "Male", "Female", "Total" ],
									"Not known programmes" : [ "Male", "Female", "Total" ],
								},
								"Administrative Areas" : {
									"Riyad" : [],
									"Makkah" : [],
									"Jazan" : [],
									"Eastern Province" : [],
									"Asir" : [],
									"Al-Qassim" : [],
									"Ha'il" : [],
									"Al-Madinah" : [],
									"Al-Baha" : [],
									"Northern Border" : [],
									"Tabuk" : [],
									"Najran" : [],
									"Al-Jawf" : [],
								}
							},
							"Enrolled" : {},
							"Graduated" : {},
							"Aboard" : {},
						}
					};

					$scope.indicator = new Indicator();
					$scope.indicator.setValuesFromArray($routeParams);
					$scope.indicator.years = {};

					$log.log("Route params", $routeParams);

					$scope.levels = [];

					$scope.levels[0] = Object.keys(filterData);
					$scope.indicator.category = $scope.levels[0][0];

					$scope.levels[1] = Object.keys(filterData[$scope.indicator.category]);
					$scope.indicator.subcategory = $scope.levels[1][0];

					$scope.levels[2] = Object
							.keys(filterData[$scope.indicator.category][$scope.indicator.subcategory]);
					$scope.indicator.group = $scope.levels[2][0];

					$scope.levels[3] = Object
							.keys(filterData[$scope.indicator.category][$scope.indicator.subcategory][$scope.indicator.group]);
					$scope.indicator.subsubcategory = $scope.levels[3][0];

					// $log.log($scope.levels[0][0]);
					// $log.log(filterData);

					$scope.levels[4] = filterData[$scope.indicator.category][$scope.indicator.subcategory][$scope.indicator.group][$scope.indicator.subsubcategory];
					// $scope.indicator.subsubcategory = $scope.levels[4][0];

					dataStoreService.getYears().then(function(data) {
						$scope.indicator.years = data;
						$log.log("Indicator params", $scope.indicator);
					});

					$scope.categoryChanged = function() {
						$log.log("Category changed");
						$scope.levels[1] = Object
								.keys(filterData[$scope.indicator.category]);
						$scope.indicator.subcategory = $scope.levels[1][0];
					}

					$scope.subcategoryChanged = function() {
						$log.log("Subcategory changed");
						$scope.levels[2] = Object
								.keys(filterData[$scope.indicator.category][$scope.indicator.subcategory]);
						$scope.indicator.group = $scope.levels[2][0];
					}

					$scope.groupChanged = function() {
						$log.log("Group changed");
						$scope.levels[3] = Object
								.keys(filterData[$scope.indicator.category][$scope.indicator.subcategory][$scope.indicator.group]);
						$scope.indicator.subsubcategory = $scope.levels[3][0];
					}

				});