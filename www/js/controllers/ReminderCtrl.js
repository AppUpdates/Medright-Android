angular.module('starter.controllers')
  
.controller("ReminderCtrl",function($scope,$state,$ionicSideMenuDelegate,$http,
               $ionicPlatform, $ionicHistory,ionicToast, $location,GetUserReminder, ionicTimePicker,$ionicLoading,$filter,$cordovaLocalNotification, $cordovaDatePicker){
    
$scope.RepeatList = [];
$scope.Cat = 0;
    
$scope.openMenu = function (){
      $ionicSideMenuDelegate.toggleLeft();
    };

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      });
    };

$scope.hide = function(){
      $ionicLoading.hide();
    };

$scope.showToast = function(msg){
      window.plugins.toast
        .show(msg, 'short', 'center')
        .then(function(success) {
          console.log('Success');
        }, function (error) {
          console.log('Error');
        });
    };

$scope.loadRepeatList = function(){
      $scope.RepeatList = [{'Rid':'hourly','Rname':'Hourly'},
        {'Rid':'daily','Rname':'Daily'},
        {'Rid':'weekly','Rname':'Weekly'},
        {'Rid':'monthly','Rname':'Monthly'}];
    };

$scope.getOrdinalNum = function(n) {
$scope.SelectedDate5 =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
$scope.SelectedDate6  = $filter('date')(new Date(),'MMMM, yyyy');
$scope.date = $scope.SelectedDate5 + ' ' +$scope.SelectedDate6;
}

 // $scope.$on('$ionicView.enter', function () {
 //   $scope.loadReminderCat();
 //  });


$scope.loadSetReminder = function(){
  var date = new Date();
  date.setDate(date.getDate() + 5);



  $scope.status = 1;
  $scope.SelectedDate  = $filter('date')(new Date(),'dd MMMM, yyyy');
  $scope.SelectedDate5  = $filter('date')(new Date(),'d');
  $scope.getOrdinalNum($scope.SelectedDate5);

  //  $scope.SelectedTime = {
  //      value: new Date(1970, 0, 1, $filter('date')(new Date(),'HH'), $filter('date')(new Date(),'mm'), 0)
  // };

   $scope.SelectedTime = $filter('date')(new Date(),'hh:mm a');

  $scope.SelectedDay1 = $filter('date')(new Date(),'EEE');
  //$scope.SelectedDay1 = $filter('date')(new Date(),'EEE');
  $scope.SelectedDay = $filter('date')(new Date(),'EEEE');

  if($scope.SelectedDay1 == 'Sun'){
    // $scope.status = 1;
    $scope.day1 = 'S';
    $scope.day2 = 'M';
    $scope.day3 = 'T';
    $scope.day4 = 'W';
    $scope.day5 = 'T';
    $scope.day6 = 'F';
    $scope.day7 = 'S';
    localStorage.setItem("DateStatus",$scope.status);
  }

  if($scope.SelectedDay1 == 'Mon'){
    // $scope.status = 2;
    $scope.day1 = 'M';
    $scope.day2 = 'T';
    $scope.day3 = 'W';
    $scope.day4 = 'T';
    $scope.day5 = 'F';
    $scope.day6 = 'S';
    $scope.day7 = 'S';
    localStorage.setItem("DateStatus",$scope.status);
  }

  if($scope.SelectedDay1 == 'Tue'){
    //$scope.status = 3;
    $scope.day1 = 'T';
    $scope.day2 = 'W';
    $scope.day3 = 'T';
    $scope.day4 = 'F';
    $scope.day5 = 'S';
    $scope.day6 = 'S';
    $scope.day7 = 'M';
    localStorage.setItem("DateStatus",$scope.status);
  }

  if($scope.SelectedDay1 == 'Wed'){
    // $scope.status = 4;
    $scope.day1 = 'W';
    $scope.day2 = 'T';
    $scope.day3 = 'F';
    $scope.day4 = 'S';
    $scope.day5 = 'S';
    $scope.day6 = 'M';
    $scope.day7 = 'T';
    localStorage.setItem("DateStatus",$scope.status);
  }

  if($scope.SelectedDay1 == 'Thu'){
    // $scope.status = 5;
    $scope.day1 = 'T';
    $scope.day2 = 'F';
    $scope.day3 = 'S';
    $scope.day4 = 'S';
    $scope.day5 = 'M';
    $scope.day6 = 'T';
    $scope.day7 = 'W';
    localStorage.setItem("DateStatus",$scope.status);
  }

 if($scope.SelectedDay1 == 'Fri'){
    // $scope.status = 6;
    $scope.day1 = 'F';
    $scope.day2 = 'S';
    $scope.day3 = 'S';
    $scope.day4 = 'M';
    $scope.day5 = 'T';
    $scope.day6 = 'W';
    $scope.day7 = 'T';
    localStorage.setItem("DateStatus",$scope.status);
  }

 if($scope.SelectedDay1 == 'Sat'){
    // $scope.status = 7;
    $scope.day1 = 'S';
    $scope.day2 = 'S';
    $scope.day3 = 'M';
    $scope.day4 = 'T';
    $scope.day5 = 'W';
    $scope.day6 = 'T';
    $scope.day7 = 'F';
    localStorage.setItem("DateStatus",$scope.status);
  }



   $scope.Setreminder = localStorage.getItem("SetHeadKey");
      $scope.loadRepeatList();
      $scope.timeList = [];
      $scope.buttonDis = false;
      $scope.counter = 0;
      localStorage.setItem("TimesKey", "");
    };

