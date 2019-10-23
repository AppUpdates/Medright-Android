angular.module('starter.controllers')
  
.controller('DoctorsCtrl', function($scope, $state,$ionicSideMenuDelegate,$http,$rootScope,$ionicLoading,
                  $ionicPlatform,GetMoreDoctorMedicalRecords, GetAllPersonalDoctors,GetAllDoctors,ProjectService,$ionicScrollDelegate,$location, $ionicHistory ,$filter,$cordovaEmailComposer){


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

$scope.gobacktonotes = function(){    
  $state.go('app.add_notes1');

}

$scope.goBackToNotes1 =function(){
  $state.go('detail_notes1');
}
 
$scope.GoToDetailNotes = function(id){
  localStorage.setItem("NoteId", id);
  $state.go('detail_notes1');
 }


$scope.goBackToNotes = function(){
  $state.go('MedicalRecord1');
 }

$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/doctors') {
    console.log("exit");
    $state.go('app.mainpage');    
  } else {
    $scope.GoBack();
  }
}, 100);

$scope.VideoChat = function(doc_id, name,IsAvailable,email){

      navigator.notification.confirm("Direct chat with doctor is not allowed. You may e-mail him/her or we can match you with available doctor for a video visit", function(buttonIndex) {
        switch(buttonIndex) {
          case 1:
            console.log("Video Visit");
            $state.go('video_time');
            break;
          case 2:
            $scope.openEmail(doc_id, email);
            
            break;
         }
        }, "", [ "Video Visit", "Email"]);
}


$scope.call = function(){
   navigator.contacts.create({"displayName": "Priyanka"});
  cordova.plugins.CordovaCall.sendCall('Priyanka',1);

  setTimeout(function(){
  cordova.plugins.CordovaCall.connectCall();
}, 5000)
}

$scope.openEmail = function(doc_id, email){
           var bodyText = "<h2>Write Text Here</h2>";

           cordova.plugins.email.isAvailable('gmail', function (hasAccount,  ) {
           cordova.plugins.email.open({
            to: email,
            body: bodyText
           })                  
           });
          
//            cordova.plugins.email.open({
//             to:          [email], // email addresses for TO field
//              // cc:          Array, // email addresses for CC field
//              // bcc:         Array, // email addresses for BCC field
//              // attachments: attachedfile, // file paths or base64 data streams
//              // subject:   "", // subject of the email
//             body:       bodyText, // email body (for HTML, set isHtml to true)
//             isHtml:    true, // indicats if the body is HTML or plain text
//         });
} 

$scope.TextChat = function(doc_id, name){  
  $scope.show();
   var uid = localStorage.getItem("UserIdKey");
   //alert(uid)
   //alert(doc_id)

    CCCometChat.initializeCometChat("", licenseKey, apiKey, true, function success(response) {
      
            var uid = localStorage.getItem("UserIdKey");
            uid = 'user'+uid;
            CCCometChat.loginWithUID(uid, function success(response) {
            
              var isFullScreen = true;
              var groupUserId = doc_id;
              var isGroup = false;
              var setBackButton = true;
              CCCometChat.launchCometChatWithID(isFullScreen,groupUserId,isGroup,setBackButton, 
                function success(data){ console.log(data);
                CCCometChat.getPlatform(currentplatform => {

                      if (currentplatform.platform == "iOS") {
                          data = JSON.stringify(data);
                      }
                      data = JSON.parse(data);
                        console.log("launch cometchat data : " + JSON.stringify(data));
                           FCMPlugin.subscribeToTopic("testingpushchannel");
                      if (data.hasOwnProperty("userInfoCallback")) {
                        console.log("push channel : " + data.userInfoCallback.push_channel);
                           FCMPlugin.subscribeToTopic("testingpushchannel");
                           FCMPlugin.subscribeToTopic(data.userInfoCallback.push_channel);
                      } else if (data.hasOwnProperty('chatroomInfoCallback')) {
                          FCMPlugin.subscribeToTopic(data.userInfoCallback.push_channel);
                      }

                  });
                  $scope.hide(); },
                function error(data){ console.log(data); $scope.hide(); });
          }, function failure(error) {
               $scope.hide();
          });
       
     
    }, function failure(error) {
        $scope.hide();
    });
} 

