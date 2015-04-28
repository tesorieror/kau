app
		.controller(
				"StudentsCtrl",
				function($http, $q, $log, $routeParams, $scope, dataStoreService, $filter) {
					// $log.info("Students controller running...");

					$scope.chartBuilders = [];
					$scope.chartBuilders[0] = new TableChartBuilder();
					$scope.chartBuilders[1] = new TableChartBuilder();
					$scope.chartBuilders[2] = new TableChartBuilder();

					$scope.builder = $scope.chartBuilders[0];
					$scope.dataFilterString = '';

					$scope.chart = {};

					$scope.plainData = [];

					var categoryName = "Students";
					$scope.category = null;
					$scope.period = null;

					$scope.accordionStatus = {};
					$scope.accordionStatus.filter = false;
					$scope.accordionStatus.period = true;

					$scope.filter = {};

					$scope.filter.subcategories = [];
					$scope.filter.subcategoryGroups = [];
					$scope.filter.subsubcategories = [];
					$scope.filter.filters = [];
					$scope.filter.subcategorySelection = [];
					$scope.filter.subcategoryGroupSelection = [];
					$scope.filter.subsubcategorySelection = [];
					$scope.filter.filterSelection = [];

					$q
							.all([ dataStoreService.getYears(),

							dataStoreService.getDataMetadata() ])
							.then(
									function(result) {
										$scope.period = new Period(result[0]);
										// $log.log($scope.period);
										$scope.category = result[1].filter(function(e, i, a) {
											return e.name == categoryName;
										})[0];

										// Initialize selection
										$scope.filter.subcategories = $scope.category.children;
										$scope.filter.subcategorySelection = $scope.filter.subcategories
												.map(function(v, iv, a) {
													return null;
												});
										if ($scope.filter.subcategories.length > 0) {
											$scope.filter.subcategorySelection[0] = $scope.filter.subcategories[0];
										}

										// $log.log("initial ", $scope.filter.subcategorySelection);
										$scope
												.subcategoryChanged($scope.filter.subcategorySelection);

									});

					$scope.subcategoryChanged = function(c) {
						// $log.log("Subcategory selected", c);
						// $log.log("Subcategory selection",
						// $scope.filter.subcategorySelection);

						// Initialize subcategory group
						var subcat = $scope.filter.subcategorySelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);
						$scope.filter.subcategoryGroups = subcat != null ? subcat.children
								: [];

						// $scope.filter.subcategoryGroupSelection =
						// $scope.filter.subcategoryGroups
						// .map(function(v, i, a) {
						// return (i == 0) ? v : null;
						// });
						$scope.filter.subcategoryGroupSelection = [];

						// Propagate selection change
						$scope
								.subcategoryGroupChanged($scope.filter.subcategoryGroupSelection);

					}

					$scope.subcategoryGroupChanged = function(c) {
						// $log.log("Subcategory group selected", c);
						// $log.log("Subcategory group selection",
						// $scope.filter.subcategoryGroupSelection);

						// Initialize subcategory group
						var subcatgroup = $scope.filter.subcategoryGroupSelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);

						$scope.filter.subsubcategories = subcatgroup != null ? subcatgroup.children
								: [];

						// $scope.filter.subsubcategorySelection =
						// $scope.filter.subsubcategories
						// .map(function(v, i, a) {
						// return (i == 0) ? v : null;
						// });

						$scope.filter.subsubcategorySelection = [];

						// Propagate selection change
						$scope.subsubcategoryChanged($scope.filter.subsubcategorySelection);
					}

					$scope.subsubcategoryChanged = function(c) {
						// $log.log("Subsubcategory selected", c);
						// $log.log("Subsubcategory selection",
						// $scope.filter.subsubcategorySelection);

						// Initialize subsubcategory
						var subsubcat = $scope.filter.subsubcategorySelection.reduce(
								function(prev, act, index, arr) {
									return prev == null ? act : prev;
								}, null);
						$scope.filter.filters = subsubcat != null ? subsubcat.children : [];

						// $scope.filter.filterSelection = $scope.filter.filters
						// .map(function(v, i, a) {
						// return (i == 0) ? v : null;
						// });

						$scope.filter.filterSelection = [];

						// Propagate selection change
						$scope.filterChanged($scope.filter.filterSelection);
					}

					$scope.filterChanged = function(c) {
						// $log.log("Filter selected", c);
						// $log.log("Filter selection", $scope.filter.filterSelection);
						// $log.log('chart built!', $scope.builder);
						updateChart();

					}

					$scope.dataFilterStringChanged = function() {
						updateChart();
					}

					function updateChart() {
						var indicator = new Indicator();
						indicator.period = $scope.period;
						indicator.category = $scope.category.name;
						// From filter
						indicator.subcategory = $scope.filter.subcategorySelection.length == 0 ? ''
								: $scope.filter.subcategorySelection[0].name;
						indicator.group = $scope.filter.subcategoryGroupSelection.length == 0 ? ''
								: $scope.filter.subcategoryGroupSelection[0].name;
						indicator.subsubcategory = $scope.filter.subsubcategorySelection.length == 0 ? ''
								: $scope.filter.subsubcategorySelection;
						indicator.filter = $scope.filter.filterSelection.length == 0 ? ''
								: $scope.filter.filterSelection[0].name;

						dataStoreService.getData(indicator).then(
								function(data) {
									// $log.log('Indicator: ', indicator);
									// $log.log('Data: ', data);
									// $log.log('Data filter string ', $scope.dataFilterString);
									var chart = $scope.builder.build(data);
									chart.data.rows = $filter('filter')(chart.data.rows,
											$scope.dataFilterString);
//									chart.data.rows = $filter('strict')(chart.data.rows);
									$scope.chart = chart;
									// $log.log('Chart data ', $scope.chart.data.rows);
								});

						// dataStoreService.getNewData().then(
						// function(result) {
						// $scope.plainData = result;
						// $log.log('Plain data ', $scope.plainData);
						// $log.log('Filter ', $scope.dataFilterString);
						// $log.log('Plain data filtered', $filter('filter')(
						// $scope.plainData, $scope.dataFilterString));
						// });

					}

				});