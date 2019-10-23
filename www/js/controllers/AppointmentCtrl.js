angular.module('starter.controllers')

.controller('AppointmentCtrl', function($cordovaLocalNotification,$scope, ionicToast,$state,DoctorService,GetPatientPastAppointment,GetAppointment,GetDoctors,GetPersonalDoctors, $ionicPlatform, $ionicHistory, $location,  $rootScope, $ionicSideMenuDelegate,$http,
       $ionicLoading,$filter,$ionicPopover){

$ionicPlatform.registerBackButtonAction(function (event) {
var path = $location.path();
  if (path == '/app/DoctorsAppointment') {
    console.log("exit");
    $state.go('app.DoctorsHome');    
  } else {
    $scope.GoBack();
  }
}, 100);

$scope.DoctorsList = [];

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

$scope.DoctorsList = function(){
      $state.go('addappointment');
}

$scope.openPopover = function($event,AppointmentId,sch_id) {
  localStorage.setItem("AppointmentId",AppointmentId);
  localStorage.setItem("sch_id",sch_id);
  $scope.popover1.show($event);
};

$ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover1 = popover;
});

$scope.closePopover1 = function() {
  $scope.popover1.hide();
};

$scope.openPopover1 = function($event,DoctorId) {
  localStorage.setItem("DoctoreId1",DoctorId);
  $scope.popover.show($event);
};

$ionicPopover.fromTemplateUrl('templates/popover1.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
});


$scope.closePopover = function() {
    $scope.popover.hide();
};
 
$scope.GoToDoctorProfile = function(){
    $scope.closePopover();
    $state.go('DoctoreProfile');
}

$scope.GoBacktoappointment = function(){
    $state.go('addappointment');
}

$scope.goBackToMainPAge = function(){
    $state.go('app.mainpage');
}
    
$scope.OpenVisit = function(){
    $state.go('visit_type');
}

$scope.GoBack=function(){
    $ionicHistory.goBack();
};

$scope.callPatient = function(number){

  window.plugins.CallNumber.callNumber(onSuccess, onError, number, false);

function onSuccess(result){
  console.log("Success:"+result);
}
 
function onError(result) {
  console.log("Error:"+result);
}
}

$scope.toggleGroup = function (group) {
    if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      }
    else{
        $scope.shownGroup = group;
      }
};

$scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
};

$scope.has_more_UpcomingAppointment = true;
$scope.getAppointment = function(){
    $scope.show();
    $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetAppointment.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey"))
        }
    }).success(function(AppointmentList){
        console.log(AppointmentList);
        $scope.hide();

        if(AppointmentList == ''){
          $scope.NoData = true;
          $scope.WithData = false;
        }

        else{
          $scope.WithData = true;
          $scope.NoData = false;
          $scope.AppointmentList = AppointmentList;
          $scope.AppointmentList = [];
          for(var i=0;i<AppointmentList.length;i++){   
          // console.log(new Date(AppointmentList[i].AppointmentTime))         
           var n = $filter('date')(AppointmentList[i].AppointmentTime,'d');
           console.log(n)
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            

            $scope.AppointmentList.push({
                AppointmentDate :AppointmentList[i].AppointmentDate,
                AppointmentId :AppointmentList[i].AppointmentId,
                AppointmentStatus :AppointmentList[i].AppointmentStatus,
                AppointmentTime :AppointmentList[i].AppointmentTime,
                DateDay :$scope.Day,
                CreatedBy :AppointmentList[i].CreatedBy,
                Deleted :AppointmentList[i].Deleted,
                CreatedOn :AppointmentList[i].CreatedOn,
                DoctorId :AppointmentList[i].DoctorId,
                Message :AppointmentList[i].Message,
                ModifyBy :AppointmentList[i].ModifyBy,
                ModifyOn :AppointmentList[i].ModifyOn,
                UserId :AppointmentList[i].UserId,
                alert :AppointmentList[i].alert,
                appDone :AppointmentList[i].appDone,
                availability_type :AppointmentList[i].availability_type,
                contactalert :AppointmentList[i].contactalert,
                doc_id :AppointmentList[i].doc_id,
                name :AppointmentList[i].name,    
                profile :AppointmentList[i].profile,
                sch_id :AppointmentList[i].sch_id,
                type :AppointmentList[i].type       
              });
          }
        }
       
      });
  };