$scope.GoToDoctorProfile = function(doc_id){
  localStorage.setItem("DoctoreId1",doc_id);
  $state.go('DoctoreProfile');
}

$scope.$on('$ionicView.enter', function () {
 var path = $location.path();
if (path == '/app/doctors') {
 $scope.loadDoctors();
}  });

$scope.loadDoctors = function(){     
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetAllDoctors.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          CityName:localStorage.getItem('CityNameKey')
         }
      }).success(function(DoctorsList){
        console.log(DoctorsList)
        $scope.DoctorsList = DoctorsList;
        $scope.hide();
        $scope.contacts = [];
        for(var i=0;i<$scope.DoctorsList.length;i++){          
          if($scope.DoctorsList[i].IsAvailable == '1'){
            $scope.contacts.push({'userId':$scope.DoctorsList[i].name,'displayName':$scope.DoctorsList[i].name+' '+$scope.DoctorsList[i].lname})

          }
        }
        console.log($scope.contacts);
        if($scope.contacts == ''){
          $scope.ShowFilter = false;
        }else{
          $scope.ShowFilter = true;
        }        
      });
 
      $scope.FilterByList = [{'Fid':1,'Fname':'Offices'},
                             {'Fid':2,'Fname':'Specialty'}];
    };

$scope.PageNumber=1;
$scope.LoadAllDoctors = function(page){    
    $scope.PageNumber = page+1; 
    GetAllDoctors.GetProjects($scope.PageNumber,localStorage.getItem('CityNameKey')).then(function(DoctorsList) {
    $scope.DoctorsList = $scope.DoctorsList.concat(DoctorsList);
    console.log($scope.DoctorsList);
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
    });
} 

$scope.GoToDoctorProfile = function(doc_id){
  localStorage.setItem("SeeDoctorId",doc_id);
  $state.go('ViewDoctorProfile');

}

$scope.loadDoctorProfile = function(){
    $scope.show();    
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetToViewDoctorProfile.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
               Doc_Id:localStorage.getItem('SeeDoctorId')
         }
          }).success(function(data){
            console.log(data)
            console.log(data[0].dob);
            $scope.Doctor1 = data;
            var n = $filter('date')(new Date(data[0].dob),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            console.log($scope.Day )
            var MonthYear = $filter('date')(new Date(data[0].dob),'MMMM, yyyy');
            $scope.Bday = $scope.Day + ' ' + MonthYear;
            $scope.hide();
          });
}

$scope.GoToAddPersonalDoctors = function(){
      $state.go('app.doctors');
    };

$scope.goToRoute = function(add){
      localStorage.setItem("DocAddressKey",add);
      $state.go('showroute');
    };
  
$scope.spec = true;
$scope.filterChanged = function(FilterId){
      console.log(FilterId);$scope.SortByList=[];
      if(angular.isUndefined(FilterId) || FilterId == ""){

      }
      else{
        if(FilterId == 1){
          $scope.SortByList = [{'Sid':1,'speciality':'Acsending'},
            {'Sid':2,'speciality':'Descending'}];
          $scope.off = true;
          $scope.spec = false;
        }
        else{
          $scope.off = false;
          $scope.spec = true;
          $scope.show();    
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetSpeciality.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          }).success(function(data){
            console.log(data);
            $scope.SortByList = data;
            $scope.hide();
          });
        }
      }
    };

$scope.applySort = function(applySort){
      if(angular.isUndefined(applySort) || applySort == ""){
        $rootScope.orderCri = "";
      }
      else{
        if(applySort == "Acsending"){
          $rootScope.orderCri = 'off_address';
        }
        else{
          $rootScope.orderCri = '-off_address';        
        }
      }
    };

$scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };


$scope.getPersonalDocs = function(){
  video_time_counter = false;
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetPersonalDoctorList.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          UserId:localStorage.getItem('UserIdKey')
        }
      }).success(function(PersonalDocList){
        console.log(PersonalDocList);
        $scope.PersonalDocList = PersonalDocList;        
        $scope.hide();
        if(PersonalDocList == ''){
          $scope.ShowFilter = false;
          $scope.ShowData1 = false;
          $scope.NoData1 = true;
        }
        else{
          $scope.ShowFilter = true;
          $scope.ShowData1 = true;
          $scope.NoData1 = false;
        }
      });

      $scope.FilterByList = [{'Fid':1,'Fname':'Offices'},
                             {'Fid':2,'Fname':'Specialty'}];
    };

