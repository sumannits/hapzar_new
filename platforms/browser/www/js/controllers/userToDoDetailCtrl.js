app.controller('userToDoDetailCtrl', function ($scope,$rootScope,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  if($scope.loggedindetails){
	        
	  }else{
      $location.path('/');
    }
    $scope.todoInfo = '';
    $scope.todoDetail = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getToDoDetail($stateParams.id).then(
        function (data) {          
          $scope.todoInfo = data.TodoDetails;  
          //console.log($scope.projectInfo);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todoInfo = '';
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'No todo found'
        });      
    });
    }
    $scope.todoDetail();

    /*$scope.todoList = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.getusertodoList($scope.loggedindetails.id,$stateParams.id).then(
        function (data) {          
          $scope.todolist = data.TodoList;  
          console.log($scope.todolist);      
          $ionicLoading.hide();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todolist = [];
        //console.log(11);
          
      });
    }*/
    //$scope.todoList();
    
    /*$scope.addTask = function() {
      $location.path('/user_add_todo/'+$stateParams.id);      
      
    }*/
    
    $scope.todoClose = function(todoid) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      userService.closeToDo(todoid,$scope.loggedindetails.id).then(
        function (data) {          
          //$scope.todoInfo = data.TodoDetails;  
          //console.log($scope.projectInfo);      
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'ToDo',
            template: data.msg
          });
          $scope.todoDetail();
        },
      function (errorMessage) {
        $ionicLoading.hide();
        $scope.todoInfo = '';
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'NO todo found'
        });      
    });

    }

    
    
    
    
    
    
});