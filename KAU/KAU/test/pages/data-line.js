app.controller("DataLineCtrl",
		function($http, $q, $log, $routeParams, $scope, dataStoreService) {

			$scope.accordionStatus = {
				category : false,
				subcategory : false,
				group : false,
				subsubcategory : false,
				filter : false,
				period : false
			};

			$scope.data = [ {
				name : "Students",
				children : [ {
					name : "Freshmen",
					children : [ {
						name : "Gender",
						children : [ {
							name : "Male",
							children : []
						}, {
							name : "Female",
							children : []
						} ]
					}, {
						name : "Nationality",
						children : [ {
							name : "Saudi",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Non-Saudi",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Degree",
						children : [ {
							name : "Bachelore",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Diploma",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Higher Diploma",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Master",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "PhD",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Field",
						children : [ {
							name : "Education",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Humanities and Arts",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Social Sciences: Business and Law",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Science",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Engineering: Manufacturing Industries and Construction",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Agriculture",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Health and Social Services",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Not known programmes",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Adminsitrative Areas",
						children : [ {
							name : "Riyad",
							children : []
						}, {
							name : "Makkah",
							children : []
						}, {
							name : "Jazan",
							children : []
						}, {
							name : "Eastern Province",
							children : []
						}, {
							name : "Asir",
							children : []
						}, {
							name : "Al-Qassim",
							children : []
						}, {
							name : "Ha'il",
							children : []
						}, {
							name : "Al-Madinah",
							children : []
						}, {
							name : "Al-Baha",
							children : []
						}, {
							name : "Northern Border",
							children : []
						}, {
							name : "Tabuk",
							children : []
						}, {
							name : "Najran",
							children : []
						}, {
							name : "Al-Jawf",
							children : []
						} ]
					} ]
				},  {
					name : "Enrolled",
					children : [ {
						name : "Gender",
						children : [ {
							name : "Male",
							children : []
						}, {
							name : "Female",
							children : []
						} ]
					}, {
						name : "Nationality",
						children : [ {
							name : "Saudi",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Non-Saudi",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Degree",
						children : [ {
							name : "Bachelore",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Diploma",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Higher Diploma",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Master",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "PhD",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Field",
						children : [ {
							name : "Education",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Humanities and Arts",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Social Sciences: Business and Law",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Science",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Engineering: Manufacturing Industries and Construction",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Agriculture",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Health and Social Services",
							children : [ "Male", "Female", "Total" ]
						}, {
							name : "Not known programmes",
							children : [ "Male", "Female", "Total" ]
						} ]
					}, {
						name : "Adminsitrative Areas",
						children : [ {
							name : "Riyad",
							children : []
						}, {
							name : "Makkah",
							children : []
						}, {
							name : "Jazan",
							children : []
						}, {
							name : "Eastern Province",
							children : []
						}, {
							name : "Asir",
							children : []
						}, {
							name : "Al-Qassim",
							children : []
						}, {
							name : "Ha'il",
							children : []
						}, {
							name : "Al-Madinah",
							children : []
						}, {
							name : "Al-Baha",
							children : []
						}, {
							name : "Northern Border",
							children : []
						}, {
							name : "Tabuk",
							children : []
						}, {
							name : "Najran",
							children : []
						}, {
							name : "Al-Jawf",
							children : []
						} ]
					} ]
				}, {
					name : "Graduated",
					children : []
				}, {
					name : "Aboard",
					children : []
				} ]
			} ];

			$scope.selected = [];
			$scope.selected[0] = $scope.data.filter(function(elem, index, array) {
				return elem.name == $routeParams.category;
			})[0];
			$scope.selected[1] = $scope.selected[0].children
					.filter(function(elem, index, array) {
						return elem.name == $routeParams.subcategory;
					})[0];
			$scope.selected[2] = $scope.selected[1].children
					.filter(function(elem, index, array) {
						return elem.name == $routeParams.group;
					})[0];
			$scope.selected[3] = $scope.selected[2].children
					.filter(function(elem, index, array) {
						return elem.name == $routeParams.subsubcategory;
					})[0];
			$scope.selected[4] = $scope.selected[3].children
					.filter(function(elem, index, array) {
						return elem.name == $routeParams.filter;
					})[0];

			$log.log();

			$scope.indicator = new Indicator();
			$scope.indicator.setValuesFromArray($routeParams);
			$scope.period = {};

			$log.log($scope.indicator);

			$scope.categoryChanged = function() {
				$log.log("Category changed");
				$scope.indicator.category = $scope.selected[0].name;
				$scope.selected[1] = $scope.selected[0].children[0];				
				$scope.subcategoryChanged();
			}

			$scope.subcategoryChanged = function() {
				$log.log("Subcategory changed");
				$scope.indicator.subcategory = $scope.selected[1].name;
				$scope.selected[2] = $scope.selected[1].children[0];				
				$scope.groupChanged();
			}

			$scope.groupChanged = function() {
				$log.log("Group changed");
				$scope.indicator.group = $scope.selected[2].name;
				$scope.selected[3] = $scope.selected[2].children[0];				
				$scope.subsubcategoryChanged()
			}

			$scope.subsubcategoryChanged = function() {
				$log.log("Subsubcategory changed");
				$scope.indicator.subsubcategory = $scope.selected[3].name;
				$scope.selected[4] = $scope.selected[3].children[0];				
				$scope.filterChanged();
			}

			$scope.filterChanged = function() {				
				$scope.indicator.filter = $scope.selected[4];
				$log.log("Filter changed");
				$scope.updateChart();
			}

			$scope.updateChart = function() {
				$log.log('Update chart');
			}

		});