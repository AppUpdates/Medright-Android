angular.module('starter.controllers')


.controller('MainPageCtrl', function($scope, $state,$ionicSideMenuDelegate,$ionicPlatform, $ionicHistory, $location, $http,$rootScope){
  
$scope.openMenu = function (){
    $ionicSideMenuDelegate.toggleLeft();
  };

$scope.loadMainPage = function(){ 
    $scope.UserName = localStorage.getItem('FirstNameKey');
    var interval = setInterval(function(){
      var d = new Date();
      var hrs = d.getHours();

      if (hrs < 12)
        $rootScope.geetings = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
          $rootScope.geetings = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 21)
          $rootScope.geetings = 'Good Evening';
      else if (hrs >= 21 && hrs <= 24)
          $rootScope.geetings = 'Good Evening';
    },5);

   $scope.initCometChat();

  };


$scope.initCometChat = function(){


  // here in android, it shows ccomectchat is undefined

 // CCCometChat.initializeCometChat("", licenseKey, apiKey, true, function success(response) {
 //  console.log(response)
 //         var uid = localStorage.getItem("UserIdKey");
 //        CCCometChat.loginWithUID('user'+uid, function success(response) {
 //          console.log(response)
        
 //    }, function failure(error) {
 //      console.log(error)
 //    });
     
 //    }, function failure(error) {
 //       console.log(error)
       
 //    });
}  

$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/mainpage') {
     navigator.notification.confirm("Are you sure to want exit?", function(buttonIndex){
        switch(buttonIndex) {
          case 1:
            console.log("Decline Pressed");
            break;
          case 2:
             navigator.app.exitApp();
                   
            break;
         }
        }, "", [ "NO", "YES"]);
    console.log("exit");
    event.preventDefault();    
  } else {
    $scope.GoBack();
  }
}, 100);


$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.$on('$ionicView.loaded', function(){

  var absUrl = $location.url();
 
  if(absUrl == '/app/mainpage'){

   $scope.ShowPromtOfPatientFreeAppointment();
  }

   
})


$scope.ShowPromtOfPatientFreeAppointment = function(){
      $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetAppointmentFreeCount.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:localStorage.getItem("UserIdKey"),          
            }
          }).success(function(data){
            console.log(data);
            if(data[0].count == 0){
              $scope.ShowMessage = true;
            }      
       });
}

$scope.CloseMessage = function(){
  $scope.ShowMessage = false;;
}

$scope.goToModule = function(num){
     if(num==1){
    
      $state.go('HealthHistory');  
    }
    if(num==2){
      $state.go('Appointment');  
     
    }
    if(num==3){
      $state.go('ReminderCategory');  
    }

    if(num==4){
      $state.go('medicalrecords');  
    }

    if(num==5){
      $state.go('personaldoctors');
    }

    if(num == 6){
     $state.go('video_visit'); 
    }

  };

$scope.EmailDoctorClick = function(){
    $state.go('EmailDoctor');
  };

$scope.VideoVisitClick = function(){
     $state.go('video_visit');
  };
  
});
