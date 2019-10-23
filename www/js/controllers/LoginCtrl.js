angular.module('starter.controllers')

.controller('LoginCtrl', function($scope, $rootScope, $location, $ionicPlatform, $state, $timeout,$http,$ionicLoading,$ionicHistory,$cordovaDevice){

$ionicPlatform.registerBackButtonAction(function() { 
  if ($location.path() === "/Login" || $location.path() === "Login1") {
    navigator.app.exitApp();
  }
  else {
    $ionicHistory.goBack();
    $ionicHistory.nextViewOptions({
    historyRoot: true
  });   
  }
}, 100);

$scope.CityList = [{'id':'acc','name':'Accra'},
                  {'id':'kum','name':'Kumasi'},            
                  {'id':'tak','name':'Takordi'},
                  {'id':'rem','name':'Tema'}];

$scope.show = function(){
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

$scope.GoBack = function(){
      $ionicHistory.goBack();
};

$scope.goToPatientLOgin = function(){
      $state.go('Login');
}

$scope.doLogin = function(LoginEmail,LoginPass){
      // var model = $cordovaDevice.getModel();
      // var version = $cordovaDevice.getVersion();
      // var platform = $cordovaDevice.getPlatform();
      // var deviceuuid = $cordovaDevice.getUUID();
      var deviceInfo = '';
      console.log(LoginEmail,LoginPass);
      if(angular.isUndefined(LoginEmail) || LoginEmail == ""){
        $scope.showToast("Please enter valid email");

      }
      else if(angular.isUndefined(LoginPass) || LoginPass == ""){
        $scope.showToast("Please enter password");
      }
      else{
        $scope.show($ionicLoading);
        $http({
          method:'post',
          url:'http://68.183.101.193/android/338/Login.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Email:LoginEmail,
            Angular_Password:LoginPass,
            Angular_DeviceInfo:deviceInfo
          }
        }).success(function(data){
          console.log(data);
          $scope.hide($ionicLoading);
          if(data.length!= 0){
            $rootScope.UserProfilePic = data[0].FileName;
            $rootScope.UserName = data[0].FirstName + ' ' + data[0].LastName;         
            localStorage.setItem("UserIdKey",data[0].UserId);
            localStorage.setItem("UserProfilePic",data[0].profile);
            localStorage.setItem("FirstNameKey",data[0].FirstName);
            localStorage.setItem('LastNameKey',data[0].LastName);
            localStorage.setItem('BirthDateKey',data[0].BirthDate);
            localStorage.setItem('EmailKey',data[0].Email);
            localStorage.setItem('Address',data[0].address);
            var addr = data[0].address.split(',');
            localStorage.setItem('Address1Key',addr[0]);
            localStorage.setItem('Address2Key',addr[1]);
            localStorage.setItem('MobileNoKey',data[0].Contact);
            localStorage.setItem('GenderKey',data[0].Gender);
            localStorage.setItem('FileNameKey',data[0].profile);
            localStorage.setItem('CityIdKey',data[0].service_area_code);
            localStorage.setItem('RegDateKey',data[0].reg_date); 
            localStorage.setItem('UserTypeKey','user');
            localStorage.setItem('auth',"1");
            localStorage.setItem('is_doctor',"0");
            localStorage.setItem('MRN',data[0].MRN);
            $scope.UpdateUserToken();
            for(var i=0;i<$scope.CityList.length;i++){
              if($scope.CityList[i].id == data[0].service_area_code){
                localStorage.setItem('CityNameKey',$scope.CityList[i].name);
              } 
            }
            $state.go('app.mainpage'); 
            $scope.hide();            
          }
          else{
            $scope.hide();
            $scope.showToast("Invalid User");
          }
        })
      }
    };

$scope.UpdateUserToken = function(){
       $http({
          method:'post',
          url:'http://68.183.101.193/android/338/UpdateUserFcmToken.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Token:localStorage.getItem("fcm_token"),
            Angular_UserId:localStorage.getItem("UserIdKey")
          }
        }).success(function(data){
          console.log(data);
          });
    }

// http://imdhrup.com/mvc/dhaug2017_338/account/reset
$scope.goToForgotPass = function(){
     cordova.InAppBrowser.open('http://68.183.101.193/android/338/UI.html', '_blank', 'location=yes');
  };

$scope.goToRegister = function(){
      $state.go('register');
  };

$scope.goToDLogin = function(){
      $state.go('Login1');  
  };

$scope.doLogin1 = function(DLoginEmail,DLoginPass){
      if(angular.isUndefined(DLoginEmail) || DLoginEmail == ""){
        $scope.showToast("Please enter valid email");
      }
      else if(angular.isUndefined(DLoginPass) || DLoginPass == ""){
        $scope.showToast("Please enter password");
      }
      else{
        $scope.show($ionicLoading);
        DLoginEmail = DLoginEmail.toLowerCase();
        DLoginPass = DLoginPass.toLowerCase();
        $http({
          method:'post',
          url:'http://68.183.101.193/android/338/Login1.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Email:DLoginEmail,
            Angular_Password:DLoginPass
          }
        }).success(function(data){
          console.log(data);
          $scope.hide($ionicLoading);
          if(data.length!= 0){
            $rootScope.UserProfilePic = data[0].profile;
            $rootScope.UserName = data[0].name + ' ' + data[0].lname;
            localStorage.setItem('FullName', $rootScope.UserName);
            localStorage.setItem("UserIdKey",data[0].doc_id);
            localStorage.setItem("UserProfilePic",data[0].profile);
            localStorage.setItem('EmailKey',data[0].email);
            localStorage.setItem('OffAddress',data[0].off_address);
            localStorage.setItem('ResAddress',data[0].res_address);
            localStorage.setItem('Mobile',data[0].contact);
            localStorage.setItem('MobileEme',data[0].emer_contact);
            localStorage.setItem('DocGender',data[0].gender);
            localStorage.setItem('DocBirthDay',data[0].dob);
            localStorage.setItem('DocAbout',data[0].aboutfam);
            localStorage.setItem('LicenseNo',data[0].license);
            localStorage.setItem('LicenseType',data[0].license_type);
            localStorage.setItem('UserTypeKey','doctor');
            localStorage.setItem('auth',"1");
            localStorage.setItem('is_doctor',"1");
            localStorage.setItem("FirstNameKey",data[0].name);
            localStorage.setItem("SOI",data[0].SOI);
            $scope.UpdateDoctorToken();
            $state.go('app.DoctorsHome');                        
            $scope.hide();            
          }
          else{
            $scope.hide();
            $scope.showToast("Invalid User");
          }
        });
      }
    };

