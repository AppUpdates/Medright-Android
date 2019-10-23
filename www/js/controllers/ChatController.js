angular.module('starter.controllers')


.controller('ChatController', function($scope,$state, $interval, $ionicPlatform, $rootScope, $ionicActionSheet, $ionicHistory, $location, $ionicLoading, $http) {

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      })
    };


$scope.hide = function(){
      $ionicLoading.hide().then(function(){
       
      });
    };

$scope.GoBack=function(){
      $ionicHistory.goBack();
    };

$scope.$on( "$ionicView.loaded", function( scopes, states ) { 
 if(states.stateName == "video_time") {
          clearTimeout(myVar);
          video_time_counter = true;
          $scope.InitProgress();
      
          $scope.SendNotification();
  }
})



  // interval = $interval(function() {
  //   $scope.save();
  // }, 20000);
  // $interval.cancel(interval);


$scope.InitProgress = function(){
  countdown( "countdown", 15, 0 );
}

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, time;
    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {


        msLeft = endTime - (+new Date);
      
        if ( msLeft < 5000 && video_time_counter == true) {
            // element.innerHTML = "countdown's over!";
             navigator.notification.confirm("Doctor is unavailable at this moment. Please try after some time!", function(buttonIndex) {
             switch(buttonIndex) {
             case 1:
             $state.go('personaldoctors');
             break;
         }
        }, "", [ "Okay"]);
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            myVar = setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
    
}  

$scope.SendNotification = function(){
    $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetAvailableDoctor2.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_UserId : localStorage.getItem("UserIdKey"),
          Angular_PatientName : localStorage.getItem("FirstNameKey")
        }
        }).success(function(data){
         console.log(data);


        $http({
        method:"post",
        url:'http://68.183.101.193/android/338/AddEntryVideoCall.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_UserId : localStorage.getItem("UserIdKey")
        }
        }).success(function(data){
         console.log(data);
        })
        })

      }

$scope.GoToVideoVisit = function(){
  $state.go('video_time');
}

 $scope.LoadDoctors = function(){
   clearTimeout(myVar);
 	  $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetFreeDoctors.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_CityName:localStorage.getItem('CityNameKey'),
          Angular_UserId:localStorage.getItem('UserIdKey')
        }
      }).success(function(data){
         console.log(data);
         $scope.LoadPersonalDoctors();
         if(data == ''){
          $scope.WithData = false;
          $scope.NoData = true;
         }
         else{
          $scope.NoData = false;
          $scope.WithData = true;
          $scope.AvailableDoctors = data; 	
         }
      }) 	  
 }

$scope.LoadPersonalDoctors = function(){
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetPersonalDoctorList.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          UserId:localStorage.getItem('UserIdKey')
        }
      }).success(function(data){
         console.log(data);
         $scope.hide();
          if(data == ''){
          $scope.WithData1 = false;
          $scope.NoData1 = true;
         }
         else{
          $scope.NoData1 = false;
          $scope.WithData1 = true;
          $scope.PersonalDoctors = data; 	
         }         
     })   
 }

$scope.OpenCall  =  function(){
  var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: 'Police'},
            { text: 'Fire Department'},
            { text: 'Ambulance '}           
         ],
         titleText: 'Select calling option',
         cancelText: 'Cancel',      
         cancel: function() {
            // add cancel code...
         },      
         buttonClicked: function(index) {
            if(index === 0) {
              window.plugins.CallNumber.callNumber(onSuccess, onError, 191, false);
            }
        
            if(index === 1) {
             window.plugins.CallNumber.callNumber(onSuccess, onError, 192, false);
            }

             if(index === 2) {
             window.plugins.CallNumber.callNumber(onSuccess, onError, 193, false);
            }
         },
      
         destructiveButtonClicked: function() {
            // add delete code..
         }
      });
 }

function onSuccess(result){
  console.log("Success:"+result);
}
 
function onError(result) {
  console.log("Error:"+result);
}

$scope.VideoChat = function(doc_id, name, profile){
      var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: 'Urgent Medical Concern'},
            { text: 'Non-Urgent Medical Concern'}
           
         ],
         titleText: 'What would you like to talk about?',
         cancelText: 'Cancel',      
         cancel: function() {
            // add cancel code...
         },      
         buttonClicked: function(index) {
            if(index === 0) {
               // add edit 1 code
               $scope.OpenCall();
            }
        
            if(index === 1) {
              $state.go('video_time');
              $rootScope.doctor_profile = profile;
              $rootScope.doctor_name = name;
              $rootScope.doctor_id = doc_id;
            }
         },      
         destructiveButtonClicked: function() {
            // add delete code..
         }
      });
} 
});