$scope.PageNumber=1;
$scope.LoadMoreAppointment = function(page){    
    $scope.PageNumber = page+1;
    GetAppointment.GetProjects($scope.PageNumber, Number(localStorage.getItem("UserIdKey"))).then(function(AppointmentList) {
     if (AppointmentList.length == 0) {
              // $scope.has_more_UpcomingAppointment = false;
              // $scope.ShowSpinner = false;
              // ionicToast.show('No more appointments found!', 'bottom', false, 1700);
      }          
  else{ 
    $scope.ShowSpinner = true;
    $scope.AppointmentList1 = [];
    for(var i=0;i<AppointmentList.length;i++){            
           var n = $filter('date')(new Date(AppointmentList[i].AppointmentTime),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            

            $scope.AppointmentList1.push({
               AppointmentDate :AppointmentList[i].AppointmentDate,
                AppointmentId :AppointmentList[i].AppointmentId,
                AppointmentStatus :AppointmentList[i].AppointmentStatus,
                AppointmentTime :AppointmentList[i].AppointmentTime,
                DateDay :$scope.Day,
                CreatedBy :AppointmentList[i].CreatedBy,
                Deleted :AppointmentList[i].Deleted,
                CreatedOn :AppointmentList[i].CreatedOn,
                DoctorId :AppointmentList[i].DoctorId,
                Message :AppointmentList[i].Message,
                ModifyBy :AppointmentList[i].ModifyBy,
                ModifyOn :AppointmentList[i].ModifyOn,
                UserId :AppointmentList[i].UserId,
                alert :AppointmentList[i].alert,
                appDone :AppointmentList[i].appDone,
                availability_type :AppointmentList[i].availability_type,
                contactalert :AppointmentList[i].contactalert,
                doc_id :AppointmentList[i].doc_id,
                name :AppointmentList[i].name,    
                profile :AppointmentList[i].profile,
                sch_id :AppointmentList[i].sch_id,
                type :AppointmentList[i].type           
              });
          }

    $scope.AppointmentList = $scope.AppointmentList.concat($scope.AppointmentList1);
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
  }
  });
  };

$scope.GoToPatientPastAppointment = function(){
  $state.go('patientpastappointment');
}

$scope.has_more_HistoryAppointment = true;
$scope.getPatientPastAppointment = function(){
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetPatientPastAppointment.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey"))
        }
      }).success(function(PastAppointmentList){
        console.log(PastAppointmentList);
        $scope.hide();
        if(PastAppointmentList == ''){
          $scope.NoData = true;
          $scope.WithData = false;
        }
        else{
          $scope.WithData = true;
          $scope.NoData = false;
          // $scope.PastAppointmentList = PastAppointmentList;
          $scope.PastAppointmentList = [];
          for(var i=0;i<PastAppointmentList.length;i++){            
           var n = $filter('date')(new Date(PastAppointmentList[i].AppointmentTime),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            

            $scope.PastAppointmentList.push({
                AppointmentDate :PastAppointmentList[i].AppointmentDate,
                AppointmentId :PastAppointmentList[i].AppointmentId,
                AppointmentStatus :PastAppointmentList[i].AppointmentStatus,
                AppointmentTime :PastAppointmentList[i].AppointmentTime,
                DateDay :$scope.Day,
                CreatedBy :PastAppointmentList[i].CreatedBy,
                Deleted :PastAppointmentList[i].Deleted,
                CreatedOn :PastAppointmentList[i].CreatedOn,
                DoctorId :PastAppointmentList[i].DoctorId,
                Message :PastAppointmentList[i].Message,
                ModifyBy :PastAppointmentList[i].ModifyBy,
                ModifyOn :PastAppointmentList[i].ModifyOn,
                UserId :PastAppointmentList[i].UserId,
                alert :PastAppointmentList[i].alert,
                appDone :PastAppointmentList[i].appDone,
                availability_type :PastAppointmentList[i].availability_type,
                contactalert :PastAppointmentList[i].contactalert,
                doc_id :PastAppointmentList[i].doc_id,
                name :PastAppointmentList[i].name,    
                profile :PastAppointmentList[i].profile,
                sch_id :PastAppointmentList[i].sch_id,
                type :PastAppointmentList[i].type           
              });
          }
        }       
      });
    };