$scope.UpdateDoctorToken = function(){
       $http({
          method:'post',
          url:'http://68.183.101.193/android/338/UpdateDoctorFcmToken.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_Token:localStorage.getItem("fcm_token"),
            Angular_UserId:localStorage.getItem("UserIdKey")
          }
        }).success(function(data){
          console.log(data);
          });
    }

$scope.addFingerPrint = function(){
    var deviceuuid =$cordovaDevice.getUUID();
    $scope.show();
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/VerifyDeviceInfo.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_DeviceInfo:deviceuuid
          }
        }).success(function(data){
          console.log(data);
          $scope.hide($ionicLoading);
          if(data.length!= 0){            
          $scope.hide();
            $rootScope.UserProfilePic = data[0].FileName;
            $rootScope.UserName = data[0].FirstName + ' ' + data[0].LastName;         
            localStorage.setItem("UserIdKey",data[0].UserId);
            localStorage.setItem("UserProfilePic",data[0].profile);
            localStorage.setItem("FirstNameKey",data[0].FirstName);
            localStorage.setItem('LastNameKey',data[0].LastName);
            localStorage.setItem('BirthDateKey',data[0].BirthDate);
            localStorage.setItem('EmailKey',data[0].Email);
            localStorage.setItem('Address',data[0].address);
            var addr = data[0].address.split(',');
            localStorage.setItem('Address1Key',addr[0]);
            localStorage.setItem('Address2Key',addr[1]);
            localStorage.setItem('MobileNoKey',data[0].Contact);
            localStorage.setItem('GenderKey',data[0].Gender);
            localStorage.setItem('FileNameKey',data[0].profile);
            localStorage.setItem('CityIdKey',data[0].service_area_code);
            localStorage.setItem('RegDateKey',data[0].reg_date); 
            localStorage.setItem('UserTypeKey','user');
            localStorage.setItem('auth',"1");
            localStorage.setItem('is_doctor',"0");
            localStorage.setItem('MRN',data[0].MRN);
            $scope.UpdateUserToken();
            for(var i=0;i<$scope.CityList.length;i++){
              if($scope.CityList[i].id == data[0].service_area_code){
                localStorage.setItem('CityNameKey',$scope.CityList[i].name);
              } 
            }
            $state.go('app.mainpage');      
          }
          else{
            $scope.hide();
            $scope.showToast("Invalid User");
          }
        });   
  };

$scope.doLoginusingFingerPrint = function(){ 
  Fingerprint.show({
      clientId: "Fingerprint-Demo",
      clientSecret: "password" 
    }, successCallback, errorCallback);
 
    function successCallback(){
    window.plugins.toast.showWithOptions({
    message: "Authentication successful",
    duration: "short", 
    position: "bottom",
    styling: {
      opacity: 0.75, 
      backgroundColor: '#000000', 
      textColor: '#FFFFFF', 
      textSize: 20.5, 
      cornerRadius: 16, 
      horizontalPadding: 50, 
      verticalPadding: 30
    }
  });
    $scope.addFingerPrint();
  }
  function errorCallback(err){
    navigator.notification.alert(
    'Authentication invalid',  
    alertDismissed,        
    '',         
    'Ok'                 
);
  }
  function alertDismissed() {
}
}

$scope.goToLogin = function(){
    $state.go('Login');
  }

  $scope.save = function(){
    var name;
    var nameInterval;
    var win = window.open( "http://68.183.101.193/android/338/UI2.html?", "_blank",
  "EnableViewPortScale=yes" );

 win.addEventListener( "loadstop", function() {
        win.executeScript({ code: "window.localStorage.setItem('name', '')" });
        nameInterval = setInterval(function() {
            win.executeScript({ code: "window.localStorage.getItem('name')" }, function(values) {
                name = values[0];
            });
        }, 100)
    });
            
    win.addEventListener('exit', function() {
        clearInterval(nameInterval);
        alert(name);
        document.getElementById('output').innerText = name;
    });
  }

});