$scope.PageNumber=1;
$scope.LoadAllPersonalDoctors = function(page){    
    $scope.PageNumber = page+1; 
    GetAllPersonalDoctors.GetProjects($scope.PageNumber,localStorage.getItem('UserIdKey')).then(function(PersonalDocList) {
    $scope.PersonalDocList = $scope.PersonalDocList.concat(PersonalDocList);
    console.log($scope.PersonalDocList)
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
    });
    
}

$scope.addPersonal = function(docId){ 
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/SetPersonalDoc.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_DocId:docId,
          Angular_UserId:localStorage.getItem('UserIdKey'),
        }
      }).success(function(data){
        console.log(data)
        if(data != ""){
          $scope.hide();
          $scope.showToast('Personal doctor added successfully.');
        }
        else{
          $scope.showToast('Try again!');
        }
      });
    };

$scope.sendEmail = function(EmailDoctorId,EmailMsg){
      console.log(EmailDoctorId,EmailMsg);
      if(angular.isUndefined(EmailDoctorId) || EmailDoctorId == ""){
        $scope.showToast("Please select doctor..");  
      }
      else if(angular.isUndefined(EmailMsg) || EmailMsg == ""){
        $scope.showToast("Please enter message..");   
      }
      else{ 
        cordova.plugins.email.isAvailable('gmail', function (hasAccount,  ) {
          cordova.plugins.email.open({
            to: EmailDoctorId,
            body: EmailMsg
          })                  
        });
        $state.go('app.mainpage');
      }
    };

$scope.goHome = function(){
      $state.go('app.mainpage');
    }
    
$scope.openChats = function(){
//applozic code was here
  };

$scope.GetDoctorNotesType = function(){
      $scope.show($ionicLoading);
          $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetNotesType.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
        }).success(function(data){
          $scope.hide($ionicLoading);
          $scope.selectedType = data[0];
          $scope.Type = data;  
          localStorage.setItem("TypeId",$scope.selectedType.type_id);
          $scope.GetDoctorMedicalRecords();  
      })     
    }

  $scope.GetDoctorMedicalRecords = function(){
    $http({
    method:'post',
    url:'http://68.183.101.193/android/338/GetDoctorMedicalRecords.php',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:{
      Angular_UserId:localStorage.getItem('UserIdKey'),
      Angular_Type : localStorage.getItem('TypeId')
    }
      }).success(function(DoctorTestResult){
        console.log(DoctorTestResult)
        $scope.hide($ionicLoading);

        if(DoctorTestResult == ''){
        $scope.NoData = true;
        $scope.WithData = false;
      }
      else{
        $scope.NoData = false;
        $scope.WithData = true;
        $scope.DoctorTestResult = [];
        for(var i=0;i<DoctorTestResult.length;i++){            
           var n = $filter('date')(new Date(DoctorTestResult[i].CreatedDate),'dd');
           $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
           var MonthYear = $filter('date')(new Date(DoctorTestResult[i].CreatedDate),'MMMM, yyyy');
           $scope.date = $scope.Day + ' ' + MonthYear;
           $scope.DoctorTestResult.push({
                CreatedDate1 :$scope.date,
                CreatedDate :DoctorTestResult[i].CreatedDate,
                CreatedTime :DoctorTestResult[i].CreatedTime,
                Deleted :DoctorTestResult[i].Deleted,
                FirstName :DoctorTestResult[i].FirstName,
                Id :DoctorTestResult[i].Id,
                LastName :DoctorTestResult[i].LastName,
                Notes :DoctorTestResult[i].Notes,
                PatientId :DoctorTestResult[i].PatientId,
                TestName :DoctorTestResult[i].TestName,
                Type :DoctorTestResult[i].Type,
                UserId :DoctorTestResult[i].UserId,
                profile :DoctorTestResult[i].profile,
                visit_type :DoctorTestResult[i].visit_type,
              });
          }
      }
})
}

