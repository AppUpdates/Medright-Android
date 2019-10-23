angular.module('starter.controllers')
  
.controller("ProfileCtrl",function($scope,$state,$ionicSideMenuDelegate,$http,$ionicLoading,
    $ionicPlatform, $ionicHistory, $filter,$location, $rootScope,$cordovaCamera,$cordovaFile,$cordovaFileTransfer,$cordovaDevice,$timeout,ionicDatePicker){
    
$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/profile') {
    console.log("exit");
    $state.go('app.mainpage');    
  } else {
    $scope.GoBack();
  }
}, 100);

$scope.LoggedInUser = [];
$scope.ProfilePic = localStorage.getItem('FileNameKey');

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      });
    };

$scope.hide = function(){
      $ionicLoading.hide().then(function(){
      });
    };

$scope.showToast = function(msg){
      window.plugins.toast.show(msg, 'short', 'center');        
    };

$scope.GoBackProfile = function(){
  $state.go('app.profile');
}

$scope.editProfile = function(){
      $state.go('app.editprofile');
    };

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.goBack = function(){
      $scope.EditPersonalInfo = true;
      $scope.EditContactinfo = false;
    };

$scope.goBack1 = function(){
      $ionicHistory.goBack();
    };

$scope.openMenu = function (){
      $ionicSideMenuDelegate.toggleLeft();
      $scope.ProfilePic = localStorage.getItem('FileNameKey');
    };

$scope.$on('$ionicView.enter', function(e) {
     $scope.loadProfile();
});

    $scope.openDatePicker = function(){
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
           $scope.EditDOB = $filter('date')(new Date(val),'dd/MM/yyyy');
           $scope.EditDOB1 = $filter('date')(new Date(val),'MM/dd/yyyy');
           console.log($scope.EditDOB1)
           
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      // from: new Date(2012, 1, 1), //Optional
      // to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };



    // $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    // };
    }

$scope.loadProfile = function(){
      $scope.UserId = localStorage.getItem("UserIdKey");
      $scope.ProfilePic = localStorage.getItem("FileNameKey");
      $scope.FirstName = localStorage.getItem("FirstNameKey");
      $scope.LastName = localStorage.getItem("LastNameKey");
      $scope.BirthDate = localStorage.getItem("BirthDateKey");
      $scope.Email = localStorage.getItem("EmailKey");
      $scope.Address1 = localStorage.getItem("Address1Key");
      $scope.Address2 = localStorage.getItem("Address2Key");
      $scope.MobileNo = localStorage.getItem("MobileNoKey");
      $scope.MRN = localStorage.getItem('MRN');
      $scope.Gender = localStorage.getItem("GenderKey");
      $scope.Renewal = new Date(localStorage.getItem('RegDateKey'));
      $scope.Renewal.setMonth($scope.Renewal.getMonth()+12);

      var n = $filter('date')(new Date($scope.BirthDate),'d');
      $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
      var MonthYear = $filter('date')(new Date($scope.BirthDate),'MMMM, yyyy');
      $scope.Bday = $scope.Day + ' ' + MonthYear;

      $scope.ProfilePic = localStorage.getItem("FileNameKey").replace(/^.*[\\\/]/, '');
      if($scope.ProfilePic == "" || $scope.ProfilePic == undefined){
        $scope.ProfilePic = 'img/mcfly.jpg';
      }
    };  

$scope.loadEditProfile = function(){  
        
        $http({
          method:"post",
          url:'http://68.183.101.193/android/338/GetUserById.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
             Angular_UserId:Number(localStorage.getItem("UserIdKey"))
          }
        }).success(function(data){
            console.log(data[0].Contact)
            $scope.ProfilePic = data[0].profile;
            $scope.MobileNumber = data[0].Contact;
            $scope.Email = data[0].Email;
            $scope.Address = data[0].address;
        });

  };

$scope.stateChanged = function(SelectedStateId){
      console.log(SelectedStateId);
      if(SelectedStateId == undefined){
        $scope.SelectedCityId = undefined;
      }
      else{
        $http({
          method:"post",
          url:'http://68.183.101.193/android/338/GetCities.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_StateId:SelectedStateId
          }
        }).success(function(data){
          $scope.CityList = data;
        });
      }
    };    