$scope.PageNumber=1;
$scope.LoadMorePastAppointment = function(page){    
    $scope.PageNumber = page+1;
    GetPatientPastAppointment.GetProjects($scope.PageNumber, Number(localStorage.getItem("UserIdKey"))).then(function(PastAppointmentList) {
     if (PastAppointmentList.length == 0) {
              // $scope.has_more_HistoryAppointment = false;
              // $scope.ShowSpinner = false;
              // ionicToast.show('No more appointments found!', 'bottom', false, 1700);
      }          
  else{ 
    $scope.ShowSpinner = true;
    $scope.PastAppointmentList1 = [];
    for(var i=0;i<PastAppointmentList.length;i++){            
           var n = $filter('date')(new Date(PastAppointmentList[i].AppointmentTime),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            

            $scope.PastAppointmentList1.push({
                AppointmentDate :PastAppointmentList[i].AppointmentDate,
                AppointmentId :PastAppointmentList[i].AppointmentId,
                AppointmentStatus :PastAppointmentList[i].AppointmentStatus,
                AppointmentTime :PastAppointmentList[i].AppointmentTime,
                DateDay :$scope.Day,
                CreatedBy :PastAppointmentList[i].CreatedBy,
                Deleted :PastAppointmentList[i].Deleted,
                CreatedOn :PastAppointmentList[i].CreatedOn,
                DoctorId :PastAppointmentList[i].DoctorId,
                Message :PastAppointmentList[i].Message,
                ModifyBy :PastAppointmentList[i].ModifyBy,
                ModifyOn :PastAppointmentList[i].ModifyOn,
                UserId :PastAppointmentList[i].UserId,
                alert :PastAppointmentList[i].alert,
                appDone :PastAppointmentList[i].appDone,
                availability_type :PastAppointmentList[i].availability_type,
                contactalert :PastAppointmentList[i].contactalert,
                doc_id :PastAppointmentList[i].doc_id,
                name :PastAppointmentList[i].name,    
                profile :PastAppointmentList[i].profile,
                sch_id :PastAppointmentList[i].sch_id,
                type :PastAppointmentList[i].type           
              });
          }

    console.log( $scope.PastAppointmentList1)
    $scope.PastAppointmentList = $scope.PastAppointmentList.concat($scope.PastAppointmentList1);
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
  }
  });
  };

$scope.loadDocupcomingApp = function(){
      var CurrentDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
      var CurrentTime = $filter('date')(new Date(), 'hh:mm a');
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetDocAppointment.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey")),
          Angular_CurrentDate : CurrentDate,
          Angular_CurrentTime : CurrentTime
        }
      }).success(function(data){
        console.log(data);
        $scope.hide();
        if(data == ''){
         $scope.NoData1 = false;
         $scope.ShowAppointmentList1 = false;
        localStorage.setItem("value",0);
        }
        else{
         $scope.NoData1 = false;
         $scope.ShowAppointmentList1 = false;
         localStorage.setItem("value",1);
         $scope.DocAppList = data;
        }
        $scope.loadDocpastApp();       
      });
    }

$scope.ShowAppointmentList = function(){      
      $scope.HideList  = true;
      $scope.ShowList = true;
      if(localStorage.getItem("value") == 0){
        $scope.NoData1 = true;
      }
      if(localStorage.getItem("value") == 1){
        $scope.ShowAppointmentList1 = true;
      }
    }
    
$scope.HideAppointmentList = function(){
      $scope.ShowAppointmentList1 = false;
      $scope.HideList  = false;
      $scope.ShowList = false;
      $scope.NoData1 = false;
      $scope.ShowAppointmentList1 = false;      
}

$scope.loadDocpastApp = function(){
      var CurrentDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
      var CurrentTime = $filter('date')(new Date(), 'hh:mm a');
       
      $scope.show();
       $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetPastAppointments.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey")),
          Angular_CurrentDate : CurrentDate,
          Angular_CurrentTime : CurrentTime
        }
      }).success(function(data){
        console.log(data);
        $scope.hide();
        if(data == ''){
         $scope.NoData2 = false;
         $scope.ShowPastAppointmentList1 = false;
         localStorage.setItem("value1" ,0);
        }
        else{
         $scope.NoData = false;
         $scope.ShowPastAppointmentList1 = false;
         $scope.DocPastAppList = data;
         localStorage.setItem("value1" ,1);
        }       
      });
    }

$scope.ShowPastAppointmentList = function(){
      $scope.HidePastList  = true;
      $scope.ShowPastList = true;
      if(localStorage.getItem("value1") == 0){
        $scope.NoData2 = true;
      }
      if(localStorage.getItem("value1") == 1){
        $scope.ShowPastAppointmentList1 = true;
      }
    }

$scope.HidePastAppointmentList = function(){
      $scope.ShowPastAppointmentList1 = false;
      $scope.NoData2  = false;
      $scope.HidePastList  = false;
      $scope.ShowPastList = false;
    }