$scope.SaveDate1  = function(){
$scope.status = 1;
$scope.clickStatus = 1
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}

$scope.SaveDate2  = function(){
$scope.status = 2;
$scope.clickStatus = 2
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}

$scope.SaveDate3  = function(){
$scope.status = 3;
$scope.clickStatus = 3
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}

$scope.SaveDate4  = function(){
$scope.status = 4;
$scope.clickStatus = 4
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}


$scope.SaveDate5  = function(){
$scope.status = 5;
$scope.clickStatus = 5
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}

$scope.SaveDate6  = function(){
$scope.status = 6;
$scope.clickStatus = 6
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
}

$scope.SaveDate7  = function(){
$scope.status = 7;
$scope.clickStatus = 7
$scope.Value = $scope.clickStatus - localStorage.getItem("DateStatus");
var tomorrow = new Date(); 
$scope.datess = tomorrow.setDate(tomorrow.getDate() + $scope.Value);
var ts = new Date($scope.datess);
$scope.SelectedDay = $filter('date')(new Date(ts),'EEEE');
$scope.SelectedDate5  = $filter('date')(new Date(ts),'d');
$scope.getOrdinalNum($scope.SelectedDate5);
$scope.SelectedDate  = $filter('date')(new Date(ts),'dd MMMM, yyyy ');
}

