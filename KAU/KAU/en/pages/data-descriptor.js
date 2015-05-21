/**
 * New node file
 */

app.controller('DataDescriptorCtrl', function($scope, $log, $modalInstance,
    path) {

	// $log.log("Key", key);
	$scope.title = _.reduceRight(path, function(acc, curr) {
		return acc + curr + " ";
	}, "") + "Data";

	// $scope.selected = {
	// item : $scope.items[0]
	// };

	$scope.ok = function() {
		$modalInstance.close(path);
		// $modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});