$scope.GoToDetailAppointment =function(time,date,fname,lname,type,Email,UserId,DoctorId){
      $state.go('AppointmentDetail');
      localStorage.setItem("AppointmentPatientName" ,fname+ ' ' +lname);
      localStorage.setItem("AppointmentPatientTime" , time);
      localStorage.setItem("AppointmentPatientDate" , date);
      localStorage.setItem("AppointmentPatientType" , type);
      localStorage.setItem("AppointmentPatientEmail" , Email);
      localStorage.setItem("UserId11" , UserId);
      localStorage.setItem("DoctorId11" , DoctorId);
   }

$scope.GoToPastDetailAppointment  = function(time,date,fname,lname,type,Email,UserId,DoctorId){
      $state.go('AppointmentDetail');
      localStorage.setItem("AppointmentPatientName" , fname+ ' ' +lname);
      localStorage.setItem("AppointmentPatientTime" , time);
      localStorage.setItem("AppointmentPatientDate" , date);
      localStorage.setItem("AppointmentPatientType" , type);
      localStorage.setItem("AppointmentPatientEmail" , Email);
      localStorage.setItem("UserId11" , UserId);
      localStorage.setItem("DoctorId11" , DoctorId);
   }

$scope.GetAppointmentDetail = function(time,date,fname,lname,type){
      $scope.Name = localStorage.getItem("AppointmentPatientName");
      $scope.Time = localStorage.getItem("AppointmentPatientTime");
      $scope.Date = localStorage.getItem("AppointmentPatientDate");
      $scope.Type = localStorage.getItem("AppointmentPatientType");
      $scope.Email = localStorage.getItem("AppointmentPatientEmail");

      $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetAppointmentStatus.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:localStorage.getItem("UserId11"),
              Angular_DoctorId:localStorage.getItem("DoctorId11"),
              Angular_Time : localStorage.getItem("AppointmentPatientDate")              
            }
          }).success(function(data){
            console.log(data)
             $scope.status = {
             name: data[0].AppointmentStatus
      };           
      $scope.ShowPromtOfPatientFreeAppointment();
       });
    }

$scope.ShowPromtOfPatientFreeAppointment = function(){

      $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetAppointmentFreeCount.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:localStorage.getItem("UserId11"),          
            }
          }).success(function(data){
            console.log(data);
        if(data[0].count == 0){
              $scope.ShowMessage = true;
              $scope.message1 = localStorage.getItem("AppointmentPatientName") + ' ' +' has free face to face visit';
            }      
            else{
               $scope.ShowMessage = true;
              $scope.message1 = localStorage.getItem("AppointmentPatientName") + ' ' +' has utilized free face to face visit';
            }
       });
}

$scope.CloseMessage = function(){
  $scope.ShowMessage = false;;
}


$scope.ViewPatientHelathHistory = function(){
  $state.go('PatientHealthHistory');
}

$scope.SaveAppointmentStatus = function(){              
  $scope.show();
      if (document.getElementById('f-option').checked) {
       rate_value = 'Complete';      
      }else if(document.getElementById('s-option').checked){
       rate_value = 'Not Complete';
      }else if(document.getElementById('t-option').checked){
       rate_value = 'followup';       
      }  
   
      $http({
            method:"post",
            url:'http://68.183.101.193/android/338/SaveAppointmentStatus.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:localStorage.getItem("UserId11"),
              Angular_DoctorId:localStorage.getItem("DoctorId11"),
              Angular_Time : localStorage.getItem("AppointmentPatientDate"),
              status : rate_value
            }
          }).success(function(data){
             $scope.hide();
            $scope.showToast("AppointmentStatus added successfully"); 


          if(rate_value == "followup" ){
            $http({
            method:"post",
            url:'http://68.183.101.193/android/338/SendFollowUpNotification.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:localStorage.getItem("UserId11"),
              Angular_DoctorId:localStorage.getItem("DoctorId11")
            }
          }).success(function(data){

          });  
            
           var RandomId = Math.floor(1000 + Math.random() * 9000);
           var d = new Date();
           var a = d.setHours(d.getHours() + 12);

            cordova.plugins.notification.local.schedule({
                 id: RandomId,
                 text:'Have you follow up your patient ' + ' ' + localStorage.getItem("AppointmentPatientName") + + '?',
                 sound: 'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at: new Date(a)
              });
            } 
                   
          });


    }

$scope.dc = {};

$scope.CloseVisits = function(){
  $state.go('addappointment');
} 

$scope.GoBackToList = function(){
  $state.go('Appointment');
  $rootScope.ShowDoctor = false;
  $rootScope.visit1 = false;
  $rootScope.DviewColor1 = 'black';
  $rootScope.DviewColor = 'black';
  $rootScope.DviewbgColor = 'white';
  $rootScope.DviewbgColor1 = 'white';
}

