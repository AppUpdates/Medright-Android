angular.module('starter.controllers')
  
.controller('RegisterCtrl', function($scope,$state,$ionicSideMenuDelegate,$ionicPlatform, $ionicHistory, $location, $http,
             $ionicLoading,$rootScope,PaypalService,$ionicModal,$cordovaDevice, $filter,ionicDatePicker){
    
$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$ionicPlatform.registerBackButtonAction(function (event) {
console.log(event);
  if ($scope.PersonalInfo1 == true) {
    console.log("1");
  }else if($scope.Contactinfo == true){
    console.log("2");
  }else if($scope.SubscriptionInfo == true){
    console.log("3");
  }else if($scope.Paymentinfo == true){
    console.log("4");
  }
   else {
    $scope.GoBack();
  }
}, 100);

$ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

$scope.openModal = function() {
      $scope.modal.show();
    };

$scope.closeModal = function() {
      $scope.modal.hide();
    };

$scope.CountryList = [];
$scope.StateList = [];
$scope.CityList = [];
$scope.SelectedGender = "Female";

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

$scope.loadRegister = function(){
      localStorage.setItem('FileNameKey','ProfilePic.png');
      $scope.ProfilePic = localStorage.getItem('FileNameKey');
      $scope.PersonalInfo = true;
      $scope.CityList = [{'id':'acc','name':'Accra'},
                         {'id':'kum','name':'Kumasi'},            
                         {'id':'tak','name':'Takordi'},
                         {'id':'tem','name':'Tema'}];
      console.log($scope.CityList)
      $scope.SelectedCityId = $scope.CityList[1];
      console.log( $scope.SelectedCityId);

      $http({
          method: "post",
          url:'http://68.183.101.193/android/338/GetFees.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(data){
          console.log(data)
        $scope.subscription = data;       
    });
   }     

$scope.CheckFingerPrintAvailability = function(value){

    if(value == true){
    Fingerprint.isAvailable(isAvailableSuccess, isAvailableError); 
    function isAvailableSuccess(result) {
      localStorage.setItem("FingerPrintDeviceId" , $cordovaDevice.getUUID());
    } 
    function isAvailableError(message) {
      $scope.showToast("Fingerprint is not avilable in your device");
    }
  }
}

$scope.goNextOne = function (FirstName,LastName,Email,MailCheck,MobileNumber){
      console.log(FirstName,LastName,Email,MailCheck,MobileNumber);
      var value = document.getElementById('phone').value;
      console.log(value.length);

       

      if(angular.isUndefined(FirstName) || FirstName == ""){
        $scope.showToast("Please Enter First Name");
      }
      else if(angular.isUndefined(LastName) || LastName == ""){
        $scope.showToast("Please Enter Last Name");
      }
      else if(angular.isUndefined(Email) || Email == ""){
        $scope.showToast("Please Enter Valid Email");
      }
      else if(angular.isUndefined(MobileNumber) || MobileNumber == null){
        $scope.showToast("Please Enter Mobile Number");
      }
      else if(value.length != 10){
        $scope.showToast("Please Enter 10 digit Mobile Number");
      }

      // else if(angular.isUndefined(MailCheck) || !MailCheck){
      //   $scope.showToast("Please accept terms");
      // }
      else{
        $scope.PersonalInfo = false;
        $scope.PersonalInfo1 = true;
      }
    };

    $scope.openDatePicker = function(){
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
           $scope.BirthDate = $filter('date')(new Date(val),'MM/dd/yyyy');
           $scope.BirthDate1 = new Date(val);
           
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



    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
    }

$scope.goNextOne1 = function(BirthDate,Password){
    console.log(BirthDate,Password);
     var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
     console.log(re.test(Password));
      if(angular.isUndefined(BirthDate) || BirthDate == "" || BirthDate == null){
        $scope.showToast("Please Enter Birth Date");
      }
      else if(angular.isUndefined(Password) || Password == ""){
        $scope.showToast("Please Enter Password");
      }
      else if(re.test(Password) == false){
        $scope.showToast("Please enter password with min 8 letter password, with at least a symbol, upper and lower case letters and a number");
      }

      else{
        $scope.PersonalInfo1 = false;
        $scope.Contactinfo = true;
      }
    };

$scope.goToNextTwo = function(Address1,Address2,SelectedCityId,PrivacyPolicy){
  console.log(SelectedCityId)
  if(angular.isUndefined(Address1) || Address1 == "" || Address1 == null){
        $scope.showToast("Please Enter Address");
      }
      else if(angular.isUndefined(Address2) || Address2 == "" || Address2 == null){
        $scope.showToast("Please Enter Address");
      }
      else if(angular.isUndefined(SelectedCityId)){
        $scope.showToast("Please Enter City");
      }
      else if(angular.isUndefined(PrivacyPolicy) || !PrivacyPolicy){
        $scope.showToast("Please accept terms");
      }
      else{

      $scope.Contactinfo = false;
      $scope.SubscriptionInfo = true;  
    }
           
    };

$scope.selectMemberShip = function(amount,name,id,currency){
  $scope.PlanId = id;
  $scope.Planname = name;
  $scope.currency = currency;
   $scope.amount = amount;
   $scope.SubscriptionInfo = false;
   $scope.Paymentinfo = true;    
   var d = new Date();
   var year = d.getFullYear();
   var month = d.getMonth();
   var day = d.getDate();
   var c = new Date(year + 1, month, day);
   $scope.membership_date = $filter('date')(c,'dd MMMM, yyyy');
}

$scope.completeRegister = function(MobileNumber,BirthDate,Password,FirstName,LastName,
             Email,MailCheck,Address1,Address2,SelectedCityId, payment_created,payment_id,payment_status, amount,payment_type){
 
     if(angular.isUndefined(Address1)){
        $scope.showToast("Please Enter Address1");
      }
      else if(angular.isUndefined(Address1)){
        $scope.showToast("Please Enter Address2");
      }
      else if(angular.isUndefined(SelectedCityId)){
        $scope.showToast("Please select City");
      }
      else{        
        // $scope.Paymentinfo = true;
        // $scope.Contactinfo = false;
        var CurrentDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        $scope.show();
        var Address = Address1+","+Address2;
        $http({
          method: "post",
          url:'http://68.183.101.193/android/338/RegisterUser.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_FirstName:FirstName,
            Angular_LastName:LastName,
            Angular_Email:Email,
            Angular_TermsVerified:MailCheck,
            Angular_FileId:'ProfilePic.png',
            Angular_BirthDate:BirthDate,
            Angular_Password:Password,
            Angular_MobileNo:MobileNumber,
            Angular_Address:Address,
            Angular_CityId:SelectedCityId,
            Angular_GcmToken:localStorage.getItem("fcm_token"),
            Angular_Gender:$scope.SelectedGender,
            Angular_CityCode:$rootScope.city,
            Angular_DeviceId:localStorage.getItem("FingerPrintDeviceId"),
            CreatedDate : CurrentDate
            }
        }).success(function(RegisterUser){
          console.log(RegisterUser);
           $http({
              method: "post",
              url:'http://68.183.101.193/android/338/DoPayment.php',
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              data:{
                Angular_UserId:RegisterUser[0].UserId,
                Angular_TranId:payment_id,
                Angular_CurCode:"USD",
                Angular_PStatus:payment_status,
                Angular_PType:'PayPal',
                Angular_PEmail:Email,
                Angular_amount:amount,
                Angular_Planname: $scope.Planname,
                Angular_Planid : $scope.PlanId        
              }
            }).success(function(data){
                $scope.hide();

                if(payment_type == "Cash"){
                    $http({
                      method: "post",
                      url:'http://68.183.101.193/android/338/SendEmailToAdmin.php',
                      headers: {'Content-Type':'application/x-www-form-urlencoded'},
                      data:{
                        UserId: RegisterUser[0].UserId,
                        Email : RegisterUser[0].Email,
                        FirstName : RegisterUser[0].FirstName,
                        LastName : RegisterUser[0].LastName,
                        Contact : RegisterUser[0].Contact

                      }
                      }).success(function(data){
                      console.log(data);
                      navigator.notification.confirm("Your Registration is on hold. Once you pay cash to admin, You will receive a text and email from MedRight HealthCare when your account has been activated.", function(buttonIndex) {
               
                      switch(buttonIndex) {
                      case 1:
                         $state.go('Login');
                        break;
                      }
                      }, "", ["OK"])
                      // $scope.showToast("Your Registration is on hold. Once you pay cash to admin, You will receive a text and email from MedRight HelathCare when your account has been activated.");
                      })
               }else{
                 navigator.notification.confirm("Registration done succesfully", function(buttonIndex) {
               
                switch(buttonIndex) {
                    case 1:
                         $state.go('Login');
                        break;
                 }
               }, "", ["OK"])
               }
        });       
        });
      }
    };    

$scope.cityChanged = function(SelectedCityId){
      $rootScope.city = SelectedCityId;
    };

$scope.goBack1 = function(){
      $scope.PersonalInfo = true;
      $scope.PersonalInfo1 = false;
    };

$scope.goBack2 = function(){
      $scope.PersonalInfo1 = true;
      $scope.Contactinfo = false;
    };

$scope.goBack3 = function(){
      $scope.SubscriptionInfo = false;
      $scope.Contactinfo = true;
    }
$scope.goBack4 = function(){
      $scope.Paymentinfo = false;
      $scope.SubscriptionInfo = true;
    }

$scope.SelectPicture = function(){
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imagePath) {
          // Grab the file name of the photo in the temporary directory
          var currentName = imagePath.replace(/^.*[\\\/]/, '');
          document.getElementById('ProfilePic').setAttribute('src', imagePath);
          var newFileName = imagePath.substr(imagePath.lastIndexOf('/')) + 1;
          localStorage.setItem("FileNameKey",newFileName);
          $scope.ProfilePic = localStorage.getItem("FileNameKey");

          // If you are trying to load image from the gallery on Android we need special treatment!
          if ($cordovaDevice.getPlatform() == 'Android') {
            window.FilePath.resolveNativePath(imagePath, function(entry) {
              window.resolveLocalFileSystemURL(entry, success, fail);

              function fail(e) {
                console.error('Error: ', e);
              }
              function success(fileEntry){
                var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                // Only copy because of access rights
                $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                  $scope.image = newFileName;
                  localStorage.setItem("FileNameKey",newFileName);
                  $scope.ProfilePic = localStorage.getItem("FileNameKey");
                }, function(error){
                  // $scope.showAlert('Error', error.exception);
                  $scope.showToast("Error");
                });
              };
            });
          }
          else {
            var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            // Move the file to permanent storage
            $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
              $scope.image = newFileName;
              localStorage.setItem("FileNameKey",newFileName);
              $scope.ProfilePic = localStorage.getItem("FileNameKey");
            }, function(error){
              // $scope.showAlert('Error', error.exception);
              $scope.showToast("Error");

            });
          }
        },
        function(err){
          // Not always an error, maybe cancel was pressed...
        })
    };

