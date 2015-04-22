app.controller("StudentsCtrl",
		function($http, $q, $log, $routeParams, $scope, dataStoreService) {
			$log.info("Students controller running...");

			var categoryName = "Students";
			$scope.category = null;

			$scope.filter = {};

			$scope.subcategories = [];
			$scope.subcategoryGroups = [];
			$scope.subsubcategories = [];
			$scope.filters = [];
			$scope.subcategorySelection = [];
			$scope.subcategoryGroupSelection = [];
			$scope.subsubcategorySelection = [];
			$scope.filterSelection = [];

			dataStoreService.getDataMetadata().then(
					function(result) {
						$scope.category = result.filter(function(e, i, a) {
							return e.name == categoryName;
						})[0];

						// Initialize selection
						$scope.subcategories = $scope.category.children;
						$scope.subcategorySelection = $scope.subcategories
								.map(function(k, v, a) {
									return null;
								});
						if ($scope.subcategories.length > 0) {
							$scope.subcategorySelection[0] = $scope.subcategories[0];
						}

						$log.log("initial ", $scope.subcategorySelection);
						$scope.subcategoryChanged($scope.subcategorySelection);
						
					});

			$scope.subcategoryChanged = function(c) {
				$log.log("Subcategory selected", c);
				$log.log("Subcategory selection", $scope.subcategorySelection);

				// Initialize subcategory group
				var subcat = $scope.subcategorySelection
						.reduce(function(prev, act, index, arr) {
							return prev == null ? act : prev;
						});
				$scope.subcategoryGroups = subcat != null ? subcat.children : [];
				$scope.subcategoryGroupSelection = $scope.subcategoryGroups
						.map(function(k, v, a) {
							return (k == 0) ? v : null;
						});
			}

			$scope.subcategoryGroupChanged = function(c) {
				$log.log("Subcategory group selected", c);
				$log.log("Subcategory group selection",
						$scope.subcategoryGroupSelection);

				// Initialize subcategory group
				var subcatgroup = $scope.subcategoryGroupSelection
						.reduce(function(prev, act, index, arr) {
							return prev == null ? act : prev;
						});
				$scope.subsubcategories = subcatgroup != null ? subcatgroup.children
						: [];
				$scope.subsubcategorySelection = $scope.subsubcategories
						.map(function(k, v, a) {
							return (k == 0) ? v : null;
						});
			}

			$scope.subsubcategoryChanged = function(c) {
				$log.log("Subsubcategory selected", c);
				$log.log("Subsubcategory selection", $scope.subsubcategorySelection);

				// Initialize subsubcategory
				var subsubcat = $scope.subsubcategorySelection
						.reduce(function(prev, act, index, arr) {
							return prev == null ? act : prev;
						});
				$scope.filters = subsubcat != null ? subcatgroup.children : [];
				$scope.filterSelection = $scope.filters.map(function(k, v, a) {
					return (k == 0) ? v : null;
				});
			}

			$scope.subsubcategoryChanged = function(c) {
				$log.log("Filter selected", c);
				$log.log("Filter selection", $scope.filterSelection);
			}

		});