$scope.saveSetReminder = function(SelectedDate,SelectedTime, CatName){    
    console.log(SelectedTime);
    var CurrentDate = new Date(SelectedDate);
    var SelectedDate = $filter('date')(CurrentDate,'dd-MMM-yy');
    console.log(SelectedDate);
    var hrs2 = SelectedTime.getHours();
    var mins2 = SelectedTime.getMinutes();
    if(hrs2 == 0){
        hrs2 = 12;
    }

    var total_mins2 = (hrs2*60)+mins2;
    var CompareDate = $filter('date')(new Date(),'dd-MMM-yy');
    var CompareTime = $filter('date')(new Date(),'hh:mm a');
    var current_date1 = new Date();
    var hrs1 = current_date1.getHours();      
    var mins1 = current_date1.getMinutes();
    if(hrs1 == 0){
      hrs1 = 12;
     }

    var total_mins1 = (hrs1*60)+mins1;  
    if(SelectedDate == undefined){
       $scope.showToast("Please Enter date");
     }
     else if(SelectedTime == undefined){
       $scope.showToast("Please Enter Time");
     }
      else if(SelectedDate < CompareDate){
      $scope.showToast("Date cannot be less then current date");
      }
      else if(SelectedDate <= CompareDate && total_mins2<=total_mins1){
        $scope.showToast("Time cannot be less then current time");
      }

     else{
      $scope.show($ionicLoading);      
      var SelectedTime1 = $filter('date')(SelectedTime,'hh:mm a');

      var RandomId = Math.floor(1000 + Math.random() * 9000);

      var alarmTime=new Date(SelectedDate+' '+SelectedTime1);
            
      var sec_from_now=new Date(alarmTime);
      console.log(sec_from_now);

      var hrs = SelectedTime.getHours();
      
      var mins = SelectedTime.getMinutes();

       if(hrs == 0){
        hrs = 12;
       }

       var total_mins = (hrs*60)+mins;
  
       cordova.plugins.notification.local.schedule({
                 id: RandomId,
                 text: CatName,
                 sound:'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at: sec_from_now
              });


       $http({
          method: "post",
          url:'http://68.183.101.193/android/338/SetReminder.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_CategoryId: Number(localStorage.getItem("SetCatIdKey")),
            Angular_ReminderId: Number(localStorage.getItem("cat")),
            Angular_UserId: Number(localStorage.getItem("UserIdKey")),
            Angular_StartDate: SelectedDate,
            Angular_Time1: SelectedTime1,
            Angular_FirstName:localStorage.getItem("FirstNameKey"),
            Angular_RandomId:RandomId,
            Angular_ctime: total_mins
          }
        }).success(function(data){
           $scope.hide($ionicLoading);
           $state.go('ReminderCategory');
           $scope.showToast("Reminder set successfully");
        })  
     }
    }


$scope.goToReminder = function(cat){
      localStorage.setItem("cat",cat);
      if(cat == '2' || cat == 2){
        localStorage.setItem("SetCatIdKey",'7');
        localStorage.setItem("SetHeadKey",'Meal Reminder');
        $state.go('reminderdetail');
      }
      else{
        $state.go('reminder');
      }     
    };

$scope.loadReminder = function(){
      $scope.show();
      $http({
        method:'post',
        url:'http://68.183.101.193/android/338/GetReminder.php',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_ReminderId:localStorage.getItem("cat")
        }
      }).success(function(data){
        console.log(data);
        $scope.ReminderCatList = data;
        $scope.hide();
      });
      
cordova.plugins.notification.local.getAll(function (notifications) {
    console.log(notifications);
});

    };
$scope.has_more_reminder = true;
$scope.loadUserReminder = function(){
      var CurrentDate = new Date();
      var date1 =  $filter('date')(CurrentDate,'dd-MMM-yy hh:mm a');
      $scope.show();
      $http({
        method:'post',
        url:'http://68.183.101.193/android/338/GetUserHealthRemider.php',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId :localStorage.getItem("UserIdKey"),
          Current_Date : date1
        }
      }).success(function(ReminderCatList){
        console.log(ReminderCatList);        
         $scope.hide();
         if(ReminderCatList != ''){
          $scope.ShowData = true;
          $scope.NoData = false;
          $scope.ReminderCatList = [];
          for(var i=0;i<ReminderCatList.length;i++){
            
           var n = $filter('date')(new Date(ReminderCatList[i].StartDate),'d');

            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            $scope.MonthYear  = $filter('date')(new Date(ReminderCatList[i].StartDate),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' +$scope.MonthYear;

            $scope.ReminderCatList.push({
                CategoryId :ReminderCatList[i].CategoryId,
                CategoryImage :ReminderCatList[i].CategoryImage,
                CategoryName :ReminderCatList[i].CategoryName,
                CreatedBy :ReminderCatList[i].CreatedBy,
                CreatedOn :ReminderCatList[i].CreatedOn,
                Deleted :ReminderCatList[i].Deleted,
                Id :ReminderCatList[i].Id,
                IsRepeat :ReminderCatList[i].IsRepeat,
                ModifyBy :ReminderCatList[i].ModifyBy,
                ModifyOn :ReminderCatList[i].ModifyOn,
                RandomId :ReminderCatList[i].RandomId,
                ReminderId :ReminderCatList[i].ReminderId,
                StartDate : $scope.date,
                Time1 :ReminderCatList[i].Time1,
                Time2 :ReminderCatList[i].Time2,
                Time3 :ReminderCatList[i].Time3,
                Time3 :ReminderCatList[i].Time3,
                UserId :ReminderCatList[i].UserId,
                c_time :ReminderCatList[i].c_time               
              });

          }
         }
         else{
          $scope.ShowData = false;
          $scope.NoData = true;
         }
      });
    };

