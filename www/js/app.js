var apiKey = "46293082";
var sessionId = "2_MX40NjI5MzA4Mn5-MTU2ODgyNDMxMDUyMX4zOTRCOEw5MmRKN1Z5SFJQeDhUa0swSHV-fg";
var token = "T1==cGFydG5lcl9pZD00NjI5MzA4MiZzaWc9N2M2YWE5ZTA1NDJiZGNmOWQxNWIxNGVjZjQ0NDAzOWFkMGIwMWRjZjpzZXNzaW9uX2lkPTJfTVg0ME5qSTVNekE0TW41LU1UVTJPRGd5TkRNeE1EVXlNWDR6T1RSQ09FdzVNbVJLTjFaNVNGSlFlRGhVYTBzd1NIVi1mZyZjcmVhdGVfdGltZT0xNTY4ODI0MzI5Jm5vbmNlPTAuODk2NjAxNjkxMzA2OTc5NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTcxNDE2MzI4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
var video_time_counter = false;
var interval;
var msLeft ;
var myVar;

angular.module('starter', ['ionic','starter.controllers','ionic-toast','starter.payPalService','ngCordova','ionic-ratings','ionic-timepicker','ionic-datepicker','ionic.rating'])

.run(function($ionicPlatform, $ionicLoading, $rootScope, $window, $http, $state, $ionicHistory,$ionicScrollDelegate,$filter  ) { 
  $ionicPlatform.ready(function() {

document.getElementsByTagName("BODY")[0].ononline = function() {onFunction()};
document.getElementsByTagName("BODY")[0].onoffline = function() {offFunction()};

$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
  console.log(from);
  localStorage.setItem('lastView', from.name);
});

function onFunction() {                                                                  
  console.log(localStorage.getItem('lastView'));
  $state.go(localStorage.getItem('lastView'));
}

function offFunction() {
  $state.go('OfflinePage');
}

// document.addEventListener('deviceready', function() {
//   console.log('cordova.plugins.CordovaCall is now available');
//   var cordovaCall = cordova.plugins.CordovaCall;
//   cordova.plugins.CordovaCall.receiveCall('Priyanka',1); //not necessary, but might be more convenient
// });

// function success(){
//   alert("success");
// }

// function error(){
//   alert("error");
// }

document.addEventListener('deviceready', function () {
    // cordova.plugins.printer is now available
    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
    switch(status){
        case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
            console.log("Permission granted to use the camera");
            break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
            console.log("Permission to use the camera has not been requested yet");
            break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
            console.log("Permission denied to use the camera - ask again?");
            break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
            break;
    }
}, function(error){
    console.error("The following error occurred: "+error);
}, cordova.plugins.diagnostic.runtimePermission.CAMERA);

 cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status) {
        if (status !== "GRANTED") {
          cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status) {
            //...
            return;
          });
        }
    }, function() {
      throw new Meteor.error('failed to get permission for microphone');
    });
}, false);


if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
if (window.StatusBar) {
    // StatusBar.backgroundColorByHexString('#000000');
    // StatusBar.overlaysWebView(false);
    StatusBar.styleLightContent();
    }

