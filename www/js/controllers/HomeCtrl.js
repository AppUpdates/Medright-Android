angular.module('starter.controllers')

.controller("HomeCtrl",function($scope,$state,$filter,$ionicSideMenuDelegate,$ionicLoading,$http,$ionicPlatform, $ionicHistory, $location,$rootScope){

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.GoToRegister = function(){
    $state.go('register')
  };

$scope.openMenu = function (){
    $ionicSideMenuDelegate.toggleLeft();
  };

$scope.show = function(){
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
  })
};

$scope.hide = function(){
    $ionicLoading.hide().then(function(){
    });
    };
  
$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/DoctorsHome') {
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

$scope.GoToCity = function(city){
    var str = city.toLowerCase();
    var res = str.slice(0, 3);
    $rootScope.city = res;
    $rootScope.cityName = city;
    $state.go('register');
  };

$scope.GoToLogin = function(){
    $state.go('Login');
  };  

$scope.$on('$ionicView.enter', function(e) {
     $scope.loadDoctorHome();
      });
$scope.loadDoctorHome = function(){

     $scope.show($ionicLoading);
     $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetDoctorProfile.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:localStorage.getItem('UserIdKey')
        }
      }).success(function(data){
        console.log(data);
         $scope.hide($ionicLoading);
        localStorage.setItem("UserProfilePic",data[0].profile);
        localStorage.setItem("FullName",data[0].name+' '+data[0].lname);
        localStorage.setItem("OffAddress",data[0].off_address);
        localStorage.setItem("ResAddress",data[0].res_address);
        localStorage.setItem("Mobile",data[0].contact);
        localStorage.setItem('MobileEme',data[0].emer_contact);
        localStorage.setItem('DocGender',data[0].gender);
        localStorage.setItem('DocBirthDay',data[0].dob);
        localStorage.setItem('DocAbout',data[0].aboutfam);
        localStorage.setItem('LicenseNo',data[0].license);
        localStorage.setItem('LicenseType',data[0].license_type);
        localStorage.setItem("FirstNameKey",data[0].name);
        localStorage.setItem("visit",data[0].IsAvailable);
        $scope.UserProfilePic = localStorage.getItem('UserProfilePic');
        $scope.DoctorName = localStorage.getItem('FullName');
        $scope.DoctorOffAdd = localStorage.getItem('OffAddress');
        $scope.DoctorResAdd = localStorage.getItem('ResAddress');
        $scope.DoctorMobile = localStorage.getItem('Mobile');
        $scope.DoctorEmeMobile = localStorage.getItem('MobileEme');
        $scope.LicenseNo = localStorage.getItem('LicenseNo');
        $scope.LicenseType = localStorage.getItem('LicenseType');
        $scope.DoctorEmail = localStorage.getItem("EmailKey");
        $scope.DoctorDOB = localStorage.getItem("DocBirthDay");

        var n = $filter('date')(new Date($scope.DoctorDOB),'d');
        $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        var MonthYear = $filter('date')(new Date($scope.DoctorDOB),'MMMM, yyyy');
        $scope.Bday = $scope.Day + ' ' + MonthYear;

        $scope.About = localStorage.getItem("DocAbout");
        if(data[0].IsAvailable == 0){
         $scope.enable_visit = true;  
        }
        else{
         $scope.disable_visit = true; 
        }
       $scope.initCometChat();
        
     })   
  }

$scope.initCometChat = function(){

 // CCCometChat.initializeCometChat("", licenseKey, apiKey, true, function success(response) {
 //         var uid = localStorage.getItem("UserIdKey");
 //        CCCometChat.loginWithUID(uid, function success(response) {
 //          $scope.hide($ionicLoading);

       
 //    }, function failure(error) {
      
 //    });
     
 //    }, function failure(error) {
       
       
 //    });
}


$scope.editDoctorProfile = function(){
      $state.go('app.EditDoctorProfile');
    };


$scope.DisableAvailability = function(visit,Available){
    $scope.show($ionicLoading);
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/DisableAvailability.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:localStorage.getItem('UserIdKey'),
          Angular_Visit:visit
        }
      }).success(function(data){
        $scope.hide($ionicLoading);
        console.log(data)
        if(visit == 1){
         $scope.Available = true;
        
        }
        else{
        
        Available = false; 
        }
     })   
} 

});
