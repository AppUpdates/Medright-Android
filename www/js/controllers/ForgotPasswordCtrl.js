angular.module('starter.controllers')
  
.controller('ForgotPasswordCtrl', function($scope, $state,$ionicSideMenuDelegate,$http,$ionicPlatform, $ionicHistory, $location, $ionicLoading,$http){

$scope.GoBack = function(){
      $ionicHistory.goBack();
};

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      })
};
    
$scope.openMenu = function (){
      $ionicSideMenuDelegate.toggleLeft();
    };

$scope.showToast = function(msg){
      window.plugins.toast.show(msg, 'short', 'center')       
    };

$scope.hide = function(){
      $ionicLoading.hide().then(function(){       
      });
    };

$scope.sendPassword = function(ForgotPassEmail){
      if(angular.isUndefined(ForgotPassEmail) || ForgotPassEmail == ""){
        $scope.showToast("Please enter valid email");
      }
      else{
        $scope.show();
        $http({
          method: "post",
          url:'http://68.183.101.193/android/338/SendEmail.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Email : ForgotPassEmail
          }
        }).success(function(data){
           if(data == "success"){
             $scope.hide();        
             $scope.showToast("Please Check your Email for Password");
             $state.go('app.home');
           }
           else{
             $scope.hide();
           }
        });

      }
    };
  
});
