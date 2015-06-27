angular.module("alertApp")

.controller("listController",function($rootScope, $scope, $http, $state, $localStorage){
	$scope.alertList =  $localStorage.alertList;
	$scope.fetchDetail = function fetchDetail(index, content){
		$rootScope.content=content;
		$rootScope.index=index;
		$state.go("detail");
	};
	$scope.goToDetail = function goToDetail(){
		$rootScope.index=-1;
		$rootScope.content=null;
		$state.go('detail');
	};
	$scope.deleteAlert = function deleteAlert(index, $event){
		if(confirm('Are you sure, you want to delete?'))
			$localStorage.alertList.splice(index,1);
		$event.stopPropagation();
	};
})

.controller("detailController",function($rootScope, $scope, $http, $location, $state, $localStorage){
	$scope.content = $rootScope.content;
	$scope.index = $rootScope.index;
	$scope.goBack = function goBack(){
		$state.go("list");
	};
	$scope.save = function save(){
		if($scope.alertForm.message.$viewValue.toString().length==0)
		{
			var id = (Math.random() * 100000);
			if($scope.index==-1)
			{
				$localStorage.alertList.push({ "dateTime":$scope.alertForm.dateTime.$viewValue
											  ,"message":$scope.alertForm.message.$viewValue
											  ,"id":id});
				//console.log($scope.alertForm.dateTime.$viewValue.toString() + ' : ' + $scope.alertForm.dateTime.$viewValue.toString());
			}else{
				$localStorage.alertList[$scope.index].dateTime = $scope.alertForm.dateTime.$viewValue;
				$localStorage.alertList[$scope.index].message = $scope.alertForm.message.$viewValue;
				$localStorage.alertList[$scope.index].id = id;
				cordova.plugins.notification.local.cancel($localStorage.alertList[$scope.index].id, function () {
				    // Notification was cancelled
				});
			}
			var alertAt = new Date($scope.alertForm.dateTime.$viewValue.toString());
		    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
		    cordova.plugins.notification.local.schedule({
		        id: id,
		        title: $scope.alertForm.message.$viewValue,
		        text: $scope.alertForm.message.$viewValue,
		        at: alertAt,
		        sound: sound,
		        badge: 12
		    });
			$state.go("list");
		}
	};
});