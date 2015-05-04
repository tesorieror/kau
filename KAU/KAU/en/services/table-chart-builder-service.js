app.factory('tableChartBuilderService', function($http, $q, $log) {

	var indicator = null;
	var type = "Table";

	return {
		build : function(result) {
			var cols = buildCols(result);
			var rows = buildRows(result);
			var chart = {
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
			return chart;
		}
	}

	function buildCols(result) {
		var cols = [ {
		  "id" : "indicator",
		  "label" : "Indicator",
		  "type" : "string",
		  "p" : {},
		} ];

		for (yr in result) {
			// Cols
			cols.push({
			  "id" : "year-" + yr,
			  "label" : yr,
			  "type" : "number",
			  "p" : {}
			});
		}
		return cols;
	}

	function rowKeys(obj) {
		var keys = Object.keys(obj);
		return keys.reduce(function(prev, k, ind, arr) {
			var answer;
			if (!isNaN(obj[k])) {
				var base = [];
				base.push(k);
				prev.push(base);
				answer = prev;
			} else {
				var children = rowKeys(obj[k]);
				var procChildren = children.map(function(curr, ind, arr) {
					var answer = curr;
					curr.push(k);
					return curr;
				});
				answer = prev.concat(procChildren);
			}
			return answer;
		}, []);
	}

	function rowValue(obj, key) {
		return key.reduceRight(function(prev, k, ind, arr) {
			return prev[k];
		}, obj);
	}

	function rowLabel(key) {
		// Get Value
		return key.reduce(function(prev, k, ind, arr) {
			return prev.concat(k).concat(" ");
		}, "");
	}

	function buildRows(result) {
		// Collect years
		var years = Object.keys(result);
		// Collect metadata
		var keys = rowKeys(result[years[0]]);

		return keys.map(function(key, ind, arr) {
			return {
				"c" : years.reduce(function(prev, year, ind, arr) {
					prev.push({
						"v" : rowValue(result[year], key)
					});
					return prev;
				}, [ {
					"v" : rowLabel(key)
				} ])
			}
		});
	}
});