$scope.SelectVisit = function(x){
$rootScope.visit1 = true; 
$rootScope.VisitName = x.Name;
$rootScope.VisitExample = x.Example;
$state.go('addappointment'); 
}

$scope.LoadVisits = function(){
$scope.type1 = [
     { Name: 'Brief Visit', Example: 'E.g. cold/flu, sinus infection', Id: 1},
    { Name: 'Urinary Problems / UTI', Example: '', Id: 2},
    { Name: 'Behavioral Health / Therapy', Example: '', Id: 3},
    { Name: 'Pediatrics (only available for Family Plan)', Example: '', Id: 4},
    { Name: 'Other Non-Emergency Issues', Example: '', Id: 5}
  ];
$scope.type = $scope.type1[0];
}

$scope.loadAddAppoint = function(){
$scope.type1 = [
     { Name: 'Brief Visit', Example: 'E.g. cold/flu, sinus infection', Id: 1},
    { Name: 'Urinary Problems / UTI', Example: '', Id: 2},
    { Name: 'Behavioral Health / Therapy', Example: '', Id: 3},
    { Name: 'Pediatrics (only available for Family Plan)', Example: '', Id: 4},
    { Name: 'Other Non-Emergency Issues', Example: '', Id: 5}
  ];
$scope.type = $scope.type1[0];  
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetDoctors.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).success(function(data){        
        $scope.DoctorsList = data;
        $scope.hide();
        });
    };

$scope.GoToAddAppointment = function(){
  $state.go('addappointment');
  $rootScope.ShowDoctor = false;
  $rootScope.visit1 = false;
  $rootScope.DviewColor1 = 'black';
  $rootScope.DviewColor = 'black';
  };

$scope.SaveAppointment = function(doc_id, AppointMessage, AppointDate, AppointTime, reminder, sch_id, type){
        if(reminder == true){
          var RandomId = Math.floor(1000 + Math.random() * 9000);
          var CatName = "Upcoming appointment of" + ' ' + type;
          var alarmTime=new Date(AppointTime+' '+AppointDate);            
          var durationInMinutes = 60;
          var a = alarmTime.setMinutes(alarmTime.getMinutes() - durationInMinutes);
          cordova.plugins.notification.local.schedule({
                 id: RandomId,
                 text: CatName,
                 sound:'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at: new Date(a)
        });
        }
console.log(reminder);
        var UserId = localStorage.getItem("UserIdKey");
        var AppointMessage = AppointMessage;
        var AppointDate = AppointDate;
        var DoctorId = doc_id;
        var CurrentDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
     
        if(DoctorId == undefined){
        $scope.showToast('Please select doctor');
        }
        else if(type == undefined || type == null){ 
        $scope.showToast('Please select your reason for appointment');
        }
        else if(AppointMessage == undefined){ 
        $scope.showToast('Enter message');
        }
        else{
          $scope.show();
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/AddAppointment.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_UserId:UserId,
              Angular_Message:AppointMessage,
              Angular_AppointmentDate:AppointDate,
              Angular_AppointmentTime:AppointTime,
              Angular_DoctorId:DoctorId,
              Angular_Type:type,
              Angular_alert:reminder,
              Angular_schid:sch_id
            }
          }).success(function(data){
            $scope.hide();
            $state.go('Appointment');
            $scope.showToast("Appointment added successfully");
          });
        }
    };

$scope.editAppoint = function(AppId,AppointmentDate,DoctorId,Message){
      $state.go('app.editappointment');
      localStorage.setItem("AppIDKey",AppId);
      localStorage.setItem("AppdateKey",AppointmentDate);
      localStorage.setItem("DoctorIdKey",DoctorId);
      localStorage.setItem("MessKey",Message);      
    };

$scope.GetEditAppointment = function(){
      $scope.loadAddAppoint();
      $scope.SelectedEditDoctorId = localStorage.getItem('DoctorIdKey');
      $scope.EditAppointDate = new Date(localStorage.getItem('AppdateKey'));
      $scope.EditAppointMessage = localStorage.getItem('MessKey');
    }