var notificationOpenedCallback = function(jsonData) {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      })
    

      var username = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.username;
      var comet_user_id = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.comet_user_id;
      var user_id = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.user_id;
      var role = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.role;
      var medication = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.medicationlist;
      var message = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.message;
      var name = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.name;
      var receiverid = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.receiverid;
      var ischat = JSON.parse(JSON.stringify(jsonData)).notification.payload.additionalData.ischat;
      console.log(JSON.stringify(jsonData));
      if(ischat == 1){
      $ionicLoading.hide();
      localStorage.setItem("ChatId",receiverid);
      $rootScope.u_name = name;
      $state.go('app.private_chatroom');

      if(localStorage.getItem("is_doctor") == 1){
        var SenderId = "doc"+localStorage.getItem("UserIdKey");
        var ReceiverId = "pat"+localStorage.getItem("ChatId");
        }

      if(localStorage.getItem("is_doctor") == 0){
        var SenderId = "pat"+localStorage.getItem("UserIdKey");
        var ReceiverId = "doc"+localStorage.getItem("ChatId");
      }

      var RoomId = localStorage.getItem("ChatId")+localStorage.getItem("UserIdKey");
      var MyRoomId = localStorage.getItem("UserIdKey")+localStorage.getItem("ChatId");
      var MessageDate = $filter('date')(new Date(), 'dd/MM/yy');
      var MessageTime = $filter('date')(new Date(), 'h:mm a');

      $rootScope.Messages.push(
                         {
                          message_date: MessageDate,
                          message_time: MessageTime,
                          message_content: message,
                          receiver_id: SenderId,
                          sender_id: ReceiverId
                          }
                 );
            $rootScope.$apply();
            $ionicScrollDelegate.scrollBottom();


            $ionicLoading.hide();
      }

     
      

      if(medication == 'medicationlist'){
        $state.go('app.DoctorMedication');
      }
      
      if(role == 'user'){
        //doctor
        localStorage.setItem("VideoCallPatientId" , user_id);
        var login_user_id  = localStorage.getItem("UserIdKey");
        
        $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetVideoCallEntry.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_UserId : localStorage.getItem("VideoCallPatientId")
        }
        }).success(function(data){
         console.log(data);
         if(data != ''){
          localStorage.setItem("VideoUserName" , username);
          $state.go('video_call');
         }
        }) 
        // $state.go('video_call'); 
        $ionicLoading.hide();
      }

      if(role == 'doctor'){
        //patient
       localStorage.setItem("VideoCallDoctorId" , user_id);
       var login_user_id  = 'user'+localStorage.getItem("UserIdKey"); 
        localStorage.setItem("VideoUserName" , username);
       $state.go('video_call');
        
        $ionicLoading.hide();
      }

};

window.plugins.OneSignal
    .startInit("7994040e-c2e9-4f21-ab7d-43bd014b098a")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
    window.plugins.OneSignal.getIds(function(ids) {
      console.log("fcmtoken"+ids);
     localStorage.setItem("fcm_token",ids['userId']);
});

// window.plugins.OneSignal
//   .startInit("7994040e-c2e9-4f21-ab7d-43bd014b098a")
//   .handleNotificationReceived(function(jsonData) {
//     alert("Notification received:\n" + JSON.stringify(jsonData));
//     console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
//   })
//   .endInit();



    
});    
})


.filter('datetime', function($filter){
  return function(input){
    if(input == null){ return ""; } 

    var _date = $filter('date')(new Date(input),'dd-MMM-yy h:mm a');         
    return _date.toUpperCase();
  };
 })

.filter('mydate', function($filter){
  return function(input){
    if(input == null){ return ""; } 

    var _date = $filter('date')(new Date(input),'dd-MMM-yyyy');         
    return _date.toUpperCase();
  };
 })