$scope.GetTypeId = function(selectedType){
    $scope.TypeId = selectedType.type_id;
    localStorage.setItem("TypeId",$scope.TypeId);
    $scope.PageNumber=1;  
    $scope.GetDoctorMedicalRecords(); 
  }


$scope.PageNumber=1;
$scope.LoadMoreDoctorMedicalRecords = function(page){
    $scope.PageNumber = page+1;
    GetMoreDoctorMedicalRecords.GetProjects($scope.PageNumber,localStorage.getItem('TypeId'),localStorage.getItem('UserIdKey')).then(function(DoctorTestResult) {
   
    $scope.DoctorTestResult1 = [];
    for(var i=0;i<DoctorTestResult.length;i++){            
           var n = $filter('date')(new Date(DoctorTestResult[i].CreatedDate),'dd');
           $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
           var MonthYear = $filter('date')(new Date(DoctorTestResult[i].CreatedDate),'MMMM, yyyy');
           $scope.date = $scope.Day + ' ' + MonthYear;
           $scope.DoctorTestResult1.push({
                CreatedDate1 :$scope.date,
                CreatedDate :DoctorTestResult[i].CreatedDate,
                CreatedTime :DoctorTestResult[i].CreatedTime,
                Deleted :DoctorTestResult[i].Deleted,
                FirstName :DoctorTestResult[i].FirstName,
                Id :DoctorTestResult[i].Id,
                LastName :DoctorTestResult[i].LastName,
                Notes :DoctorTestResult[i].Notes,
                PatientId :DoctorTestResult[i].PatientId,
                TestName :DoctorTestResult[i].TestName,
                Type :DoctorTestResult[i].Type,
                UserId :DoctorTestResult[i].UserId,
                profile :DoctorTestResult[i].profile,
                visit_type :DoctorTestResult[i].visit_type
              });
          }
    $scope.DoctorTestResult = $scope.DoctorTestResult.concat($scope.DoctorTestResult1);
    console.log($scope.DoctorTestResult)
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
    });
  };

$scope.GetDetailNotes = function(){
    $scope.doctorname = localStorage.getItem("FullName");
    $scope.ShowNameMRN = false;
    $scope.show($ionicLoading);
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetDoctorDetailNotes.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_NoteId:localStorage.getItem('NoteId')
          }
        }).success(function(data){
          console.log(data)
         
          if(data[0].Type == "1"){
          $rootScope.MedicalRecords = "Clinical Notes";
        }else{
          $rootScope.MedicalRecords = "Lab Results";
        }
          $scope.hide($ionicLoading);
          $scope.ShowNameMRN = false;
          $scope.DetailNotes = data; 
          var n = $filter('date')(new Date(data[0].CreatedDate),'dd');
          $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');      
          var MonthYear = $filter('date')(new Date(data[0].CreatedDate),'MMMM, yyyy');
          $scope.date = $scope.Day + ' ' + MonthYear;
      })
  } 

$scope.Print = function(MedicalRecords,FirstName,LastName,visit_type,TestName,doctorname,CreatedDate,Notes){

var page1 = '<html><body background="img1/icon1.png" style="background-size: cover;"><center><h1>'+ MedicalRecords +'</h1></center><h2>Patient</h2><p style="font-size: 25px;">'+ FirstName + LastName +'</p><h2>Visit Type</h2><p style="font-size: 25px;">'+ visit_type +'</p><h2>Notes</h2><p style="font-size: 25px;">'+ Notes +'</p><h2>Date</h2><p style="font-size: 25px;">'+ CreatedDate  +'</p><h2>Physician</h2><p style="font-size: 25px;">'+ doctorname +'</p></body></html>';
var page2 = '<html><body background="img1/icon1.png" style="background-size: cover;"><center><h1>'+ MedicalRecords +'</h1></center><h2>Patient</h2><p style="font-size: 25px;">'+ FirstName + LastName +'</p><h2>Test</h2><p style="font-size: 25px;">'+ TestName +'</p><h2>Notes</h2><p style="font-size: 25px;">'+ Notes +'</p><h2>Date</h2><p style="font-size: 25px;">'+ CreatedDate  +'</p><h2>Ordered By</h2><p style="font-size: 25px;">'+ doctorname +'</p></body></html>';

if(TestName == ''){
  cordova.plugins.printer.print(page1 , { duplex: 'long' }, function (res)  {   
});
}

if(visit_type == ''){ 
  cordova.plugins.printer.print(page2 , { duplex: 'long' }, function (res)  {
});
}
}

