angular.module('starter.controllers')
  
.controller('TabCtrl', function($scope, $state, $timeout, $ionicLoading, $ionicPlatform, $ionicHistory, $location, $rootScope, $http,$cordovaToast){
    
$scope.$on('$ionicView.enter', function(e) {
      if(localStorage.getItem('UserTypeKey') == 'user'){
        $scope.ProfilePic = localStorage.getItem('FileNameKey'); 
      }
      else{
        $scope.ProfilePic = localStorage.getItem('UserProfilePic');
      }
      
      $scope.UserName = localStorage.getItem('FirstNameKey')+" "+localStorage.getItem('LastNameKey');
    });

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      })
    };
    $scope.GoBack=function(){
      $ionicHistory.goBack();
    };

    $scope.showToast = function(msg){
      window.plugins.toast.show(msg, 'short', 'center')       
    };

    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
       
      });
    };

    $scope.getMenus = function(){
      $scope.show();
      if(localStorage.getItem('UserTypeKey') == 'user'){
        $scope.DoctorLogin = false; 
        $scope.PatientLogin = true;
      }
      else{
        $scope.DoctorLogin = true;
        $scope.PatientLogin = false;
      }
      $scope.hide();
    };

    $scope.login = function() {
      $state.go('app.login');
    };

    $scope.goToHome = function(){
      $state.go('tab.mainpage');
    };

    $scope.goToDoctors = function(){
      $state.go('app.doctors');
    };

    $scope.goToPerDoctors = function(){
      $state.go('app.personaldoctors1');
    };

    $scope.goToInsurance = function(){
      $state.go('app.insurance');
    };

    $scope.goToReminder = function(){
      $state.go('ReminderCategory');
    };

    $scope.goToMedicalRecord = function(){
      $state.go('app.medicalrecords');
    };

   $scope.goToNotes = function(){
      $state.go('app.add_notes1');
    };

    $scope.goToMedication = function(){
      $state.go('app.DoctorMedication');
    };

    

   
    $scope.goToChats = function(){
       // var alUser = {
       //    'userId' : localStorage.getItem("FirstNameKey"),   //Replace it with the userId of the logged in user
       //    'password' : localStorage.getItem("FirstNameKey"),  //Put password here
       //    'authenticationTypeId' : 0,//Set 0 for Development and 1 for Distribution (Release)
       //    'applicationId' : 'dhrup15c15fc77dca2c93acdb8688337399e7a',
       //    'deviceApnsType' : 0,
       //    'features' : [100, 101]
       //  };
       //  applozic.login(alUser, function(){
        
        applozic.launchChat(function() {
        console.log("success");
      }, function () {
        console.log("error");
      });
        // }, function() {});
      // var str = applozic.getContactById($rootScope.UserName.split(' ')[0]);
      // alert(str);
      // $http({
      //   method:"post",
      //   url:'https://apps.applozic.com/rest/ws/user/v2/detail',
      //   headers: {'Content-Type':'application/json'},
      //   data:{ 
      //     "userIdList":["Sss","A"]
      //   }
      // }).success(function(data){
      //   alert(data);
      // });
      
    };

    $scope.goToProfile = function(){
      $state.go('tab.profile');
    };

    $scope.goToWater = function(){
      $state.go('app.reminderdetail');
    };

    $scope.logOut = function(){  
      navigator.notification.confirm("Are you sure you want to log out?", function(buttonIndex) {
        switch(buttonIndex) {
          case 1:
            console.log("Decline Pressed");
            break;
          case 2:
            // localStorage.clear();
            $state.go('Login');
            localStorage.removeItem("auth");
            localStorage.removeItem("FullName");
            localStorage.removeItem("UserIdKey");
            localStorage.removeItem("UserProfilePic");
            localStorage.removeItem("EmailKey");
            localStorage.removeItem("OffAddress");
            localStorage.removeItem("ResAddress");
            localStorage.removeItem("Mobile");
            localStorage.removeItem("MobileEme");
            localStorage.removeItem("DocGender");
            localStorage.removeItem("DocBirthDay");
            localStorage.removeItem("DocAbout");
            localStorage.removeItem("LicenseNo");
            localStorage.removeItem("LicenseType");
            localStorage.removeItem("UserTypeKey");
            localStorage.removeItem("is_doctor");
            localStorage.removeItem("FirstNameKey");

            localStorage.removeItem("LastNameKey");
            localStorage.removeItem("BirthDateKey");
            localStorage.removeItem("Address1Key");
            localStorage.removeItem("Address2Key");
            localStorage.removeItem("MobileNoKey");
            localStorage.removeItem("GenderKey");
            localStorage.removeItem("CityIdKey");
            localStorage.removeItem("RegDateKey");
            localStorage.removeItem("MRN");


         
            break;
         }
        }, "", [ "NO", "YES"]);
    };

    $scope.goToPayment = function(){
       $state.go('app.payment');   
    };

    $scope.goToEmail = function(){
      $state.go('tab.EmailDoctor');
    };

    $scope.goToDoctorHome = function(){
      $state.go('app.DoctorsHome');
    };

    $scope.goToDoctorApp = function(){
      $state.go('app.DoctorsAppointment');  
    };

    $scope.goToDoctorProfile = function(){
      $state.go('app.DoctorsProfile');
    };

    $scope.goToDoctorSchedule = function(){
      $state.go('app.DoctorsSchedule');
    };

    $scope.DisableAvailability = function(visit){

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
        $scope.Available = true;
        if(visit == 1){
              localStorage.setItem("visit",1);
               $cordovaToast.show('Video Visit Activated', 'short', 'center');

        }
        else{
             localStorage.setItem("visit",0);
              // $cordovaToast.show('server error. Please try after sometime', 'short', 'center');
        }
     })   
} 

var visit = localStorage.getItem("visit");
if(visit == 1){
  $scope.Available = true;
}
  else{
$scope.Available = false;
  }

  });