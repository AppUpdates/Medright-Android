angular.module('starter.controllers')
  
.controller('MenuCtrl', function($scope, $state, $timeout, $ionicLoading, $ionicPlatform, $ionicHistory, $location, $rootScope, $http,$cordovaToast){
    
$scope.$on('$ionicView.enter', function(e) {
      if(localStorage.getItem('UserTypeKey') == 'user'){
        $scope.ProfilePic = localStorage.getItem('FileNameKey'); 
        $scope.Name = localStorage.getItem('FirstNameKey')+" "+localStorage.getItem('LastNameKey');
        $scope.SOI =localStorage.getItem("CityNameKey");
      }
      else{
        $scope.ProfilePic = localStorage.getItem('UserProfilePic');
        $scope.Name = localStorage.getItem("FullName");
        $scope.SOI = localStorage.getItem("CityNameKey");
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
        $scope.Highlight1 = true;
        $scope.Highlight2 = false;
        $scope.Highlight3 = false;
        $scope.Highlight4 = false;
        $scope.Highlight5 = false;
        $scope.Highlight13 = false;

      }
      else{
        $scope.DoctorLogin = true;
        $scope.Highlight6 = true;
        $scope.Highlight7 = false;
        $scope.Highlight8 = false;
        $scope.Highlight9 = false;
        $scope.Highlight10 = false;
        $scope.Highlight11 = false;
        $scope.Highlight12 = false;
        $scope.PatientLogin = false;
      }
      $scope.hide();
    };

$scope.login = function() {
      $state.go('app.login');
    };

$scope.goToHome = function(){
   $state.go('app.mainpage');
   $scope.Highlight1 = true;
   $scope.Highlight2 = false;
   $scope.Highlight3 = false;
   $scope.Highlight4 = false;
   $scope.Highlight5 = false;
   $scope.Highlight13 = false;
      
    };

$scope.goToDoctors = function(){
   $scope.Highlight3 = true;
   $scope.Highlight1 = false;
   $scope.Highlight2 = false;
   $scope.Highlight4 = false;
   $scope.Highlight5 = false;
   $scope.Highlight13 = false;
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
  $scope.Highlight9 = true;
   $scope.Highlight6 = false;
   $scope.Highlight8 = false;
   $scope.Highlight7 = false;
   $scope.Highlight10 = false;
   $scope.Highlight11 = false;
   $scope.Highlight12 = false;
      $state.go('app.add_notes1');
    };

$scope.goToMedication = function(){
   $scope.Highlight10 = true;
   $scope.Highlight6 = false;
   $scope.Highlight8 = false;
   $scope.Highlight9 = false;
   $scope.Highlight7 = false;
    $scope.Highlight11 = false;
    $scope.Highlight12 = false;
      $state.go('app.DoctorMedication');
    };

$scope.goToChats = function(){
  $scope.Highlight13 = true;
   $scope.Highlight1 = false;
   $scope.Highlight3 = false;
   $scope.Highlight4 = false;
   $scope.Highlight5 = false;
   $scope.Highlight2 = false;
$state.go('app.Chats');       
};

$scope.goToChats1 = function(){
   $scope.Highlight12 = true;
   $scope.Highlight6 = false;
   $scope.Highlight8 = false;
   $scope.Highlight9 = false;
   $scope.Highlight7 = false;
    $scope.Highlight11 = false;
    $scope.Highlight10 = false;
$state.go('app.DoctorChats');       
};

$scope.goToProfile = function(){
   $scope.Highlight2 = true;
   $scope.Highlight1 = false;
   $scope.Highlight3 = false;
   $scope.Highlight4 = false;
   $scope.Highlight5 = false;
   $scope.Highlight13 = false;
   $state.go('app.profile');
    };

$scope.goToMedicationList = function(){
   $scope.Highlight4 = true;
   $scope.Highlight1 = false;
   $scope.Highlight3 = false;
   $scope.Highlight2 = false;
   $scope.Highlight5 = false;
   $scope.Highlight13 = false;
       $state.go('app.MeicationList');
    }

$scope.goToWater = function(){
      $state.go('app.reminderdetail');
    };

$scope.logOut = function(){
      navigator.notification.confirm("Are you sure you want to log out?", function(buttonIndex){
        switch(buttonIndex) {
          case 1:
            console.log("Decline Pressed");
            break;
          case 2:
            // localStorage.clear();
if(localStorage.getItem('UserTypeKey') == 'user'){
    $http({
              method:'post',
              url:'http://68.183.101.193/android/338/UpdateUserFcmToken.php',
              headers:{'Content-Type':'application/x-www-form-urlencoded'},
              data:{
                Angular_Token:'',
                Angular_UserId:localStorage.getItem("UserIdKey")
              }
            }).success(function(data){
              console.log(data);
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
               
        });
          }else{
            
   $http({
          method:'post',
          url:'http://68.183.101.193/android/338/UpdateDoctorFcmToken.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Token:'',
            Angular_UserId:localStorage.getItem("UserIdKey")
          }
        }).success(function(data){
          console.log(data);
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
    });
}

 
            break;
         }
        }, "", [ "NO", "YES"]);
    };

$scope.goToPayment = function(){
       $state.go('app.payment');   
    };

$scope.goToEmail = function(){
   $scope.Highlight5 = true;
   $scope.Highlight1 = false;
   $scope.Highlight3 = false;
   $scope.Highlight4 = false;
   $scope.Highlight2 = false;
   $scope.Highlight13 = false;
   $state.go('app.EmailDoctor');
    };

$scope.goToDoctorHome = function(){
   $state.go('app.DoctorsHome');
   $scope.Highlight6 = true;
   $scope.Highlight7 = false;
   $scope.Highlight8 = false;
   $scope.Highlight9 = false;
   $scope.Highlight10 = false;
   $scope.Highlight11 = false;
   $scope.Highlight12 = false;
    };

$scope.goToDoctorApp = function(){
   $scope.Highlight7 = true;
   $scope.Highlight6 = false;
   $scope.Highlight8 = false;
   $scope.Highlight9 = false;
   $scope.Highlight10 = false;
   $scope.Highlight11 = false;
   $scope.Highlight12 = false;
   $state.go('app.DoctorsAppointment');  
    };

$scope.goToDoctorProfile = function(){
      $state.go('app.DoctorsProfile');
    };

$scope.goToDoctorSchedule = function(){
   $scope.Highlight8 = true;
   $scope.Highlight6 = false;
   $scope.Highlight7 = false;
   $scope.Highlight9 = false;
   $scope.Highlight10 = false;
   $scope.Highlight11 = false;
   $scope.Highlight12 = false;
   $state.go('app.DoctorsSchedule');
    };

$scope.DisableAvailability = function(visit){

   // $scope.Highlight8 = false;
   // $scope.Highlight6 = false;
   // $scope.Highlight7 = false;
   // $scope.Highlight9 = false;
   // $scope.Highlight10 = false;
   // $scope.Highlight11 = true;
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
               // $cordovaToast.show('Video Visit Activated', 'short', 'center');
                 window.plugins.toast.show('Video Visit Activated', 'short', 'center') ; 
        }
        else{
             localStorage.setItem("visit",0);
              window.plugins.toast.show('Video Visit Deactivated', 'short', 'center') ; 
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