$scope.AddAddendum = function(FirstName,MedicalRecords,visit_type,TestName,Notes,TypeId,PatientId){
     $state.go('addendum');
     $rootScope.visittype1 = visit_type;
     $rootScope.testname1 = TestName;
     $rootScope.notes1 = Notes;
     $rootScope.patientname = FirstName;
     $rootScope.typename = MedicalRecords;
     $rootScope.TypeId = TypeId;
     $rootScope.PatientId = PatientId;

     if(MedicalRecords == 'Clinical Notes'){
      $rootScope.showvisittype=true;
      $rootScope.showtestname=false;
     }
     if(MedicalRecords == 'Lab Results'){
      $rootScope.showvisittype=false;
      $rootScope.showtestname=true;
     }

}

$scope.SaveNotes = function(patientname,typename,visittype1,testname1,notes1,TypeId,PatientId){

  if(visittype1 == undefined && typename == "Clinical Notes"){
   window.plugins.toast.show('Please enter visit type', 'short', 'center') ; 
  }
  else if(testname1 == undefined && typename == "Lab Results"){
   window.plugins.toast.show('Please enter test name', 'short', 'center') ; 
  }
  else if(notes1 == undefined){
    window.plugins.toast.show('Please enter notes', 'short', 'center') ;
  }
  else{
    var CreatedDate = $filter('date')(new Date(),'MMMM dd, yyyy');
    var CreatedTime = $filter('date')(new Date(),'hh:mm a');
    $scope.show($ionicLoading);
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/SaveNote.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_UserId:localStorage.getItem('UserIdKey'),
            Angular_patientId: PatientId,
            Angular_TestName: testname1,
            Angular_Notes: notes1,
            Angular_CreatedDate:CreatedDate,
            Angular_CreatedTime: CreatedTime,
            Angular_Types : TypeId,
            Angular_VisitType : visittype1
          }
        }).success(function(data){
          $scope.hide($ionicLoading);
          testname1 = '';
          notes1 = '';
          $state.go('MedicalRecord1');
          window.plugins.toast.show('Notes sent to patient!', 'short', 'center') ;

      })    
  }
}

$scope.GetDoctorInfo = function(){
    $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetDoctorProfile.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:localStorage.getItem("DoctoreId1")
        }
      }).success(function(Doctordata){
        console.log(Doctordata);
        $scope.hide($ionicLoading);
        $scope.profile = Doctordata[0].profile;
        $scope.name = Doctordata[0].name;
        $scope.lname = Doctordata[0].lname;
        $scope.email = Doctordata[0].email;
        $scope.speciality = Doctordata[0].speciality;
        $scope.contact = Doctordata[0].contact;
      })
}

$scope.GoToReview = function(){
  $state.go('ratedoctor');
}

$scope.GetReviews = function(){ 
  $scope.show($ionicLoading);
  $http({
      method: "post",
      url:'http://68.183.101.193/android/338/GetDoctorReviews.php',      
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       data:{
          Angular_DocId:localStorage.getItem("DoctoreId1")
        }
  }).success(function (Review) {
    $scope.Review = Review;
     console.log(Review);
      if(Review ==''){
              $scope.NoData = true;  
              $scope.hide($ionicLoading);           
          }
          else{ 
               $scope.Review = [];
               $scope.ShowData=true;
               $scope.NoData = false;                 
               $scope.hide($ionicLoading);
               for(var i=0;i<Review.length;i++){ 
               $scope.Review.push({
                          review:Review[i].review,
                          profile: Review[i].profile,
                          FirstName:Review[i].FirstName,
                          LastName:Review[i].LastName,
                          total:Review[i].total
                });                                 
       } 
       $scope.Review = Review;
     }
  })
}

$scope.PageNumber=1;
$scope.LoadMoreReviews = function(page){
    $scope.PageNumber = page+1;
    ProjectService.GetProjects($scope.PageNumber,localStorage.getItem("DoctoreId1")).then(function(Review) {
    $scope.Review = $scope.Review.concat(Review);
    console.log($scope.Review);
    $scope.$broadcast('scroll.infiniteScrollComplete');

    });
  };