.directive('goNative', ['$ionicGesture', '$ionicPlatform', function($ionicGesture, $ionicPlatform) {
  return {
    restrict: 'A',
 
    link: function(scope, element, attrs) {
 
      $ionicGesture.on('tap', function(e) {
 
        var direction = attrs.direction;
        var transitiontype = attrs.transitiontype;
 
        $ionicPlatform.ready(function() {
 
          switch (transitiontype) {
            case "slide":
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
            case "flip":
              window.plugins.nativepagetransitions.flip({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "fade":
              window.plugins.nativepagetransitions.fade({
                   
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
 
            case "drawer":
              window.plugins.nativepagetransitions.drawer({
                  "origin"         : direction,
                  "action"         : "open"
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "curl":
              window.plugins.nativepagetransitions.curl({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;              
               
            default:
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
          }
 
 
        });
      }, element);
    }
  };
}])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $stateProvider
 

  .state('app', {
    url: '/app',
    abstract: true,
    cache : 'false',
    templateUrl: 'templates/Menu.html',
    controller: 'MenuCtrl'
   })

  .state('app.mainpage', {
    url: '/mainpage',
    views: {
      'menuContent': {
        templateUrl: 'templates/MainPage.html',
        controller: 'MainPageCtrl'
      }
    }
   })

  .state('app.doctors', {
    url: '/doctors',
    views: {
      'menuContent': {
        templateUrl: 'templates/Doctors.html',
        controller: 'DoctorsCtrl'
      }
    }
   })

  .state('app.MeicationList', {
    url: '/MeicationList',
     views: {
      'menuContent': {
        templateUrl: 'templates/MeicationList.html',
        controller: 'MedicationCtrl'
      }
    }
   })


  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/Profile.html',
        controller: 'ProfileCtrl'
      }
    }
   })


  .state('app.editprofile', {
    url: '/editprofile',
    views: {
      'menuContent': {
        templateUrl: 'templates/EditProfile.html',
        controller: 'ProfileCtrl'
      }
    }
   })


  .state('app.EmailDoctor', {
    url: '/EmailDoctor',
    views: {
      'menuContent': {
        templateUrl: 'templates/EmailDoctor.html',
        controller: 'DoctorsCtrl'
      }
    }
  })

  .state('ViewDoctorProfile', {
    cache: 'false',
    url: '/ViewDoctorProfile',   
    templateUrl: 'templates/ViewDoctorProfile.html',
    controller: 'DoctorsCtrl'
   })
  
 .state('HealthHistory', {
    cache: 'false',
    url: '/HealthHistory',   
    templateUrl: 'templates/HealthHistory.html',
    controller: 'HealthHistoryCtrl'
   })

    .state('HistoryList', {
    cache: 'false',
    url: '/HistoryList',   
    templateUrl: 'templates/HistoryList.html',
    controller: 'HealthHistoryCtrl'
   })

     .state('PatientHealthHistory', {
    cache: 'false',
    url: '/PatientHealthHistory',   
    templateUrl: 'templates/PatientHealthHistory.html',
    controller: 'HealthHistoryCtrl'
   })

    .state('PatientHealthHistory_call', {
    cache: 'false',
    url: '/PatientHealthHistory_call',   
    templateUrl: 'templates/PatientHealthHistory_call.html',
    controller: 'HealthHistoryCtrl'
   })
     

   .state('medicalrecords', {
    url: '/medicalrecords',   
    templateUrl: 'templates/MedicalRecord.html',
    controller: 'MedicalRecordCtrl'
   })

  .state('FirstPage', {
    cache: 'false',
    url: '/FirstPage',
    templateUrl: 'templates/FirstPage.html',
    controller: 'LoginCtrl'
   })

   .state('test', {
    cache: 'false',
    url: '/test',
    templateUrl: 'templates/test.html',
    controller: 'LoginCtrl'
   })

    .state('add_notes', {
    cache: 'false',
    url: '/add_notes',
    templateUrl: 'templates/add_notes.html',
    controller: 'NotesCtrl'
   })

    .state('detail_notes', {
    cache: 'false',
    url: '/detail_notes',
    templateUrl: 'templates/detail_notes.html',
    controller: 'NotesCtrl'
   }) 
    
   .state('MedicalRecord1', {
    cache: 'false',
    url: '/MedicalRecord1',
    templateUrl: 'templates/MedicalRecord1.html',
    controller: 'DoctorsCtrl'
   }) 


   .state('detail_notes1', {
    cache: 'false',
    url: '/detail_notes1',
    templateUrl: 'templates/detail_notes1.html',
    controller: 'DoctorsCtrl'
   })

    .state('addendum', {
    cache: 'false',
    url: '/addendum',
    templateUrl: 'templates/addendum.html',
    controller: 'DoctorsCtrl'
   })

   .state('DoctoreProfile', {
    cache: 'false',
    url: '/DoctoreProfile',
    templateUrl: 'templates/DoctoreProfile.html',
    controller: 'DoctorsCtrl'
   })


   .state('AppointmentDetail', {
    cache: 'false',
    url: '/AppointmentDetail',
    templateUrl: 'templates/AppointmentDetail.html',
    controller: 'AppointmentCtrl'
   })

  .state('Login', {
    cache: 'false',
    url: '/Login',
    templateUrl: 'templates/Login.html',
    controller: 'LoginCtrl'
   })

  .state('video_visit', {
    cache: 'false',
    url: '/video_visit',
    templateUrl: 'templates/video_visit.html',
    controller: 'ChatController'
   })

    .state('video_time', {
    cache: 'false',
    url: '/video_time',
    templateUrl: 'templates/video_time.html',
    controller: 'ChatController'
   })

    .state('visit_type', {
    cache: 'false',
    url: '/visit_type',
    templateUrl: 'templates/visit_type.html',
    controller: 'AppointmentCtrl'
   })

  

  .state('Login1', {
    cache: 'false',
    url: '/Login1',
    templateUrl: 'templates/Login1.html',
    controller: 'LoginCtrl'
   })

  .state('Home', {
    cache: 'false',
    url: '/Home',
    templateUrl: 'templates/Home.html',
    controller: 'HomeCtrl'
   })

  .state('register', {
    cache: 'false',
    url: '/register',
    templateUrl: 'templates/Register.html',
    controller: 'RegisterCtrl'
   })

    .state('set_time', {
    cache: 'false',
    url: '/set_time',
    templateUrl: 'templates/set_time.html',
    controller: 'ScheduleCtrl'
   })

  .state('reminderdetail', {
    cache: 'false',
    url: '/reminderdetail',
    templateUrl: 'templates/ReminderDetail.html',
    controller: 'ReminderCtrl'
   })

  .state('reminder', {
    cache: 'false',
    url: '/reminder',
    templateUrl: 'templates/Reminder.html',
    controller: 'ReminderCtrl'
   })

  .state('forgotpassword', {
    cache: 'false',
    url: '/forgotpassword',
    templateUrl: 'templates/ForgotPassword.html',
    controller: 'ForgotPasswordCtrl'
   })

  .state('editreminder', {
    cache: 'false',
    url: '/editreminder',
    templateUrl: 'templates/EditReminder.html',
    controller: 'ReminderCtrl'
   })

  .state('OfflinePage', {
    cache: 'false',
    url: '/OfflinePage',
    templateUrl: 'templates/OfflinePage.html',
    controller: 'ReminderCtrl'
   })

    .state('DoctorsList', {
    cache: 'false',
    url: '/DoctorsList',
    templateUrl: 'templates/DoctorsList.html',
    controller: 'AppointmentCtrl'
   })

    .state('Appointment', {
    cache: 'false',
    url: '/Appointment',
    templateUrl: 'templates/Appointment.html',
    controller: 'AppointmentCtrl'
   })

    .state('patientpastappointment', {
    cache: 'false',
    url: '/patientpastappointment',
    templateUrl: 'templates/patientpastappointment.html',
    controller: 'AppointmentCtrl'
   })

    .state('ScheduleTime', {
    cache: 'false',
    url: '/ScheduleTime',
    templateUrl: 'templates/ScheduleTime.html',
    controller: 'AppointmentCtrl'
   })

   

    .state('personaldoctors', {
    cache: 'false',
    url: '/personaldoctors',
    templateUrl: 'templates/PersonalDoctors.html',
    controller: 'DoctorsCtrl'
   })

   .state('ReminderCategory', {
    cache: 'false',
    url: '/ReminderCategory',
    templateUrl: 'templates/ReminderCategory.html',
    controller: 'ReminderCtrl'
   })

    .state('ShowReminders', {
    cache: 'false',
    url: '/ShowReminders',
    templateUrl: 'templates/ShowReminders.html',
    controller: 'ReminderCtrl'
   })

    .state('ratedoctor', {
    cache: 'false',
    url: '/ratedoctor',
    templateUrl: 'templates/ratedoctor.html',
    controller: 'RattingController'
   })
    
     .state('ratedoctorvideocall', {
    cache: 'false',
    url: '/ratedoctorvideocall',
    templateUrl: 'templates/ratedoctorvideocall.html',
    controller: 'VideoController'
   })
    

   .state('rattinglist', {
    cache: 'false',
    url: '/rattinglist',
    templateUrl: 'templates/rattinglist.html',
    controller: 'RattingController'
   })


   .state('doctors1', {
    cache: 'false',
    url: '/doctors1',
    templateUrl: 'templates/doctors1.html',
    controller: 'DoctorsCtrl'
   })

    .state('addappointment', {
    cache: 'false',
    url: '/addappointment',
    templateUrl: 'templates/AddNewAppointment.html',
    controller: 'AppointmentCtrl'
   })   


   
    .state('DoctorMedicationList', {
    cache: 'false',
    url: '/DoctorMedicationList',
    templateUrl: 'templates/DoctorMedicationList.html',
    controller: 'MedicationCtrl'
   })


   


  .state('app.editappointment', {
    url: '/editappointment',
    views: {
      'menuContent': {
        templateUrl: 'templates/EditAppointment.html',
        controller: 'AppointmentCtrl'
      }
    }
   })
  

    .state('app.personaldoctors1', {
    url: '/personaldoctors1',
    views: {
      'menuContent': {
        templateUrl: 'templates/personaldoctors1.html',
        controller: 'DoctorsCtrl'
      }
    }
   })

    .state('app.add_notes1', {
    url: '/add_notes1',
    views: {
      'menuContent': {
        templateUrl: 'templates/add_notes1.html',
        controller: 'NotesCtrl'
      }
    }
   })
  
  .state('showroute', {
   cache: 'false',
   url: '/showroute',
   templateUrl: 'templates/ShowRoute.html',
    controller: 'ShowRouteCtrl'
   })


  .state('app.DoctorMedication', {
    url: '/DoctorMedication',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorMedication.html',
        controller: 'MedicationCtrl'
      }
    }
   })

   .state('app.DoctorChats', {
    url: '/DoctorChats',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorChats.html',
        controller: 'DoctorsCtrl'
      }
    }
   })

   .state('app.Chats', {
    url: '/Chats',
    views: {
      'menuContent': {
        templateUrl: 'templates/Chats.html',
        controller: 'DoctorsCtrl'
      }
    }
   })

  .state('app.private_chatroom', {
    url: '/private_chatroom',
    views: {
      'menuContent': {
        templateUrl: 'templates/private_chatroom.html',
        controller: 'DoctorsCtrl'
      }
    }
   })


  

  .state('app.adddiscussion', {
    url: '/adddiscussion',
    views: {
      'menuContent': {
        templateUrl: 'templates/AddDiscussion.html',
        controller: 'ChatsCtrl'
      }
    }
   })

  .state('app.reply', {
    url: '/reply',
    views: {
      'menuContent': {
        templateUrl: 'templates/Reply.html',
        controller: 'ChatsCtrl'
      }
    }
   })

  

  


  .state('app.DoctorsHome', {
    url: '/DoctorsHome',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorsHome.html',
        controller: 'HomeCtrl'
      }
    }
   })

  .state('app.DoctorsProfile', {
    url: '/DoctorsProfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorsProfile.html',
        controller: 'ProfileCtrl'
      }
    }
   })

  .state('app.EditDoctorProfile', {
    url: '/EditDoctorProfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/EditDoctorProfile.html',
        controller: 'ProfileCtrl'
      }
    }
   })

  .state('app.DoctorsAppointment', {
    url: '/DoctorsAppointment',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorsAppointment.html',
        controller: 'AppointmentCtrl'
      }
    }
   })

  .state('app.DoctorsSchedule', {
    url: '/DoctorsSchedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/DoctorsSchedule.html',
        controller: 'ScheduleCtrl'
      }
    }
   })

  .state('Video', {
   cache: 'false',
   url: '/Video',
   templateUrl: 'templates/Video.html',
    controller: 'VideoController'
   })

 .state('video_call', {
   cache: 'false',
   url: '/video_call',
   templateUrl: 'templates/video_call.html',
    controller: 'VideoController'
   })

  .state('app.ScheduleTime', {
    url: '/ScheduleTime',
    views: {
      'menuContent': {
        templateUrl: 'templates/ScheduleTime.html',
        controller: 'ScheduleCtrl'
      }
    }
   });

  var session = localStorage.getItem("auth");
  var doc = localStorage.getItem("is_doctor");

  if(session == null){
   $urlRouterProvider.otherwise('FirstPage');
  }

  else if(session != null && doc == 0){
    $urlRouterProvider.otherwise('app/mainpage');
  }

  else{
    $urlRouterProvider.otherwise('app/DoctorsHome');
  }
  
 })


.constant('shopSettings',{
  payPalSandboxId :'AYoNyq755lkmNgxw3hdAmyAFqeydYXAzd6h8x0KjhwgnMLLwsy3kPqMUxfWafJOZW3cafsMxT_0EYUEX',

  payPalProductionId :'production id here',

  payPalEnv: 'PayPalEnvironmentSandbox', // for testing production for production

  payPalShopName : 'MyShopName',

  payPalMerchantPrivacyPolicyURL : 'url to policy',

  payPalMerchantUserAgreementURL : 'url to user agreement'
 })