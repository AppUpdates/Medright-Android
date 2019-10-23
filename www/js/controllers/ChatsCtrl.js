angular.module('starter.controllers')
  
.controller("ChatsCtrl",function($scope,$state,$ionicSideMenuDelegate, $ionicPlatform, $ionicHistory, $location, $http,$ionicHistory,$ionicLoading,$rootScope){
    
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
   
$scope.GoBack=function(){
      $ionicHistory.goBack();
    };

$scope.GoToAddDiscussion = function(){
      $state.go('app.adddiscussion');
    };

$scope.showReply = function(DiscussionId){
      localStorage.setItem("DisIdKey",DiscussionId);
      $state.go('app.reply');
      for(var i=0;i<$scope.DisList.length;i++){
        if($scope.DisList[i].DiscussionId == DiscussionId){
          localStorage.setItem("ReplyMainId",JSON.stringify($scope.DisList[i]));
        }
      }
    };

$scope.loadReply = function(){
      $scope.MainReply = JSON.parse(localStorage.getItem("ReplyMainId"));
      console.log($scope.MainReply);
      $http({
        method: "post",
        url:'http://68.183.101.193/android/338/GetReplies.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_disId:Number(localStorage.getItem("DisIdKey"))
        }
      }).success(function(data){
        console.log(data);
        if(data.length >= 0){
          $scope.ReplyList = data;
        }
        else{
          $scope.showToast("No data found");
          
        }
      });
    };

$scope.sendMessage = function(DisMessage){
      if(angular.isUndefined(DisMessage) || DisMessage == ""){
        $scope.showToast("Please Enter message");
      }
      else{
        $scope.show();
        $http({
          method: "post",
          url:'http://68.183.101.193/android/338/AddDiscussion.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_SenderId:Number(localStorage.getItem("UserIdKey")),
            Angular_Message:DisMessage
          }
        }).success(function(data){
          console.log(data);
          if(data.length >= 0){
            $scope.DisList = data;            
            $ionicHistory.goBack();
            $scope.hide();
            $scope.showToast("Message Added");
          }
          else{
            $scope.hide();
            $scope.showToast("Please try again!");            
          }
        });
      }
    };

$scope.replyMessage = function(RepMessage,DisId){
      if(angular.isUndefined(RepMessage) || RepMessage == ""){
        $scope.showToast("Please Enter message");
      }
      else{
        $http({
          method: "post",
          url:'http://68.183.101.193/android/338/AddReply.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_SenderId:Number(localStorage.getItem("UserIdKey")),
            Angular_Message:RepMessage,
            Angular_DisId:localStorage.getItem("DisIdKey")
          }
        }).success(function(data){
          console.log(data);
          $scope.ReplyList = data;
          $scope.RepMessage = '';      
        });
      }
    };


$scope.getUrl = function(image){
      return image == '' ? 'img/mcfly.jpg' : 'http://68.183.101.193/android/338/uploads/'+image;
    };
   
});