$scope.changedRadioValue = function(val){
      if(val == 'value1'){
        $scope.SelectedGender = "Male";
      }
      else{
        $scope.SelectedGender = "Female";
      }
    };

$scope.callPay = function(MobileNumber,BirthDate,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId, amount){
   // $scope.completeRegister(MobileNumber,BirthDate,Password,FirstName,LastName,
   //              Email,MailCheck,Address1,Address2,SelectedCityId);  

      PaypalService.initPaymentUI().then(function (){
      PaypalService.makePayment(amount, "Total Amount").then(function (response) {
        console.log(response);

        var payment_created = response.response.create_time;
        var payment_id = response.response.id;
        var payment_status = response.response.state;
        var payment_type = "PayPal";

        $scope.completeRegister(MobileNumber,BirthDate,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId,payment_created,payment_id,payment_status, amount,payment_type);    
           
      }, function (error) {
          alert("error:"+error);
        });
      });  
};

$scope.goToPay = function(val, MobileNumber,BirthDate,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId, amount,dicountprice){
     
if(dicountprice == undefined){
  var amount = amount;
}
else{
  var amount = dicountprice;
}
        $scope.callPay(MobileNumber,BirthDate,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId, amount);
        $scope.closeModal();
        
    };

     $scope.payWithHubtel =  function(MobileNumber,BirthDate,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId,amount,dicountprice){

if(dicountprice == undefined){
  var amount = amount;
}
else{
  var amount = dicountprice;
}    

alert("Under Development");
// $scope.show();
//      // $scope.completeRegister(MobileNumber,BirthDate,Password,FirstName,LastName,
//      //            Email,MailCheck,Address1,Address2,SelectedCityId); 
//      $scope.hide();

//     $http({
//             method: "post",
//             url:'http://imdhrup.com/android/338/hubtel.php',
//             headers: {'Content-Type':'application/x-www-form-urlencoded'},
//             data:{
//               Angular_Amount: amount  
//             }
//         }).success(function(data){
//           console.log(data);
//            $scope.hide();
//           $scope.openHubtelCheckout(data.data.checkoutUrl);
//       })    
  };

 $scope.openHubtelCheckout = function(url){
    cordova.ThemeableBrowser.open(url, '_blank', {
    statusbar: {
        color: '#50A0FF'
    },
    toolbar: {
        height: 44,
        color: '#50A0FF'
    },
    title: {
        color: '#FFFFFF',
        showPageTitle: true
    },
    backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
    },
    forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
    },
    closeButton: {
        wwwImage: 'img/close.png',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
    },
    customButtons: [
        {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
        }
    ],
    backButtonCanClose: true
}).addEventListener('backPressed', function(e) {
    alert('back pressed');
}).addEventListener('helloPressed', function(e) {
    alert('hello pressed');
}).addEventListener('sharePressed', function(e) {
    alert(e.url);
}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
  alert(e.message);
    console.error(e);
}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    alert(e.message);
    console.log(e);
});
 } 