$scope.PageNumber=1;
$scope.LoadMoreUserReminder = function(page){
    console.log(page);
    var CurrentDate = new Date();
    var date1 =  $filter('date')(CurrentDate,'dd-MMM-yy hh:mm a');
    $scope.PageNumber = page+1;
    GetUserReminder.GetProjects($scope.PageNumber,localStorage.getItem("UserIdKey"),date1).then(function(ReminderCatList) {
    
    if(ReminderCatList.length == 0) {
              // $scope.has_more_reminder = false;
              // $scope.ShowSpinner = false;
              // ionicToast.show('No more reminders found!', 'bottom', false, 1700);
      }          
    else{ 
    $scope.ShowSpinner = true;
    $scope.ReminderCatList1 = [];
          for(var i=0;i<ReminderCatList.length;i++){

            
           var n = $filter('date')(new Date(ReminderCatList[i].StartDate),'d');

            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            $scope.MonthYear  = $filter('date')(new Date(ReminderCatList[i].StartDate),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' +$scope.MonthYear;

            $scope.ReminderCatList1.push({
                CategoryId :ReminderCatList[i].CategoryId,
                CategoryImage :ReminderCatList[i].CategoryImage,
                CategoryName :ReminderCatList[i].CategoryName,
                CreatedBy :ReminderCatList[i].CreatedBy,
                CreatedOn :ReminderCatList[i].CreatedOn,
                Deleted :ReminderCatList[i].Deleted,
                Id :ReminderCatList[i].Id,
                IsRepeat :ReminderCatList[i].IsRepeat,
                ModifyBy :ReminderCatList[i].ModifyBy,
                ModifyOn :ReminderCatList[i].ModifyOn,
                RandomId :ReminderCatList[i].RandomId,
                ReminderId :ReminderCatList[i].ReminderId,
                StartDate : $scope.date,
                Time1 :ReminderCatList[i].Time1,
                Time2 :ReminderCatList[i].Time2,
                Time3 :ReminderCatList[i].Time3,
                Time3 :ReminderCatList[i].Time3,
                UserId :ReminderCatList[i].UserId,
                c_time :ReminderCatList[i].c_time               
              });

          }
    console.log( $scope.PastAppointmentList1)
    $scope.ReminderCatList = $scope.ReminderCatList.concat($scope.ReminderCatList1);
    console.log($scope.ReminderCatList);
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
  }      
  });
  };

$scope.goToWater = function(catId,text){
      console.log(catId,text);
      localStorage.setItem("SetCatIdKey",catId);
      localStorage.setItem("SetHeadKey",text);
      $state.go('reminderdetail');
    };

$scope.loadReminderCat = function(){
      $scope.show();
      $http({
        method:'post',
        url:'http://68.183.101.193/android/338/GetHealthReminder.php',
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
      }).success(function(data){
        $scope.ReminderList = data;
        $scope.hide();
      });
    };

$scope.cancelSetReminder = function(){
      $ionicHistory.goBack();
      $scope.ch1 = false;
    };

$scope.GoMain = function(){
      $state.go('remindercategory');
    };
    


$scope.saveSetReminder1 = function(SelectedDate,SelectedTime,SelectedRepeatId){      
      SelectedDate = $filter('date')(SelectedDate,'dd-MMM-yy');
      SelectedTime = $filter('date')(SelectedTime,'hh:mm a');  
      if(angular.isUndefined(SelectedDate) || SelectedDate == ""){
        $scope.showToast("Please Enter date");
      }
      else if(angular.isUndefined(SelectedTime) || SelectedTime == ""){
        $scope.showToast("Please Enter Time");
      }    
      else{
        $scope.show();
        if(localStorage.getItem("TimesKey") == ""){
          $scope.timeList.push({'time':SelectedTime});
        }
        else{
          $scope.timeList = JSON.parse(localStorage.getItem("TimesKey"));
        }
        if($scope.timeList.length == 1){
          var data1={
            Angular_CategoryId:Number(localStorage.getItem("SetCatIdKey")),
            Angular_UserId:Number(localStorage.getItem("UserIdKey")),
            Angular_StartDate:SelectedDate,
            Angular_Time1:$filter('date')($scope.timeList[0].time,'hh:mm a'),
            Angular_Time2:"",
            Angular_Time3:"",
            Angular_IsRepeat:SelectedRepeatId,
            Angular_FirstName:localStorage.getItem("FirstNameKey")
          }
        }   

        $http({
          method:'post',
          url:'http://68.183.101.193/android/338/SetReminder.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:data1
        }).success(function(data){
          if(data.length!=0){                      
            $scope.ReminderCatList = data;
            if(angular.isUndefined(SelectedRepeatId)){
              
              var v = $scope.ReminderCatList[data.length-1].CategoryName;
              console.log(v);
              var alarmTime=new Date(SelectedDate+' '+SelectedTime);
              // var sec_from_now=new Date(alarmTime+1*1000);
              var sec_from_now=new Date(alarmTime);
              window.plugin.notification.local.schedule({
                 id:$scope.ReminderCatList[data.length-1].Id,
                 text:v,
                 sound: 'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at:sec_from_now
              });

              cordova.plugins.notification.local.on("click", function(notification) {
                cordova.plugins.notification.local.cancel(notification.id);
                $http({
                  method:"post",
                  url:'http://68.183.101.193/android/338/DelReminder.php',
                  headers: {'Content-Type':'application/x-www-form-urlencoded'},
                  data:{
                    Angular_RemId:notification.id,
                    Angular_UserId:localStorage.getItem('UserIdKey')
                  }
                }).success(function(data){
                  if(data.length!=0){
                    $scope.MyReminderList = data;
                    $state.go('app.remindercategory');                   
                  }   
                  else{
                    $scope.MyReminderList = [];
                    $state.go('app.remindercategory');
                  }           
                 });
              });
            }
            else{
              var v = $scope.ReminderCatList[data.length-1].CategoryName;
              console.log(v);
              var alarmTime=new Date(SelectedDate+' '+SelectedTime);
              
              window.plugin.notification.local.schedule({
                 id:$scope.ReminderCatList[data.length-1].Id,
                 text:v,
                 every: SelectedRepeatId,
                 sound: 'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at:alarmTime
              });
              cordova.plugins.notification.local.on("click", function(notification) {
                // cordova.plugins.notification.local.cancel(notification.id);
                $http({
                  method:"post",
                  url:'http://68.183.101.193/android/338/DelReminder.php',
                  headers: {'Content-Type':'application/x-www-form-urlencoded'},
                  data:{
                    Angular_RemId:notification.id,
                    Angular_UserId:localStorage.getItem('UserIdKey')
                  }
                }).success(function(data){
                  if(data.length!=0){
                    $scope.MyReminderList = data;
                   $state.go('app.remindercategory');                    
                  }   
                  else{
                    $scope.MyReminderList = [];
                    $state.go('app.remindercategory');
                  }           
                 });
              });

            }
            $state.go('app.showreminders');
            $scope.hide();            
            $scope.showToast("Reminder created successfully");          
          }
          else{
            $scope.hide();
            $scope.ReminderCatList = [];
          }  
        });
      }
    };

$scope.addTime = function(time1) {
      if (time1 == undefined) {
        $scope.showToast("Please enter time");
      }
      else {
        $scope.counter++;
        if ($scope.counter > 3) {
          $scope.showToast("Sorry max 3 times can be added");
          $scope.buttonDis = true;
        }
        else {
          $scope.timeList.push({'time': time1});
        }
        localStorage.setItem("TimesKey", JSON.stringify($scope.timeList));
        console.log($scope.timeList);
      }
    };

$scope.goToShowRem = function(){
      $state.go('ShowReminders');
    };

$scope.loadMyReminders = function(){
      $scope.show();
      var c_date = new Date();

      var d1 = $filter('date')(c_date,'dd-MMM-yy');
      var d2 = $filter('date')(c_date,'h:mm a');

      var current_date = new Date();

      var hrs1 = current_date.getHours();
      
      var mins1 = current_date.getMinutes();

       if(hrs1 == 0){
        hrs1 = 12;
       }

       var total_mins1 = (hrs1*60)+mins1;
      
       console.log(d1);
       console.log(total_mins1)
       $http({
        method:'post',
        url:'http://68.183.101.193/android/338/GetMyReminders.php',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey")),
          Angular_d1: d1,
          Angular_d2: total_mins1
        }
      }).success(function(data){
        console.log(data)
        $scope.hide();         
        if(data == ''){
         $scope.NoData = true;
         $scope.ShowData = false;
        }
        else{
          $scope.ShowData = true;
          $scope.NoData = false;
          $scope.MyReminderList = data;
        }
      });
    };

