/**
 * New node file
 */

app.controller('freshmenCtrl', function($scope, $modal, $log, $http) {

	var year = '2010-1431';
	var category = 'students';
	var subcategory = 'freshmen';

	$scope.charts = [];

	initialize();

	function initialize() {



		$scope.charts['nationalityPie'] = {
			type : "PieChart",
			cssStyle : "height:200px; width:200px;",
			data : [ [ 'Nationality', 'Students' ], [ 'Saudi', 0 ], [ 'Non-Saudi', 0 ] ],
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
				titleTooltip : 'Student Total',
				subtitleTooltip : 0 + ' (100 %)',
			})
		};

		$scope.charts['degreePie'] = {
			type : "PieChart",
			cssStyle : "height:200px; width:200px;",
			data : [ [ 'Degree', 'Students' ], [ 'Bachelore', 0 ], [ 'Diploma', 0 ] ],
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
			data : [ [ 'Saudi Student Gender', 'Students' ], [ 'Male', 0 ], [ 'Female', 0 ] ],
			options : merge(createDefaultOptions(), {
				title : 'Saudi Student Gender',
				titleTooltip : 'Saudi Total',
				subtitleTooltip : 0 + ' (100 %)',
			}),
		};

		$scope.charts['nonSaudiGenderPie'] = {
			type : "PieChart",
			cssStyle : "height:200px; width:200px;",
			data : [ [ 'Non-Saudi student gender', 'Students' ], [ 'Male', 0 ], [ 'Female', 0 ] ],
			options : merge(createDefaultOptions(), {
				title : 'Non-Saudi Student Gender',
				titleTooltip : 'Non-Saudi Total',
				subtitleTooltip : 0 + ' (100 %)',
			})
		};

		$scope.charts['bacheloreGenderPie'] = {
			type : "PieChart",
			cssStyle : "height:200px; width:200px;",
			data : [ [ 'Bachelore student gender', 'Students' ], [ 'Male', 0 ], [ 'Female', 0 ] ],
			options : merge(createDefaultOptions(), {
				title : 'Bachelore Student Gender',
				titleTooltip : 'Bachelore Total',
				subtitleTooltip : 0 + ' (100 %)',
			})
		};

		$scope.charts['diplomaGenderPie'] = {
			type : "PieChart",
			cssStyle : "height:200px; width:200px;",
			data : [ [ 'Diploma student gender', 'Students' ], [ 'Male', 0 ], [ 'Female', 0 ] ],
			options : merge(createDefaultOptions(), {
				title : 'Diploma Student Gender',
				titleTooltip : 'Diploma Total',
				subtitleTooltip : 0 + ' (100 %)',
			})
		};

		update();

	}

	$scope.itemsSelected = function(selectedItems) {
		// $log.log('Selected items');
	};

	$scope.chartReady = function(chartWrapper) {
		// $log.log('Chart ready');
		// $log.log(chartWrapper);
	};

	$scope.titleClick = function(chart) {
		$log.log('Title click', chart);
		$scope.openDialog('lg');
	};

	/**
	 * Gender
	 */

	$scope.genderTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Total" ]
		});
	};

	$scope.genderMaleFemale = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Male" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Female" ]
			});
		}
	};

	/**
	 * Degree
	 */

	$scope.degreeTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Total" ]
		});
	};

	$scope.degreeBacheloreDiploma = function(selection) {
		if (selection[0].row === 1) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Diploma", "Total" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Bachelore", "Total" ]
			});
		}
	};

	/**
	 * Nationality
	 */

	$scope.nationalityTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Total" ]
		});
	};

	$scope.nationalitySaudiNonSaudi = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Saudi", "Total" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Non-Saudi", "Total" ]
			});
		}
	};

	/**
	 * Saudi
	 */

	$scope.saudiTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Saudi", "Total" ]
		});
	};

	$scope.saudiGender = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Saudi", "Male" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Saudi", "Female" ]
			});
		}
	};

	/**
	 * Non-Saudi
	 */

	$scope.nonsaudiTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Non-Saudi", "Total" ]
		});
	};

	$scope.nonsaudiGender = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Non-Saudi", "Male" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Non-Saudi", "Female" ]
			});
		}
	};

	/**
	 * Bachelore
	 */

	$scope.bacheloreTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Bachelore", "Total" ]
		});
	};

	$scope.bacheloreGender = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Bachelore", "Male" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Bachelore", "Female" ]
			});
		}
	};

	/**
	 * Diploma
	 */

	$scope.diplomaTotal = function(chart) {
		$scope.openDialog(null, {
			category : 'Students',
			subcategory : 'Freshmen',
			filters : [ "Diploma", "Total" ]
		});
	};

	$scope.diplomaGender = function(selection) {
		if (selection[0].row === 0) {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Diploma", "Male" ]
			});
		} else {
			$scope.openDialog(null, {
				category : 'Students',
				subcategory : 'Freshmen',
				filters : [ "Diploma", "Female" ]
			});
		}
	};

	function update() {
		// $log.log('udating...');
		$http.get('./json/' + year + '_students_freshmen_data.json').success(function(response) {
			setValues($scope.charts['nationalityPie'], response['Saudi']['Total'], response['Non-Saudi']['Total'], response['Total']);

			setValues($scope.charts['degreePie'], response['Bachelore']['Total'], response['Diploma']['Total'], response['Total']);

			setValues($scope.charts['genderPie'], response['Male'], response['Female'], response['Total']);

			setValues($scope.charts['saudiGenderPie'], response['Saudi']['Male'], response['Saudi']['Female'], response['Saudi']['Total']);

			setValues($scope.charts['bacheloreGenderPie'], response['Bachelore']['Male'], response['Bachelore']['Female'], response['Bachelore']['Total']);

			setValues($scope.charts['nonSaudiGenderPie'], response['Non-Saudi']['Male'], response['Non-Saudi']['Female'], response['Non-Saudi']['Total']);

			setValues($scope.charts['diplomaGenderPie'], response['Diploma']['Male'], response['Diploma']['Female'], response['Diploma']['Total']);

			// $log.log('udated!');

		});
	}

	function createDefaultOptions() {
		return {
			animation : {
				duration : 1000,
				easing : 'inAndOut',
				startup : true
			},
			backgroundColor : {
				fill : 'transparent'
			},
			legend : {
				position : 'bottom'
			},
			legendTextStyle : {
				fontSize : 11
			},
			width : 200,
			height : 200,
			is3D : true,
			titlePosition : 'none',
			titleTextStyle : {
				fontSize : 12
			},
			chartArea : {
				left : 12,
				top : 0,
				right : 5,
				bottom : 0,
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

	/**
	 * Freshmen Modal Dialog
	 */

	$scope.openDialog = function(size, indicator) {

		var modalInstance = $modal.open({
			templateUrl : './controller/detailModalDialog.html',
			controller : 'detailModalDialogCtrl',
			size : size,
			resolve : {
				indicator : function() {
					return indicator;
				}
			}
		});
	};

});