$scope.ApplyCode = function(promocode,amount){
  if(angular.isUndefined(promocode)){
        $scope.showToast("Please Enter promocode");
      }
  else{
  $scope.show();
  $http({
            method: "post",
            url:'http://68.183.101.193/android/338/CheckAvailabilityOfPromocode.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              PromoCode: promocode  
            }
        }).success(function(data){
          console.log(data);

          if(data == ''){
            $scope.ShowDicountPrice = false;
            $scope.showToast("Promocode is not valid");
            $scope.hide();
          }else{
            var price=amount;
            var discount=data[0].discount;
            var afterDiscount=0;

            afterDiscount=price - ( (price*discount)/100 );
            $scope.ShowDicountPrice = true;
            $scope.dicountprice = afterDiscount;
            $scope.hide();
            
          }
          
      }) 
      } 
 }

 $scope.cashPayment = function(MobileNumber,BirthDate1,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId,amount,dicountprice){
  if(dicountprice == undefined){
  var amount = amount;
  }
  else{
  var amount = dicountprice;
  }
  var payment_type = "Cash";
  var payment_status = "pending";
  var payment_id = "";
  var payment_created = "";
   $scope.completeRegister(MobileNumber,BirthDate1,Password,FirstName,LastName,
                Email,MailCheck,Address1,Address2,SelectedCityId,payment_created,payment_id,payment_status,amount,payment_type);


  }

});