$scope.sendNoti = function(){
      cordova.plugins.notification.local.on("click", function (notification) {
        if (notification.id == 10) {
          joinMeeting(notification.data.meetingId);
        }
      });
    };

$scope.editReminder = function(CategoryName,StartDate,Time1,ReminderId,IsRepeat){
      console.log(CategoryName,StartDate,Time1,ReminderId,IsRepeat);
      localStorage.setItem("CategoryNameKey",CategoryName);
      localStorage.setItem("StartDateKey",StartDate);
      localStorage.setItem("Time1Key",Time1);
      localStorage.setItem("IsRepeatKey",IsRepeat);
      localStorage.setItem("RemIdKey",ReminderId);
      $state.go('editreminder');
    };

$scope.deleteReminder = function(remId, random_id){      
       cordova.plugins.notification.local.cancel(random_id);
       navigator.notification.confirm(
        'Do you really want to delete?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirm',           // title
        ['Ok','Cancel']     // buttonLabels
      );    
        function onConfirm(buttonIndex){
        if(buttonIndex == 1){         
          cordova.plugins.notification.local.cancel(random_id); 
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/DelReminder.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_RemId:remId
            }
          }).success(function(data){
            $scope.loadUserReminder();
            });
        }       
      }     
    };

$scope.loadEditReminder = function(){
      $scope.loadRepeatList();
      $scope.ReminderName = localStorage.getItem("CategoryNameKey");
      $scope.SelectedEditDate = new Date(localStorage.getItem("StartDateKey"));
      
      $scope.SelectedEditTime = new Date(localStorage.getItem("StartDateKey")+" "+localStorage.getItem("Time1Key"));
      console.log($scope.SelectedEditTime);
      $scope.SelectedEditRepeatId = Number(localStorage.getItem("IsRepeatKey"));
      console.log($scope.SelectedEditTime);
    };

