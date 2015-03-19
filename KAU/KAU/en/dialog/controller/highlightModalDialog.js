app.controller('highlightModalDialogCtrl', function($scope, $modalInstance, $log, position, $document) {

	$log.log(position);

	$log.log($modalInstance);
	$log.log($document);
	
	$(".modal-dialog").css("top", 400);

	buildTable();

	$scope.ok = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.close = function() {
		$modalInstance.close();
	};

	function buildTable() {
		var rows = [];
		rows.push({
			"c" : [ {
				"v" : 2012
			}, {
				"v" : 1926
			}, {
				"v" : 0
			} ]
		});

		rows.push({
			"c" : [ {
				"v" : 2013
			}, {
				"v" : 2880
			}, {
				"v" : 954
			} ]
		});

		rows.push({
			"c" : [ {
				"v" : 2014
			}, {
				"v" : 696
			}, {
				"v" : 816
			} ]
		});

		$scope.chartObject = {
			"type" : 'Table',
			"displayed" : true,
			"data" : {
				"cols" : [ {
					"id" : "year",
					"label" : "Year",
					"type" : "number",
					"p" : {}
				}, {
					"id" : "publications-id",
					"label" : "Publications",
					"type" : "number",
					"p" : {}
				}, {
					"id" : "increase-id",
					"label" : "Increase",
					"type" : "number",
					"p" : {}
				} ],
				"rows" : rows
			},
			"options" : {
				"title" : "KAU publications",
			}
		};
	}

});