$scope.editAppointment = function(EditAppointDate,SelectedEditDoctorId,EditAppointMessage){
      if(angular.isUndefined(EditAppointDate) || EditAppointDate == "" || EditAppointDate == null){
        $scope.showToast("Please select Date");  
      }
      else if(angular.isUndefined(EditAppointMessage) || EditAppointMessage == ""){
        $scope.showToast("Please enter message");
      }
      else if(angular.isUndefined(SelectedEditDoctorId) || SelectedEditDoctorId == ""){
        $scope.showToast("Please select doctor");
      }
      else{        
        EditAppointDate = $filter('date')(EditAppointDate,'dd-MMM-yy');
        $scope.show();
        $http({
            method:"post",
            url:'http://68.183.101.193/android/338/UpdateAppoint.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_AppId:localStorage.getItem('AppIDKey'),
              Angular_Message:EditAppointMessage,
              Angular_AppointmentDate:EditAppointDate,
              Angular_DoctorId:SelectedEditDoctorId,
              Angular_UserId:localStorage.getItem('UserIdKey')
            }
          }).success(function(data){
            if(data.length!=0){
              $scope.hide();
              $scope.GoBack();
              $scope.AppointmentList = data;
              $scope.showToast("Appointment updated successfully");
            }   
            else{
              $scope.hide();
            }       
          });
      }      
    };

$scope.deleteAppoint = function(){
      $scope.closePopover1();
      var Appid = localStorage.getItem("AppointmentId");
      var sch_id = localStorage.getItem("sch_id");

      navigator.notification.confirm(
        'Are you sure you want to cancel this Appointment?',
         onConfirm,  
        'Confirm',    
        ['Ok','Cancel']    
      );

      function onConfirm(buttonIndex) {      
      $scope.show();     
      $http({
          method:"post",
          url:'http://68.183.101.193/android/338/DelAppointment.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_AppId:Appid,
            Angular_schid:sch_id
          }
        }).success(function(data){          
         $scope.getAppointment();
         $scope.showToast("Appointment deleted successfully");
        });
      } 
    };

$scope.ConfirmAppointment = function(Appid, sch_id){
      $scope.show();
      $http({
          method:"post",
          url:'http://68.183.101.193/android/338/DelAppointment1.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_AppId:Appid,
            Angular_schid:sch_id
          }
        }).success(function(data){
          $scope.hide();
          $scope.loadDocupcomingApp();
          $scope.showToast("Appointment deleted successfully");
        });  
    };


$scope.GetScheduleData = function(sch_id,id, profile, name, speciality, address,s_date, status,date1,date2,date3,date4,date5,date6){   

      if(status == 1){
        $rootScope.appointment_time = date1;
        console.log( $rootScope.appointment_time)
      }
      if(status == 2){
        $rootScope.appointment_time = date2;
      }
      if(status == 3){
        $rootScope.appointment_time = date3;
      }
      if(status == 4){
        $rootScope.appointment_time = date4;
      }
      if(status == 5){
        $rootScope.appointment_time = date5;
      }
      if(status == 6){
        $rootScope.appointment_time = date6;
      }
      var b = $filter('date')($rootScope.appointment_time, 'MM/dd/yyyy');
      var a = b + ' ' + s_date;
      var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
      // var c = '09/21/2018 06:00 PM'
      // console.log($rootScope.appointment_time)
      // console.log(b)
      // console.log(s_date)
      var aDate = new Date(a).getTime();
      var bDate = new Date(c).getTime();
       console.log(new Date(aDate));
      console.log(new Date(bDate));

      if(new Date(aDate) <= new Date(bDate)){
          $scope.showToast("Time can not be less or equal to current DateTime");
      }else{
       $rootScope.sch_id = sch_id;
       $rootScope.doc_id = id;
       $rootScope.doc_profile = profile;
       $rootScope.doc_name = name;
       $rootScope.doc_speciality = speciality;
       $rootScope.appointment_date = s_date;
       $rootScope.address1 = address;
       console.log($rootScope.appointment_date)
       $rootScope.ShowDoctor = true;
       
       $state.go('addappointment');
       var type = localStorage.getItem("val");

       if(type == 'value1'){
        $rootScope.DviewColor = 'white';
        $rootScope.DviewbgColor = '#50A0FF';
        
       }
       else{
        $rootScope.DviewColor1 = 'white';
        $rootScope.DviewbgColor1 = '#50A0FF';
       }   
      }       
    }
    
    $scope.GetDoctorSchedule = function(){
        var  days = [];
        var daysRequired = 7;
        for (var i = 0; i < 7; i++) {
          days.push({
              dates:moment().add(i, 'days').format('DD MMMM YYYY (dddd)'),
              date_c:moment().add(i, 'days').format('DD') 
          }) 
        }
        $scope.seven_days = days;    
        $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetSchedule.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_DoctorId:localStorage.getItem("doc_id")
            }
          }).success(function(data){
          $scope.ScheduleData = [];
          for(var i = 0; i < data.length; i++) {
                $scope.ScheduleData.push({
                  app_time : data[i].schedule,
                  app_date : data[i].Start,
                  date_c : $filter('date')(data[i].Start, 'dd'),
                  doc_id: data[i].doc_id,
                  sch_id: data[i].id
              });
          }
          })  
    }