$scope.UpdateMyReminder = function(SelectedEditDate,SelectedEditTime,SelectedEditRepeatId){      
      SelectedEditDate = $filter('date')(SelectedEditDate,'dd-MMM-yy');
      SelectedEditTime = $filter('date')(SelectedEditTime,'hh:mm a');
      console.log(localStorage.getItem("RemIdKey"),SelectedEditDate,SelectedEditTime,SelectedEditRepeatId);
      if(angular.isUndefined(SelectedEditDate) || SelectedEditDate == "" || SelectedEditDate == null){
        $scope.showToast("Please select date");
      }
      else if(angular.isUndefined(SelectedEditTime) || SelectedEditTime == "" || SelectedEditTime == null){
        $scope.showToast("Please select time");
      }
      else{
        if(angular.isUndefined(SelectedEditRepeatId)){
          SelectedEditRepeatId = 0;
        }        
        window.plugin.notification.local.cancel(Number(localStorage.getItem("RemIdKey"))); 
        $http({
          method:"post",
          url:'http://68.183.101.193/android/338/UpdateReminder.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_RemDate:SelectedEditDate,
            Angular_RemTime:SelectedEditTime,
            Angular_RemRepeat:SelectedEditRepeatId,
            Angular_RemId:localStorage.getItem('RemIdKey'),
            Angular_UserId:localStorage.getItem('UserIdKey')
          }
        }).success(function(data){
            if(data.length!=0){
              $scope.hide();
              $scope.GoBack();
              $scope.MyReminderList = data;
              if(angular.isUndefined(SelectedEditRepeatId)){
                window.plugin.notification.local.add({
                  id:localStorage.getItem('RemIdKey'),
                  title:'MedRight HealthCare',
                  message:String($scope.ReminderName),
                  date:new Date(SelectedEditDate+" "+SelectedEditTime)
                });
              }
              else{
                window.plugin.notification.local.add({
                  id:localStorage.getItem('RemIdKey'),
                  title:'MedRight HealthCare',
                  message:String($scope.ReminderName),
                  repeat:SelectedEditRepeatId,
                  date:new Date(SelectedEditDate+" "+SelectedEditTime)
                });
              }
              $scope.showToast("Reminder updated successfully");
            }   
            else{
              $scope.hide();
              $scope.MyReminderList = [];
            }       
          });
      }
    };

