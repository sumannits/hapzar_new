app.controller('todoAddCtrl', function ($scope,$rootScope,$state,$location, $stateParams, ionicMaterialInk,userService,$ionicPopup,$ionicLoading,myAuth) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();
    //alert('pROJECT mAN');
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
	  $scope.loggedindetails = myAuth.getUserNavlinks();
	  console.log($scope.loggedindetails.id);
	  if($scope.loggedindetails){
	  	
	  }else{
	  	$location.path('/');
	  }

	  $scope.todo = {
			name        	:'',
			to_id       	:'',
			expire_date  	:'',			
			priority     	:'',
			description     :''
		};

		$scope.addtodouserlist = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });      
      userService.getAcceptUserList($stateParams.id).then(
        function (data) {        
          	$scope.todouserlist = data.userList; 
            $scope.todo.to_id = $scope.todouserlist[0].id;           
          	$ionicLoading.hide();          
        },
      function (errorMessage) {
      	$scope.todouserlist = [];
        $ionicLoading.hide();       
          
      });
      
    }
    $scope.addtodouserlist();
    $scope.saveTodo = function(tododata) {
      if($scope.todo.name == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please enter name'
        });
        return false;
      }
      if($scope.todo.to_id == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please select user'
        });
        return false;
      }
      /*if($scope.todo.expire_date == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please select date'
        });
        return false;
      }
      if($scope.todo.priority == ''){
        var alertPopup = $ionicPopup.alert({
          title: 'ToDo',
          template: 'Please enter priority'
        });
        return false;
      }*/
    	$scope.todo.from_id = $scope.loggedindetails.id;
    	$scope.todo.prj_id = $stateParams.id;
    	$scope.todo.is_owner = 1;
		$ionicLoading.show({
	        template: 'Loading...'
	      });
	      userService.saveTodo(tododata).then(
	        function (data) {
        		$location.path('/home_details/'+$stateParams.id);
        
	          $ionicLoading.hide();	          
	        },
	      function (errorMessage) {	      	
	        $ionicLoading.hide();
	      });
    }

    
    $scope.cancelTodo = function() {
    	$location.path('/home_details/'+$stateParams.id);
    }   
	
    
});