//patient side chat start

$scope.OpenChatRoom = function(id, f_name, l_name){
  localStorage.setItem("ChatId",id);
  $rootScope.u_name = f_name+' '+l_name;
  $state.go('app.private_chatroom');
}

  if(localStorage.getItem("is_doctor") == 1){
  $scope.SenderId = "doc"+localStorage.getItem("UserIdKey");
  $scope.ReceiverId = "pat"+localStorage.getItem("ChatId");
  }

  if(localStorage.getItem("is_doctor") == 0){
  $scope.SenderId = "pat"+localStorage.getItem("UserIdKey");
  $scope.ReceiverId = "doc"+localStorage.getItem("ChatId");
  }

 
 console.log($scope.SenderId)
 console.log($scope.ReceiverId)

$rootScope.Messages = [];

$scope.SaveMessages = function(message){
  // console.log(!message.replace(/\s/g, '').length)
  if(message == undefined){
     window.plugins.toast.show('Message cannot be empty!', 'short', 'center');
  } else if(!message.replace(/\s/g, '').length == true){
    window.plugins.toast.show('Message cannot be contains only whitespace!', 'short', 'center');
  }

  else{ 
  if(localStorage.getItem("is_doctor") == 0){
  var name  = localStorage.getItem("FirstNameKey") + localStorage.getItem("LastNameKey");
  var SenderId = "pat"+localStorage.getItem("UserIdKey");
  var ReceiverId = "doc"+localStorage.getItem("ChatId");
  var is_doctor = "false";
  }
  if(localStorage.getItem("is_doctor") == 1){
  var name  = localStorage.getItem("FullName");
  var SenderId = "doc"+localStorage.getItem("UserIdKey");
  var ReceiverId = "pat"+localStorage.getItem("ChatId");
  var is_doctor = "true";
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
                          receiver_id: ReceiverId,
                          sender_id: SenderId
                          }
                 );
   $ionicScrollDelegate.scrollBottom();
            
            var c_msg = message;
            this.message = '';  
            
             $http({
              method: "post",
              url: "http://68.183.101.193/android/338/SaveMessage.php",
              data: {
                        Angular_SenderId: SenderId,
                        Angular_ReceiverId: ReceiverId,
                        Angular_UserName: name,
                        Angular_RoomId: RoomId,
                        Angular_MyRoomId: MyRoomId,
                        Angular_MessageContent: c_msg,
                        Angular_MessageDate: MessageDate,
                        Angular_MessageTime: MessageTime,
                        is_doctor : is_doctor
                      },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data) {
             console.log(data);
          }) 
}
}

$scope.GetMessages = function(){
var RoomId = localStorage.getItem("ChatId")+localStorage.getItem("UserIdKey");
var MyRoomId = localStorage.getItem("UserIdKey")+localStorage.getItem("ChatId");
  
             $http({
              method: "post",
              url: "http://68.183.101.193/android/338/GetMessages.php",
              data: {
                        Angular_RoomId: RoomId,
                        Angular_MyRoomId: MyRoomId
                    },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (Messages) {
                  console.log(Messages);
               for(var i = 0; i < Messages.length; i++) {
                      $rootScope.Messages.push(
                         {
                          message_date: Messages[i].message_date,
                          message_time: Messages[i].message_time,
                          message_content: Messages[i].content,
                          receiver_id: Messages[i].receiver_id,
                          sender_id: Messages[i].sender_id
                          }
                      );
                         }
                         $scope.hide($ionicLoading);   
                         $ionicScrollDelegate.scrollBottom();
          })
}

//patient side chat ends

//doctor side chat start


$scope.loadPatients = function(){
  $scope.show($ionicLoading);
  $http({
              method: "post",
              url: "http://68.183.101.193/android/338/GetChatPatientList.php",
              data: {
                        Angular_DoctorId: localStorage.getItem("UserIdKey")
                    },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (PatientList) {
                  console.log(PatientList);
                  $scope.PatientList = PatientList;
                  $scope.hide($ionicLoading);   
                        
          })
}
//doctor side chat ends

});