$scope.saveSetRem = function(SelectedDate,SelectedTime, CatName,NewSelectedTime){
  console.log(SelectedTime);
  var addy = NewSelectedTime; 
  var streetaddress = addy.substr(0, addy.indexOf(':')); 
  console.log(streetaddress);
  if(streetaddress)
  var streetaddress1 = addy.substr(3, addy.indexOf(':')); 
  console.log(streetaddress1)
  var CurrentDate = new Date(SelectedDate);   
  var SelectedDate = $filter('date')(CurrentDate,'dd-MMM-yy');
  console.log(SelectedDate);
  

  var CompareDate = $filter('date')(new Date(),'dd-MMM-yy');
  console.log(CompareDate);
  var CompareTime = $filter('date')(new Date(),'hh:mm a');
  console.log(CompareTime);
  
  
  if(SelectedDate == undefined){
       $scope.showToast("Please Enter date");
     }
  else if(SelectedTime == undefined){
       $scope.showToast("Please Enter Time");
     }
  else if(SelectedDate < CompareDate){
      $scope.showToast("Date cannot be less or equal then current date");
    }
  else if(SelectedDate <= CompareDate && SelectedTime <= CompareTime){
      $scope.showToast("Time cannot be less or equla then current time");
    }

  else{
      $scope.show($ionicLoading);     

      var RandomId = Math.floor(1000 + Math.random() * 9000);
      var alarmTime=new Date(SelectedDate+' '+SelectedTime);    
      // var alarmTime1 = SelectedDate.setTime + (streetaddress*60*60*1000)
    
      var sec_from_now= new Date(CurrentDate.getTime()+  (streetaddress*60*60*1000) + streetaddress1*60000);
      // console.log(alarmTime1)
      console.log(sec_from_now)

      var hrs = streetaddress;   
      console.log(hrs)   
      var mins = streetaddress1;
       if(hrs == 0){
        hrs = 12;
       }

       var total_mins = (hrs*60)+mins;
       console.log(total_mins)
  
       cordova.plugins.notification.local.schedule({
                 id: RandomId,
                 text: CatName,
                 sound:'http://68.183.101.193/android/338/audio/noti1.mp3',
                 at: new Date(sec_from_now)
              });


       $http({
          method: "post",
          url:'http://68.183.101.193/android/338/SetReminder.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_CategoryId: Number(localStorage.getItem("SetCatIdKey")),
            Angular_ReminderId: Number(localStorage.getItem("cat")),
            Angular_UserId: Number(localStorage.getItem("UserIdKey")),
            Angular_StartDate: SelectedDate,
            Angular_Time1: SelectedTime,
            Angular_FirstName:localStorage.getItem("FirstNameKey"),
            Angular_RandomId:RandomId,
            Angular_ctime: total_mins
          }
        }).success(function(data){
           $scope.hide($ionicLoading);
           $state.go('ReminderCategory');
           $scope.showToast("Reminder set successfully");
        })  
     }
   
    }


