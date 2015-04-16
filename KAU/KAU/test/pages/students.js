app.controller("StudentsCtrl",
		function($http, $q, $log, $routeParams, $scope, dataStoreService) {
			$log.info("Students controller running...");

			var categoryName = "Students";
			$scope.category = null;
			$scope.selection = [];
			var oldSelection = [];

			dataStoreService.getDataMetadata().then(function(result) {
				$scope.category = result.filter(function(e, i, a) {
					return e.name == categoryName;
				})[0];

				$scope.sel = {};

				// angular.forEach($scope.category.children, function(v, k) {
				// $scope.sel[k] = true;
				// });

				$log.log("Selection original", $scope.sel);
			});

			$scope.changed = function(item) {
				$log.log("Changed", item);
				$log.log("Selection", $scope.sel);
			}

			$scope.mousedown = function($event) {
				// $log.log("Down data", $event.target);
				// $log.log("Down selection", $scope.selection[2]);
				// oldSelection = $scope.selection[2] == null ? [] : $scope.selection[2]
				// .slice();

				var element = $scope.selection[1].children[$event.target.value];

				if ($scope.selection[2].indexOf(element) >= 0)
					$scope.selection[2].splice($scope.selection[2].indexOf(element), 1);
			}

			$scope.clicked = function($event) {
				// $log.log("Clicked Event", $event);
				$log.log("Click Event", $event);
				$log.log("Click Event", $event.target.selected);

				// $log.log("Click Selection", $scope.selection[2]);
				// $log.log("Click Selection from children",
				// $scope.selection[1].children[$event.target.value]);
				// if (oldSelection
				// .indexOf($scope.selection[1].children[$event.target.value]) >= 0)
				// $scope.selection[2].splice($scope.selection[2]
				// .indexOf($scope.selection[1].children[$event.target.value]), 1);
				// else
				// $scope.selection[2]
				// .push($scope.selection[1].children[$event.target.value]);

				// if ($event.target.tagName.toLowerCase() == "option") {
				//
				// $scope.selection[2] = [];
				//
				// // if (!$event.target.selected)
				// // $event.target.selected = false;
				// // else
				// // $event.target.selected = true;
				//
				// // $log.log($event);
				//
				// // $log.log($event.target);
				//
				// // $log.log($event.target.parentElement);
				// // $log.log($scope.selection);
				// // $log.log($scope.selection[2]);
				// }
			}

		});