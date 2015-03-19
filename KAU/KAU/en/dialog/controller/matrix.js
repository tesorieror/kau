/**
 * New node file
 */
app.controller('matrixCtrl', function($scope, $log, $modal, dataStoreService) {
	$scope.matrix = [];

	$scope.openDialog = function(size) {

		var modalInstance = $modal.open({
			templateUrl : './controller/highlightModalDialog.html',
			controller : 'highlightModalDialogCtrl',
			size : size,
			resolve : {
				position : function() {
					return 700;
				}
			}
		});
	}
	dataStoreService.getHighlights().then(function(highlights) {
		// $log.log(highlights);
		$scope.matrix = highlights;

		for (r in $scope.matrix)
			for (c in $scope.matrix[r]) {
				// $scope.matrix[r][c].cellClick = $scope.cellClick;
				$scope.matrix[r][c].cellClick = function(row, col) {
					$log.log(row + ", " + col);
					$scope.openDialog('lg');
				};
				$scope.matrix[r][c].row = r;
				$scope.matrix[r][c].col = c;
			}
	});
});