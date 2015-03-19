/**
 * New node file
 */
app.controller('dataCtrl', function($scope, $log, $q, dataStoreService) {

	// $scope.categories = [];
	// $scope.subcategories = [];

	// Indicator
	$scope.indicator = {

		setFilter : function(subsubcategory, filter) {
			$scope.indicator.subsubcategory = subsubcategory;
			$scope.indicator.filter = filter;
			// $log.log($scope.indicator);
			$scope.updateChart();
		},

		buildChartModels : function() {
			var indicator = $scope.indicator;
			var years = indicator.years;

			dataStoreService.getDataForYears(years, indicator).then(function(result) {
				// $log.log("RESULT ", result);

				if (indicator.displayType == 'Table')
					$scope.tableChart = $scope.indicator.buildTableModel(result);
				else if (indicator.displayType == 'ColumnChart') {
					// Patch
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'nationality') ? 'Saudi' : $scope.indicator.filter;
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'degree') ? 'Bachelore' : $scope.indicator.filter;
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'field') ? 'Education' : $scope.indicator.filter;
					// End Patch
					if ($scope.indicator.subsubcategory == 'gender') {
						$scope.columnChart = $scope.indicator.buildGenderColumnModel(result);
					} else {
						$scope.columnChart = $scope.indicator.buildColumnModel(result);
					}
				} else if (indicator.displayType == 'LineChart') {
					// Patch
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'nationality') ? 'Saudi' : $scope.indicator.filter;
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'degree') ? 'Bachelore' : $scope.indicator.filter;
					$scope.indicator.filter = ($scope.indicator.filter == null && $scope.indicator.subsubcategory == 'field') ? 'Education' : $scope.indicator.filter;
					// End Patch
					if ($scope.indicator.subsubcategory == 'gender') {
						$scope.lineChart = $scope.indicator.buildGenderLineModel(result);
					} else {
						$scope.lineChart = $scope.indicator.buildLineModel(result);
					}
				} else if (indicator.displayType == 'PieChart') {
					// Patch
					$scope.indicator.gender = ($scope.indicator.gender == 'Both') ? 'Total' : $scope.indicator.gender;
					// End Patch
					if ($scope.indicator.subsubcategory == 'gender') {
						$scope.pieChart = $scope.indicator.buildGenderPieModel(result);
					} else if ($scope.indicator.subsubcategory == 'nationality') {
						$scope.pieChart = $scope.indicator.buildNationalityPieModel(result);
					} else if ($scope.indicator.subsubcategory == 'degree') {
						$scope.pieChart = $scope.indicator.buildDegreePieModel(result);
					} else if ($scope.indicator.subsubcategory == 'field') {
						$scope.pieChart = $scope.indicator.buildFieldPieModel(result);
					} else if ($scope.indicator.subsubcategory == 'area') {
						$scope.pieChart = $scope.indicator.buildAreaPieModel(result);
					}
				}
			});
		},

		buildTableModelCols : function(result) {
			var cols = [ {
				"id" : "indicator",
				"label" : "Indicator",
				"type" : "string",
				"p" : {},
			} ];

			for (yr in result) {
				// $log.log("key ", yr)

				// Cols
				cols.push({
					"id" : "year-" + yr,
					"label" : yr,
					"type" : "number",
					"p" : {}
				});
			}
			return cols;
		},

		buildTableModelRows : function(result) {
			var rows = [];

			var resultFirstKey = Object.keys(result)[0];
			var resultFirstValue = result[resultFirstKey];

			// Headers
			// Collect Keys
			var keys = [];
			var oldkeys = Object.keys(resultFirstValue);
			for (k in oldkeys) {
				if (isNaN(resultFirstValue[oldkeys[k]])) {
					var nestedKeys = Object.keys(resultFirstValue[oldkeys[k]]);
					for (k2 in nestedKeys) {
						keys.push(oldkeys[k] + ' ' + nestedKeys[k2]);
					}
				} else {
					keys.push(oldkeys[k]);
				}
			}

			// Collect headers
			for (k in keys) {
				rows.push({
					"c" : [ {
						"v" : keys[k]
					}, {
						"v" : 0
					}, {
						"v" : 0
					}, {
						"v" : 0
					}, {
						"v" : 0
					}, {
						"v" : 0
					}, ]
				});
			}

			// $log.log("Rows length", rows.length);

			var col = 1;

			var yearData;
			for (yr in result) {
				var row = 0;
				yearData = result[yr];
				yearDataKeys = Object.keys(yearData);
				for (k in yearDataKeys) {
					var val = null;
					if (isNaN(yearData[yearDataKeys[k]])) {
						var nestedKeys = Object.keys(yearData[yearDataKeys[k]]);
						for (k2 in nestedKeys) {
							rows[row]["c"][col]["v"] = yearData[yearDataKeys[k]][nestedKeys[k2]];
							row++;
						}
					} else {
						// $log.log("Row", row);
						// $log.log("Rows", rows);
						rows[row]["c"][col]["v"] = yearData[yearDataKeys[k]];
						row++;
					}
				}
				col++;
			}
			return rows;
		},

		buildTableModel : function(result) {
			var cols = $scope.indicator.buildTableModelCols(result);
			var rows = $scope.indicator.buildTableModelRows(result);
			var model = {
				"type" : 'Table',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "100%",
					"pageSize" : "10",
					"page" : "enable",
					"showRowNumber" : false,
					"sort" : "enable"
				}
			};
			return model;
		},

		/**
		 * Column chart
		 */

		buildColumnModel : function(result) {
			var cols = $scope.indicator.buildColumnModelCols(result);
			var rows = $scope.indicator.buildColumnModelRows(result);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'ColumnChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"isStacked" : true,
					"backgroundColor" : "transparent",
					"title" : $scope.indicator.filter + " " + $scope.indicator.subcategory + " students" + " from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
				}
			};
			return model;
		},

		buildColumnModelCols : function(result) {
			var cols
			if ($scope.indicator.subsubcategory == 'area')
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : "Student",
					"label" : "Student",
					"type" : "number",
					"p" : {},
				} ];
			else
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : "Male",
					"label" : "Male",
					"type" : "number",
					"p" : {},
				}, {
					"id" : "Female",
					"label" : "Female",
					"type" : "number",
					"p" : {},
				}, ];

			return cols;
		},

		buildColumnModelRows : function(result) {
			var rows = [];
			var yrs = Object.keys(result).reverse();
			for (yrk in yrs) {
				var yr = yrs[yrk];
				// $log.log("key ", yr)
				// Rows
				if ($scope.indicator.subsubcategory == 'area') {

					// $log.log($scope.indicator.filter);

					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr]["Administrative Areas"][$scope.indicator.filter]
						} ]
					});
				} else
					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr][$scope.indicator.filter]["Male"]
						}, {
							"v" : result[yr][$scope.indicator.filter]["Female"]
						}, ]
					});

			}
			return rows;
		},

		buildGenderColumnModel : function(result) {
			var cols = $scope.indicator.buildGenderColumnModelCols(result);
			var rows = $scope.indicator.buildGenderColumnModelRows(result);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'ColumnChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"isStacked" : true,
					"backgroundColor" : "transparent",
					"title" : $scope.indicator.subcategory.firstToUpper() + " students" + " from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
				}
			};

			return model;
		},

		buildGenderColumnModelCols : function(result) {

			var cols;
			cols = [ {
				"id" : "year",
				"label" : "Year",
				"type" : "string",
				"p" : {},
			}, {
				"id" : "Male",
				"label" : "Male",
				"type" : "number",
				"p" : {},
			}, {
				"id" : "Female",
				"label" : "Female",
				"type" : "number",
				"p" : {},
			}, ];

			return cols;
		},

		buildGenderColumnModelRows : function(result) {
			var rows = [];

			var yrs = Object.keys(result).reverse();
			for (yrk in yrs) {
				var yr = yrs[yrk];

				// $log.log("key ", yr)
				// Rows

				rows.push({
					"c" : [ {
						"v" : yr
					}, {
						"v" : result[yr]["Male"]
					}, {
						"v" : result[yr]["Female"]
					}, ]
				});
			}
			return rows;
		},

		/**
		 * Line Chart
		 */

		buildLineModel : function(result) {
			var cols = $scope.indicator.buildLineModelCols(result);
			var rows = $scope.indicator.buildLineModelRows(result);
			var resultKeys = Object.keys(result);
			var gender = ($scope.indicator.gender == "Both" ? " Male and Female" : $scope.indicator.gender);
			gender = $scope.indicator.subsubcategory == 'area' ? ' ' : gender;
			var title = gender + " " + $scope.indicator.filter + " " + $scope.indicator.subcategory + " students" + " from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0]

			var model = {
				"type" : 'LineChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"backgroundColor" : "transparent",
					"title" : title,
				}
			};
			return model;
		},

		buildLineModelCols : function(result) {
			var cols
			if ($scope.indicator.subsubcategory == 'area')
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : "Student",
					"label" : "Student",
					"type" : "number",
					"p" : {},
				} ];
			else if ($scope.indicator.gender == 'Both')
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : "Male",
					"label" : "Male",
					"type" : "number",
					"p" : {},
				}, {
					"id" : "Female",
					"label" : "Female",
					"type" : "number",
					"p" : {},
				}, ];
			else
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : $scope.indicator.gender,
					"label" : $scope.indicator.gender,
					"type" : "number",
					"p" : {},
				} ];

			return cols;
		},

		buildLineModelRows : function(result) {
			var rows = [];
			var yrs = Object.keys(result).reverse();
			for (yrk in yrs) {
				var yr = yrs[yrk];
				// $log.log("key ", yr)
				// Rows
				if ($scope.indicator.subsubcategory == 'area') {

					// $log.log($scope.indicator.filter);

					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr]["Administrative Areas"][$scope.indicator.filter]
						} ]
					});
				} else if ($scope.indicator.gender == 'Both')
					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr][$scope.indicator.filter]["Male"]
						}, {
							"v" : result[yr][$scope.indicator.filter]["Female"]
						}, ]
					});
				else
					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr][$scope.indicator.filter][$scope.indicator.gender]
						}, ]
					});
			}
			return rows;
		},

		buildGenderLineModel : function(result) {
			var cols = $scope.indicator.buildGenderLineModelCols(result);
			var rows = $scope.indicator.buildGenderLineModelRows(result);
			var resultKeys = Object.keys(result);
			var gender = ($scope.indicator.gender == "Both" ? " Male and Female" : $scope.indicator.gender);
			var title = gender + " " + $scope.indicator.subcategory + " students" + " from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0]

			var model = {
				"type" : 'LineChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"backgroundColor" : "transparent",
					"title" : title,
				}
			};

			return model;
		},

		buildGenderLineModelCols : function(result) {

			var cols;
			if ($scope.indicator.gender == 'Both')
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : "Male",
					"label" : "Male",
					"type" : "number",
					"p" : {},
				}, {
					"id" : "Female",
					"label" : "Female",
					"type" : "number",
					"p" : {},
				}, ];
			else
				cols = [ {
					"id" : "year",
					"label" : "Year",
					"type" : "string",
					"p" : {},
				}, {
					"id" : $scope.indicator.gender,
					"label" : $scope.indicator.gender,
					"type" : "number",
					"p" : {},
				}, ];

			return cols;
		},

		buildGenderLineModelRows : function(result) {
			var rows = [];

			var yrs = Object.keys(result).reverse();
			for (yrk in yrs) {
				var yr = yrs[yrk];

				// $log.log("key ", yr)
				// Rows

				if ($scope.indicator.gender == 'Both')
					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr]["Male"]
						}, {
							"v" : result[yr]["Female"]
						}, ]
					});
				else
					rows.push({
						"c" : [ {
							"v" : yr
						}, {
							"v" : result[yr][$scope.indicator.gender]
						}, ]
					});

			}
			return rows;
		},

		/**
		 * Pie Chart
		 */

		buildGenderPieModel : function(result) {
			var filters = [ "Male", "Female" ];
			var cols = $scope.indicator.buildPieModelCols(result);
			var rows = $scope.indicator.buildGenderPieModelRowsWithoutGender(result, filters);
			$log.log("cols", cols);
			$log.log("rows ", rows);

			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'PieChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"title" : "Gender analysis from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
					"backgroundColor" : "transparent",
					"is3D" : true,
					"chartArea" : {
						"width" : "80%",
						"height" : "80%"
					},
				}
			};

			return model;
		},

		buildPieModelCols : function(result) {

			var cols;

			cols = [ {
				"id" : "gender",
				"label" : "Gender",
				"type" : "string",
				"p" : {},
			}, {
				"id" : "students",
				"label" : "Students",
				"type" : "number",
				"p" : {},
			} ];

			return cols;
		},

		buildGenderPieModelRowsWithoutGender : function(result, filters) {
			var rows = [];
			for (fKey in filters) {
				var total = 0;
				for (yr in result)
					total = total + result[yr][filters[fKey]];
				rows.push({
					"c" : [ {
						"v" : filters[fKey]
					}, {
						"v" : total
					} ]
				});
			}
			return rows;
		},

		buildPieModelRowsWithGender : function(result, filters) {
			var rows = [];
			for (fKey in filters) {
				var total = 0;
				for (yr in result)
					total = total + result[yr][filters[fKey]][$scope.indicator.gender];
				rows.push({
					"c" : [ {
						"v" : filters[fKey]
					}, {
						"v" : total
					} ]
				});
			}
			return rows;
		},

		buildNationalityPieModel : function(result) {
			var filters = [ "Saudi", "Non-Saudi" ];
			var cols = $scope.indicator.buildPieModelCols(result);
			var rows = $scope.indicator.buildPieModelRowsWithGender(result, filters);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'PieChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"title" : "Nationality analysis from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
					"backgroundColor" : "transparent",
					"is3D" : true,
					"chartArea" : {
						"width" : "80%",
						"height" : "80%"
					},
				}
			};
			return model;
		},

		buildDegreePieModel : function(result) {
			var filters = [ "Bachelore", "Higher Diploma", "Master", "PhD" ];
			var cols = $scope.indicator.buildPieModelCols(result);
			var rows = $scope.indicator.buildPieModelRowsWithGender(result, filters);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'PieChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"title" : "Degree analysis from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
					"backgroundColor" : "transparent",
					"is3D" : true,
					"chartArea" : {
						"width" : "80%",
						"height" : "80%"
					},
				}
			};
			return model;
		},

		buildFieldPieModel : function(result) {
			var filters = [ "Education", "Humanities and Arts", "Social Sciences, Business and Law", "Science", "Engineering, Manufacturing Industries and Construction", "Agriculture", "Health and Social Services", "Not known programmes" ];
			var cols = $scope.indicator.buildPieModelCols(result);
			var rows = $scope.indicator.buildPieModelRowsWithGender(result, filters);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'PieChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "300px",
					"title" : "Academic field analysis from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
					"backgroundColor" : "transparent",
					"is3D" : true,
					"chartArea" : {
						"width" : "80%",
						"height" : "80%"
					},
				}
			};
			return model;
		},

		buildAreaPieModel : function(result) {
			var cols = $scope.indicator.buildPieModelCols(result);
			var rows = $scope.indicator.buildAreaPieModelRows(result);
			var resultKeys = Object.keys(result);
			var model = {
				"type" : 'PieChart',
				"displayed" : true,
				"data" : {
					"cols" : cols,
					"rows" : rows
				},
				"options" : {
					"width" : "100%",
					"height" : "400px",
					"title" : "Administrative area analysis from " + resultKeys[resultKeys.length - 1] + " to " + resultKeys[0],
					"backgroundColor" : "transparent",
					"is3D" : true,
					"chartArea" : {
						"width" : "80%",
						"height" : "80%"
					},
				}
			};

			return model;
		},

		buildAreaPieModelRows : function(result) {
			var filters = [ "Riyad", "Makkah", "Jazan", "Science", "Eastern Province", "Asir", "Al-Qassim", "Ha\'il", "Al-Madinah", "Al-Baha", "Northern Border", "Tabuk", "Najran", "Al-Jawf" ];
			var rows = [];
			for (fKey in filters) {
				var total = 0;
				for (yr in result)
					total = total + result[yr]["Administrative Areas"][filters[fKey]];
				rows.push({
					"c" : [ {
						"v" : filters[fKey]
					}, {
						"v" : total
					} ]
				});
			}
			return rows;
		},
	};

	$scope.indicator.category = 'students';
	$scope.indicator.subcategory = 'freshmen';
	$scope.indicator.subsubcategory = 'gender';
	$scope.indicator.displayType = 'Table';
	$scope.indicator.gender = 'Male';

	// Year
	$scope.fromYears = [];
	$scope.toYears = [];
	$scope.fromYear = {};
	$scope.toYear = {};

	dataStoreService.getYears().then(function(result) {
		var years = result
		$scope.fromYears = years.slice(0);
		$scope.fromYear = $scope.fromYears[$scope.fromYears.length - 1];

		$scope.toYears = years.slice(0);
		$scope.toYear = $scope.toYears[0];

		$scope.updateChart();

	});

	$scope.fromYearClicked = function(year) {
		$scope.fromYear = year;
		$scope.updateChart();
	}

	$scope.toYearClicked = function(year) {
		$scope.toYear = year;
		$scope.updateChart();
	}

	$scope.updateChart = function() {
		$scope.indicator.years = $scope.toYears.slice($scope.toYears.indexOf($scope.toYear), $scope.toYears.indexOf($scope.fromYear) + 1);
		$log.log('Indicator', $scope.indicator);
		// $log.log('Years', years);
		// $log.log('Chart', $scope.indicator.displayType);
		$scope.indicator.buildChartModels();
	}

	$scope.tableReady = function(chartWrapper) {
		// $log.log(chartWrapper);
		google.visualization.events.addListener(chartWrapper.getChart(), 'sort', setWidth);
		setWidth();
		function setWidth() {
			$('.google-visualization-table-th:contains(' + 'Indicator' + ')').css('width', '164px');
		}
	}

});

String.prototype.firstToUpper = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