$scope.goNextOne = function(MobileNumber,Email){
      if(angular.isUndefined(MobileNumber) || MobileNumber == null){
        $scope.showToast("Please Enter Mobile number");
      }
      else if(angular.isUndefined(Email) || Email == ""){
        $scope.showToast("Please Enter Valid Email");
      }
      else{
        console.log(MobileNumber,Email);
        $scope.EditPersonalInfo = false;
        $scope.EditContactinfo = true;       
      }
    };

$scope.changedRadioValue = function(val){
      if(val == 'value1'){
        $scope.SelectedGender = "Male";
      }
      else{
        $scope.SelectedGender = "Female";
      }
    };

$scope.SelectPicture = function() { 
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY          
        };
       
        $cordovaCamera.getPicture(options).then(
        function(imageURI) {
           console.log(imageURI);
        document.getElementById('UserProfilePic').setAttribute('src', imageURI);
        window.FilePath.resolveNativePath(imageURI, function(result) {
        // onSuccess code
        imageURI = 'file://' + result;
        $scope.picData=imageURI;
        $scope.UserProfilePic=imageURI.substr(imageURI.lastIndexOf('/') + 1);
        //sessionStorage.setItem("ProfileName",$scope.picData1);
        $scope.ftLoad = true;
        var fileURL = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        chunkedMode: false,
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers ={Connection: 'close'}

        console.log(options.fileName);   

        // getFileContentAsBase64(fileURL,function(base64Image){
        //   //window.open(base64Image);
        //   console.log(base64Image); 
        //   // Then you'll be able to handle the myimage.png file as base64
        // });
     
        var success = function (r) {
          console.log(r);
            console.log("Successful upload...");
            console.log("Code = " + r.responseCode);
            // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
        }
        var fail = function (error) {
            console.log(error);
        }       
        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;     

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://68.183.101.193/mvc/dhaug2017_338/upload/uploadToFolder.php"), success, fail,options);
        },function (error) {
          console.log("error");
        })           
        })
    }


    $scope.SelectPicture1 = function() { 
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY  
        };   

        $cordovaCamera.getPicture(options).then(
        function(imageURI) {

        document.getElementById('ProfilePic').setAttribute('src', imageURI);
        window.FilePath.resolveNativePath(imageURI, function(result) {
        // onSuccess code
        imageURI = "file://" + result;
        $scope.picData=imageURI;
        $scope.ProfilePic=imageURI.substr(imageURI.lastIndexOf('/') + 1);
        //sessionStorage.setItem("ProfileName",$scope.picData1);
        $scope.ftLoad = true;
        var fileURL = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers ={Connection: 'close',}

        console.log(options.fileName);        
        var success = function (r) {
          console.log(r);
            console.log("Successful upload...");
            console.log("Code = " + r.responseCode);
            // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
        }

        var fail = function (error) {
            console.log("error"+error);
        }       
        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;     

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://68.183.101.193/mvc/dhaug2017_338/upload/uploadToFolder1.php"), success, fail, options);

        },function (error) {
          console.log("error");
        })           
        })
    }

$scope.updateProfile = function(EditUserProfilePic, MobileNumber,Email, Address){
        if(angular.isUndefined(MobileNumber) || MobileNumber == null){
          $scope.showToast("Please Enter Mobile Number");
        }
        else if(angular.isUndefined(Email) || Email == null){
          $scope.showToast("Please Enter Email");
        }
        else if(angular.isUndefined(EditUserProfilePic) || EditUserProfilePic == null){
          // $scope.showToast("Please Select City");
        }
        else{
          $scope.show();
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/UpdateProfile.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:Number(localStorage.getItem("UserIdKey")),
              Angular_MobileNo:Number(MobileNumber),
              Angular_Email:Email,
              Angular_FileName:EditUserProfilePic,
              Angular_Address:Address
            }
          }).success(function(data){
            console.log(data)
            if(data.length!=0){
              $scope.hide();
              localStorage.setItem('EmailKey',data[0].Email);
              var addr = data[0].address.split(',');
              localStorage.setItem('Address1Key',addr[0]);
              localStorage.setItem('Address2Key',addr[1]);
              localStorage.setItem('MobileNoKey',data[0].Contact);
              localStorage.setItem('GenderKey',data[0].Gender);
              localStorage.setItem('FileNameKey',EditUserProfilePic);
              $rootScope.ProfilePic = localStorage.getItem('FileNameKey');
              localStorage.setItem('CityIdKey',data[0].service_area_code);
              $scope.showToast('Profile updated successfully'); 
              $state.go('app.profile');          
            }
            else{
              $scope.hide();
            }
          });
        }
    };