$scope.ratingsObject = {
        iconOn: 'ion-ios-star',  
        iconOff: 'ion-ios-star-outline',   
        iconOnColor: 'rgb(200, 200, 100)', 
        iconOffColor:  'rgb(200, 100, 100)',   
        rating:  2,
        minRating:1,   
        readOnly: true,  
        callback: function(rating, index) {    
          $scope.ratingsCallback(rating, index);
        }
};
  
$scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
};

$scope.GoToSchedule = function(id, profile, name, speciality){
       localStorage.setItem("doc_id", id);
       $rootScope.doc_id = id;
       $rootScope.doc_profile = profile;
       $rootScope.doc_name = name;
       $rootScope.doc_speciality = speciality;
       $rootScope.ShowDoctor = true;
       $state.go('ScheduleTime');
}

$scope.NextDay = function(dates){
    localStorage.setItem("val5",1);
    localStorage.setItem("DoctorsListDate",dates);
    window.location.reload(true);     
}    

$scope.PerivousDay = function(dates){  
      localStorage.setItem("val5",2);
      localStorage.setItem("DoctorsListDate",dates);
      window.location.reload(true);  
}

$scope.SaveDate1 = function(){
  $scope.dates = new Date;
  $scope.date1 =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
  console.log($scope.date1);
  $scope.loadDoctors(1,$scope.date1);
}

$scope.SaveDate2 = function(){

  var tomorrow = new Date($scope.dates); 
  $scope.datess = tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.date2 =  $filter('date')(new Date($scope.datess),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.datess),'yyyy-MM-dd');
  console.log($scope.date2);
  $scope.loadDoctors(2,$scope.date2); 
}

$scope.SaveDate3 = function(){
  var tomorrow = new Date($scope.datess); 
  $scope.datesss = tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.date3 =  $filter('date')(new Date($scope.datesss),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.datesss),'yyyy-MM-dd');
  console.log($scope.date3);
  $scope.loadDoctors(3,$scope.date3); 
}

$scope.SaveDate4 = function(){
  var tomorrow = new Date($scope.datesss); 
  $scope.datessss = tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.date4 =  $filter('date')(new Date($scope.datessss),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.datessss),'yyyy-MM-dd');
  console.log($scope.date4);
  $scope.loadDoctors(4,$scope.date4); 
}

$scope.SaveDate5 = function(){
  var tomorrow = new Date($scope.datessss); 
  $scope.datesssss = tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.date5 =  $filter('date')(new Date($scope.datesssss),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.datesssss),'yyyy-MM-dd');
  console.log($scope.date5);
  $scope.loadDoctors(5,$scope.date5); 
}

$scope.SaveDate6 = function(){
  var tomorrow = new Date($scope.datesssss); 
  $scope.datessssss = tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.date6 =  $filter('date')(new Date($scope.datessssss),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.datessssss),'yyyy-MM-dd');
  console.log($scope.date6);
  $scope.loadDoctors(6,$scope.date6);  
}


$scope.loadDays = function(){   
    $scope.dates = new Date();
    console.log( $scope.dates)
    $scope.date1 =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
    console.log( $scope.dates)
    $scope.c =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
    $scope.d1 =  $filter('date')(new Date($scope.dates),'dd');
    $scope.w1 =  $filter('date')(new Date($scope.dates),'EEE');

    var tomorrow = new Date($scope.dates); 
    $scope.datess = tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.date2 =  $filter('date')(new Date($scope.datess),'yyyy-MM-dd');
    $scope.d2 =  $filter('date')(new Date($scope.datess),'dd');
    $scope.w2 =  $filter('date')(new Date($scope.datess),'EEE');

    $scope.datesss = tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.date3 =  $filter('date')(new Date($scope.datesss),'yyyy-MM-dd');
    $scope.d3 =  $filter('date')(new Date($scope.datesss),'dd');
    $scope.w3 =  $filter('date')(new Date($scope.datesss),'EEE');

    $scope.datessss = tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.date4 =  $filter('date')(new Date($scope.datessss),'yyyy-MM-dd');
    $scope.d4 =  $filter('date')(new Date($scope.datessss),'dd');
    $scope.w4 =  $filter('date')(new Date($scope.datessss),'EEE');

    $scope.datesssss = tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.date5 =  $filter('date')(new Date($scope.datesssss),'yyyy-MM-dd');
    $scope.d5 =  $filter('date')(new Date($scope.datesssss),'dd');
    $scope.w5 =  $filter('date')(new Date($scope.datesssss),'EEE');

    $scope.datessssss = tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.date6 =  $filter('date')(new Date($scope.datessssss),'yyyy-MM-dd');
    $scope.d6 =  $filter('date')(new Date($scope.datessssss),'dd');
    $scope.w6 =  $filter('date')(new Date($scope.datessssss),'EEE');

    $scope.loadDoctors(1,$scope.date1);
}



