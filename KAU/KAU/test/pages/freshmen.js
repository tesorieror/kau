/**
 * New node file
 */
app.controller('FreshmenCtrl',
		function($scope, $log, $location, dataStoreService) {

			$scope.title = 'FRESHMEN';
			$scope.charts = [];

			$scope.indicator = new Indicator();

			initialize();

			function initialize() {

				$scope.charts['nationalityPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Nationality', 'Students' ], [ 'Saudi', 0 ],
							[ 'Non-Saudi', 0 ] ],
					options : merge(createDefaultOptions(), {
						slices : {
							0 : {
								color : 'green'
							},
							1 : {
								color : 'darkGreen'
							}
						},
						title : 'Student Nationality',
						onTitleClick : function() {
							$log.log('Title click nationalityPie');
							$scope.indicator.setValuesFromArray([ 'Students', 'Freshmen',
									'Total' ]);
							$location.path('/Description/Students/Freshmen/Gender/Total');
							// $scope.openDialog(indicator);
						},
						onSelect : function(selectedItems) {
							$log.log('Select nationalityPie', selectedItems);
						},
						titleTooltip : 'Student Total',
						subtitleTooltip : 0 + ' (100 %)',
					})
				};

				$scope.charts['degreePie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Degree', 'Students' ], [ 'Bachelore', 0 ],
							[ 'Diploma', 0 ] ],
					options : merge(createDefaultOptions(), {
						slices : {
							0 : {
								color : 'brown'
							},
							1 : {
								color : 'DarkGoldenRod'
							},
						},
						title : 'Student Degree',
						onTitleClick : function() {
							$log.log('Title click degreePie');
						},
						onSelect : function(selectedItems) {
							$log.log('Select degreePie', selectedItems);
						},
						titleTooltip : 'Student Total',
						subtitleTooltip : 0 + ' (100 %)',
					})
				};

				$scope.charts['genderPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Gender', 'Students' ], [ 'Male', 0 ], [ 'Female', 0 ] ],
					options : merge(createDefaultOptions(), {
						title : 'Student Gender',
						titleTooltip : 'Student Total',
						subtitleTooltip : 0 + ' (100 %)',
					}),
				};

				$scope.charts['saudiGenderPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Saudi Student Gender', 'Students' ], [ 'Male', 0 ],
							[ 'Female', 0 ] ],
					options : merge(createDefaultOptions(), {
						title : 'Saudi Student Gender',
						titleTooltip : 'Saudi Total',
						subtitleTooltip : 0 + ' (100 %)',
					}),
				};

				$scope.charts['nonSaudiGenderPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Non-Saudi student gender', 'Students' ], [ 'Male', 0 ],
							[ 'Female', 0 ] ],
					options : merge(createDefaultOptions(), {
						title : 'Non-Saudi Student Gender',
						titleTooltip : 'Non-Saudi Total',
						subtitleTooltip : 0 + ' (100 %)',
					})
				};

				$scope.charts['bacheloreGenderPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Bachelore student gender', 'Students' ], [ 'Male', 0 ],
							[ 'Female', 0 ] ],
					options : merge(createDefaultOptions(), {
						title : 'Bachelore Student Gender',
						titleTooltip : 'Bachelore Total',
						subtitleTooltip : 0 + ' (100 %)',
					})
				};

				$scope.charts['diplomaGenderPie'] = {
					type : "PieChart",
					cssStyle : "height:200px; width:200px;",
					data : [ [ 'Diploma student gender', 'Students' ], [ 'Male', 0 ],
							[ 'Female', 0 ] ],
					options : merge(createDefaultOptions(), {
						title : 'Diploma Student Gender',
						titleTooltip : 'Diploma Total',
						subtitleTooltip : 0 + ' (100 %)',
					})
				};

				update();

			}

			function update() {
				$log.log('udating...');
				var indicator = new Indicator();
				var year = '2010-1431';
				indicator.category = 'students';
				indicator.subcategory = 'freshmen';
				indicator.years = [ year ];

				$scope.title = 'FRESHMEN ' + year;

				dataStoreService.getData(indicator).then(
						function(results) {
							setValues($scope.charts['nationalityPie'],
									results[year]['Saudi']['Total'],
									results[year]['Non-Saudi']['Total'],
									results[year]['Gender']['Total']);

							$scope.charts['nationalityPie'].onclick = function(params) {
								$log.log("Params: ", params);
							};

							setValues($scope.charts['degreePie'],
									results[year]['Bachelore']['Total'],
									results[year]['Diploma']['Total'],
									results[year]['Gender']['Total']);

							setValues($scope.charts['genderPie'],
									results[year]['Gender']['Male'],
									results[year]['Gender']['Female'],
									results[year]['Gender']['Total']);

							setValues($scope.charts['saudiGenderPie'],
									results[year]['Saudi']['Male'],
									results[year]['Saudi']['Female'],
									results[year]['Saudi']['Total']);

							setValues($scope.charts['bacheloreGenderPie'],
									results[year]['Bachelore']['Male'],
									results[year]['Bachelore']['Female'],
									results[year]['Bachelore']['Total']);

							setValues($scope.charts['nonSaudiGenderPie'],
									results[year]['Non-Saudi']['Male'],
									results[year]['Non-Saudi']['Female'],
									results[year]['Non-Saudi']['Total']);

							setValues($scope.charts['diplomaGenderPie'],
									results[year]['Diploma']['Male'],
									results[year]['Diploma']['Female'],
									results[year]['Diploma']['Total']);

						});

			}

			function createDefaultOptions() {
				return {
					backgroundColor : {
						fill : 'transparent'
					},
					legend : {
						position : 'bottom'
					},
					width : 200,
					height : 200,
					is3D : true,
					titlePosition : 'none',
					chartArea : {
						width : "80%",
						height : "80%"
					},
				};
			}

			function merge(obj1, obj2) {
				result = {};
				for (key in obj1)
					result[key] = obj1[key];
				for (key in obj2)
					result[key] = obj2[key];
				return result;
			}

			function setValues(obj, val1, val2, total) {
				obj.data[1][1] = val1;
				obj.data[2][1] = val2;
				obj.options.subtitleTooltip = total + " (100) %";
			}

		});