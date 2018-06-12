app.controller('AlertAcceptCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }

    $scope.todoInfo ='';

    $scope.alertDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getAlertDetail($stateParams.id).then(
        function (data) {          
          $scope.alertInfo = data.NotiDetails;  
          //console.log($scope.alertInfo); 
          if($scope.alertInfo.is_todo_complete != 0){
            userService.getToDoDetail($scope.alertInfo.is_todo_complete).then(
            function (data1) {          
              $scope.todoInfo = data1.TodoDetails;      
              $ionicLoading.hide();
            },function (errorMessage) {
              $ionicLoading.hide();
              $scope.todoInfo = '';                
            });  
          }else{
              $ionicLoading.hide();
          } 
           
          //$ionicLoading.hide();
        },
    function (errorMessage) {
      $ionicLoading.hide();
      $scope.alertInfo = [];
      var alertPopup = $ionicPopup.alert({
        title: 'Notification',
        template: 'No project found'
      });      
    });
    }

    $scope.alertDetail();

    $scope.acceptAlert = function(type) {
      //alert(11);
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.saveAlert(type,$stateParams.id).then(
        function (data) {        
                
          $ionicLoading.hide();
          $location.path('/user_project_details/'+$stateParams.pid+'/'+$stateParams.uid);

        },
    function (errorMessage) {
      $ionicLoading.hide();
      //$scope.alertInfo = [];
      var alertPopup = $ionicPopup.alert({
        title: 'Alert',
        template: errorMessage
      });      
    });
    }
    //$scope.acceptAlert();

    // Toggle Code Wrapper
    
    
    
    
});