$scope.loadDoctors = function(val5,current_date){
    $scope.status = val5; 
    $scope.PrivevousBtn= true;     
    var val = localStorage.getItem("val")
    if(val=="value1"){       
            $scope.show();
            $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetPersonalDoctors.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Page: 1,
              Angular_Date:current_date,
              UserId:localStorage.getItem('UserIdKey')
            }
          }).success(function(PersonalDocList){
             console.log(PersonalDocList);
             $scope.hide();
             if (PersonalDocList == ''){
              $scope.ShowData = false;
              $scope.NoData2 = true;
              $scope.ShowDate = false;
             }else{             
              $scope.ShowData = true;
              $scope.NoData2 = false;
              $scope.ShowDate = true;
              $scope.PersonalDocList = PersonalDocList;
          }
          });
       }
       else{         
           $scope.show();
            $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetDoctors.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Page: 1,
              Angular_Date:current_date,
              Angular_CityName:localStorage.getItem('CityNameKey'),
              UserId:localStorage.getItem('UserIdKey')
            }
          }).success(function(PersonalDocList){
            console.log(PersonalDocList);
            $scope.hide();
            if(PersonalDocList == ''){
                $scope.ShowData = false;
                $scope.NoData1 = true;
                $scope.ShowDate = false;
            }else{
                $scope.ShowData = true;
                $scope.NoData1 = false;
                $scope.ShowDate = true;
                $scope.PersonalDocList = PersonalDocList;
              }
        });    
       }
}


$scope.PageNumber=1;

$scope.LoadMorePersonalDoctors = function(val5,current_date){

    $scope.status = val5; 
    $scope.PrivevousBtn= true;     
    var val = localStorage.getItem("val")
    if(val=="value1"){       
            $scope.show();
            $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetPersonalDoctors.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Page: $scope.PageNumber,
              Angular_Date:current_date,
              UserId:localStorage.getItem('UserIdKey')
            }
          }).success(function(PersonalDocList){
             console.log(PersonalDocList);
             $scope.hide();
             if (PersonalDocList == ''){
              $scope.ShowData = false;
              $scope.NoData2 = true;
              $scope.ShowDate = false;
             }else{             
              $scope.ShowData = true;
              $scope.NoData2 = false;
              $scope.ShowDate = true;
              $scope.PersonalDocList = PersonalDocList;
          }
          });
       }
       else{         
           $scope.show();
            $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetDoctors.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Page: $scope.PageNumber,
              Angular_Date:current_date,
              Angular_CityName:localStorage.getItem('CityNameKey'),
              UserId:localStorage.getItem('UserIdKey')
            }
          }).success(function(PersonalDocList){
            console.log(PersonalDocList);
            $scope.hide();
            if(PersonalDocList == ''){
                $scope.ShowData = false;
                $scope.NoData1 = true;
                $scope.ShowDate = false;
            }else{
                $scope.ShowData = true;
                $scope.NoData1 = false;
                $scope.ShowDate = true;
                $scope.PersonalDocList = PersonalDocList;
              }
        });    
       }
}



// $scope.LoadMorePersonalDoctors = function(page,date){  

//     $scope.PageNumber = page+1;
//     var val = localStorage.getItem("val")
//     if(val=="value1"){
//     GetPersonalDoctors.GetProjects($scope.PageNumber, Number(localStorage.getItem("UserIdKey")),date).then(function(PersonalDocList) {
//     $scope.PersonalDocList = $scope.PersonalDocList.concat(PersonalDocList);
//     console.log($scope.PersonalDocList)
//     $scope.$broadcast('scroll.infiniteScrollComplete'); 
//     });
//     }else{
//     GetDoctors.GetProjects($scope.PageNumber, Number(localStorage.getItem("UserIdKey")),date,localStorage.getItem('CityNameKey')).then(function(PersonalDocList) {
//     $scope.PersonalDocList = $scope.PersonalDocList.concat(PersonalDocList);
//     console.log($scope.PersonalDocList)
//     $scope.$broadcast('scroll.infiniteScrollComplete'); 
//     });
   
//   }


// }

$scope.changedRadioValue = function(val){
    localStorage.setItem("val", val);
    $state.go('DoctorsList');          
    };

$scope.seenChange = function(val){
     localStorage.setItem("a_type", val); 
    };
})

.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
});