$scope.loadDoctorProfile = function(){
      $scope.DoctorUserId = localStorage.getItem("UserIdKey");
      $scope.DoctonName = localStorage.getItem('FullName');
      $scope.UserProfilePic = localStorage.getItem("UserProfilePic");
      $scope.DoctorEmailId = localStorage.getItem('EmailKey');
      $scope.DoctorOffAdd = localStorage.getItem('OffAddress');
      $scope.DoctorResAdd = localStorage.getItem('ResAddress');
      $scope.DoctorMobile = localStorage.getItem('Mobile');
      $scope.DoctorEmeMobile = localStorage.getItem('MobileEme');
      $scope.DoctorGender = localStorage.getItem('DocGender');
      $scope.DocBirthDay = localStorage.getItem('DocBirthDay');
      $scope.DocAbout = localStorage.getItem('DocAbout');
    };

$scope.editDoctorProfile = function(){
      $state.go('app.EditDoctorProfile');
    };

$scope.loadDoctorEditProfile = function(){
      $scope.UserProfilePic = localStorage.getItem("UserProfilePic");
      $scope.EditMobile = localStorage.getItem('Mobile');
      $scope.EditMobileEme = localStorage.getItem('MobileEme');
      $scope.EditEmail = localStorage.getItem('EmailKey');
      $scope.EditOffAddrress = localStorage.getItem('OffAddress');
      $scope.EditResAddrress = localStorage.getItem('ResAddress');
      $scope.EditLicenceNumber = localStorage.getItem('LicenseNo');
      $scope.EditLicenceType = localStorage.getItem('LicenseType');
      $scope.EditDOB1 = localStorage.getItem('DocBirthDay');
      $scope.EditAbout = localStorage.getItem('DocAbout');
    };

$scope.updateDoctorProfile = function(EditMobile,EditMobileEme,EditEmail,EditOffAddrress,EditResAddrress,EditAbout,UserProfilePic,EditLicenceNumber,EditLicenceType,EditDOB1){
      console.log(EditMobile,EditMobileEme,EditEmail,EditOffAddrress,EditResAddrress,UserProfilePic,EditLicenceNumber,EditLicenceType,EditDOB1); 
        if(EditMobile == undefined){          
          $scope.showToast("Please Enter Mobile Number");
        }
        else if(EditMobileEme == undefined){          
          $scope.showToast("Please Enter Emergency Mobile Number");
        }
        else if(EditEmail == undefined){
          $scope.showToast("Please Enter Email");
        }
        else if(EditOffAddrress == undefined){
          $scope.showToast("Please Enter Office Address");
        }
        else if(EditResAddrress == undefined){
          $scope.showToast("Please Enter Home Address");
        }
         else if(EditAbout == undefined){
          $scope.showToast("Please Enter About");
        }
        else if(EditLicenceType == undefined){
          $scope.showToast("Please Enter Licence Type");
        }
        else if(EditLicenceNumber == undefined){
          $scope.showToast("Please Enter Licence Number");
        }
        else if(EditDOB1 == undefined){
          $scope.showToast("Please Enter DOB");
        }
        else{
          $scope.show();
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/UpdateDoctorProfile.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_DocId:localStorage.getItem('UserIdKey'),
              Angular_contact:EditMobile,
              Angular_emer_contact:EditMobileEme,
              Angular_email:EditEmail,
              Angular_res_address:EditResAddrress,
              Angular_off_address:EditOffAddrress,
              Angular_Profilepic:UserProfilePic,
              LicenseType:EditLicenceType,
              LicenseNo:EditLicenceNumber,
              DOB:EditDOB1
            }
          }).success(function(data){
            if(data.length!=0){
              $scope.hide();
              localStorage.setItem("UserProfilePic",data[0].profile);
              $rootScope.UserProfilePic = localStorage.getItem('UserProfilePic');
              localStorage.setItem('EmailKey',data[0].email);
              localStorage.setItem('OffAddress',data[0].off_address);
              localStorage.setItem('ResAddress',data[0].res_address);
              localStorage.setItem('Mobile',data[0].contact);
              localStorage.setItem('MobileEme',data[0].emer_contact);
              localStorage.setItem('DocBirthDay',data[0].dob);
              localStorage.setItem('LicenseType',data[0].license_type);
              localStorage.setItem('LicenseNo',data[0].license);
              $scope.showToast('Profile updated successfully');
              $state.go('app.DoctorsHome');
            }
            else{
              $scope.hide();
            }
          });
        }
    };

});