$scope.openTimePicker = function(){
   var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        console.log(val)
        var selectedTime = new Date(val * 1000); 
        console.log(selectedTime)     
   $scope.NewSelectedTime = selectedTime.getHours() + ':'+ selectedTime.getUTCMinutes() + ' '+ampm;
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), selectedTime.getUTCHours() < 12 ? 'AM' : 'PM');
       var hour = selectedTime.getUTCHours();
        if(hour == 1){
        var hour1 = '01';
      }
      if(hour == 2){
        var hour1 = '02';
      }
        if(hour == 3){
        var hour1 = '03';
      }
        if(hour == 4){
        var hour1 = '04';
      }
        if(hour == 5){
        var hour1 = '05';
      }
        if(hour == 6){
        var hour1 = '06';
      }
        if(hour == 7){
        var hour1 = '07';
      }
        if(hour == 8){
        var hour1 = '08';
      }
        if(hour == 9){
        var hour1 = '09';
      }
        if(hour == 10){
        var hour1 = '10';
      }
        if(hour == 11){
        var hour1 = '11';
      }
       if(hour == 12){
        var hour1 = '00';
      }

     
        if(hour == 13){
        var hour1 = '01';
      }
      if(hour == 14){
        var hour1 = '02';
      }
        if(hour == 15){
        var hour1 = '03';
      }
        if(hour == 16){
        var hour1 = '04';
      }
        if(hour == 17){
        var hour1 = '05';
      }
        if(hour == 18){
        var hour1 = '06';
      }
        if(hour == 19){
        var hour1 = '07';
      }
        if(hour == 20){
        var hour1 = '08';
      }
        if(hour == 21){
        var hour1 = '09';
      }
        if(hour == 22){
        var hour1 = '10';
      }
        if(hour == 23){
        var hour1 = '11';
      }
       if(hour == 24){
        var hour1 = '12';
      }

      localStorage.setItem("ReminderHours",selectedTime.getUTCHours());
      localStorage.setItem("ReminderMins",selectedTime.getUTCMinutes());
      var ampm = (selectedTime.getUTCHours() >= 12) ? "PM" : "AM";
        console.log(ampm)
       $scope.NewSelectedTime = selectedTime.getUTCHours()+ ':'+ selectedTime.getUTCMinutes() + ' '+ampm;
    
      if(ampm == 'PM'){
      $scope.SelectedTime =hour1 + ':'+ selectedTime.getUTCMinutes() + ' '+ampm;
    }
     if(ampm == 'AM'){
      $scope.SelectedTime =hour1 + ':'+ selectedTime.getUTCMinutes() + ' '+ampm;
    }
      }
    },
   // inputTime: 50400,   //Optional
    format: 12,   
    // inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),      //Optional
    step: 1,           //Optional
    setLabel: 'Set' 
  };
  
  ionicTimePicker.openTimePicker(ipObj1);
}
$scope.CheckInternet = function(){
      if(!navigator.onLine){
        $scope.showToast("No Internet! Please try again");  
      }
      else{
        $state.go(localStorage.getItem('lastView'));
      }
    };
  
});
