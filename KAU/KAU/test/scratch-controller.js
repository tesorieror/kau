app.controller('ScratchCtrl', function($scope, $log, indicatorService) {
	
	indicatorService.getCategory()
	$log.log("Scratch controller loaded!");
});