app
		.controller(
				"StudentsCtrl",
				function($http, $q, $log, $routeParams, $scope, dataStoreService) {
					$log.info("Students controller running...");

					var categoryName = "Students";
					$scope.category = null;

					$scope.filter = {};

					$scope.filter.subcategories = [];
					$scope.filter.subcategoryGroups = [];
					$scope.filter.subsubcategories = [];
					$scope.filter.filters = [];
					$scope.filter.subcategorySelection = [];
					$scope.filter.subcategoryGroupSelection = [];
					$scope.filter.subsubcategorySelection = [];
					$scope.filter.filterSelection = [];

					dataStoreService
							.getDataMetadata()
							.then(
									function(result) {
										$scope.category = result.filter(function(e, i, a) {
											return e.name == categoryName;
										})[0];

										// Initialize selection
										$scope.filter.subcategories = $scope.category.children;
										$scope.filter.subcategorySelection = $scope.filter.subcategories
												.map(function(v,iv, a) {
													return null;
												});
										if ($scope.filter.subcategories.length > 0) {
											$scope.filter.subcategorySelection[0] = $scope.filter.subcategories[0];
										}

										$log.log("initial ", $scope.filter.subcategorySelection);
										$scope
												.subcategoryChanged($scope.filter.subcategorySelection);

									});

					$scope.subcategoryChanged = function(c) {
						$log.log("Subcategory selected", c);
						$log.log("Subcategory selection",
								$scope.filter.subcategorySelection);

						// Initialize subcategory group
						var subcat = $scope.filter.subcategorySelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);
						$scope.filter.subcategoryGroups = subcat != null ? subcat.children
								: [];
						$scope.filter.subcategoryGroupSelection = $scope.filter.subcategoryGroups
								.map(function(v, i, a) {
									return (i == 0) ? v : null;
								});
						// Propagate selection change
						$scope
								.subcategoryGroupChanged($scope.filter.subcategoryGroupSelection);

					}

					$scope.subcategoryGroupChanged = function(c) {
						$log.log("Subcategory group selected", c);
						$log.log("Subcategory group selection",
								$scope.filter.subcategoryGroupSelection);

						// Initialize subcategory group
						var subcatgroup = $scope.filter.subcategoryGroupSelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);

						$scope.filter.subsubcategories = subcatgroup != null ? subcatgroup.children
								: [];

						$scope.filter.subsubcategorySelection = $scope.filter.subsubcategories
								.map(function(v, i, a) {
									return (i == 0) ? v : null;
								});

						// Propagate selection change
						$scope.subsubcategoryChanged($scope.filter.subsubcategorySelection);
					}

					$scope.subsubcategoryChanged = function(c) {
						$log.log("Subsubcategory selected", c);
						$log.log("Subsubcategory selection",
								$scope.filter.subsubcategorySelection);

						// Initialize subsubcategory
						var subsubcat = $scope.filter.subsubcategorySelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);
						$scope.filter.filters = subsubcat != null ? subsubcat.children : [];

						$scope.filter.filterSelection = $scope.filter.filters
								.map(function(v, i, a) {
									return (i == 0) ? v : null;
								});
						// Propagate selection change
						$scope.filterChanged($scope.filter.filterSelection);
					}

					$scope.filterChanged = function(c) {
						$log.log("Filter selected", c);
						$log.log("Filter selection", $scope.filter.filterSelection);
					}

				});