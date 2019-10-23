angular.module('starter.controllers')
.controller('VideoController', function($cordovaCamera,$scope,$state, $ionicPlatform, $ionicHistory, $location,$ionicPlatform,$location,$ionicLoading,$http,$filter,$cordovaToast) {

// document.getElementById('myVideo').addEventListener('ended',myHandler,false);
//    function myHandler(e) {
//      $state.go('FirstPage');    
//    }   

$scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
      })
};

$scope.hide = function(){
      $ionicLoading.hide().then(function(){       
      });
};

$scope.ViewPatientHelathHistory = function(){
  $state.go('PatientHealthHistory_call');
}

var session = OT.initSession(apiKey, sessionId);
var publisher;
var cameraPosition = 'environment';

$scope.GoBacktoHome = function(){
  var elem  = document.getElementById('publisher');
  elem.style.border = '5px solid transparent';
  $state.go('app.DoctorsHome');
}

$scope.GoBacktoMain = function(){
  $state.go('app.mainpage');
}


$scope.Call = function(){
   var elem  = document.getElementById('publisher');
   elem.style.border = '5px solid #ffffff';
  $http({
        method:"post",
        url:'http://68.183.101.193/android/338/sendNotificationtoPatient.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_DocId : localStorage.getItem("UserIdKey"),
          Angular_UserId : localStorage.getItem("VideoCallPatientId"),
          Angular_DocName : localStorage.getItem("FirstNameKey")
        }
        }).success(function(data){
         console.log(data);
         $scope.u_name = localStorage.getItem("VideoUserName")
         initializeSession();
         $ionicLoading.hide();
        }) 
}

$scope.Accept = function(){
  initializeSession1();
  $scope.u_name = localStorage.getItem("VideoUserName")
}

$scope.EndCall = function(){
  var id = localStorage.getItem("ConnectionId");
  session.disconnect();

  if(localStorage.getItem("is_doctor") == 0){
     $ionicLoading.hide();
   $state.go('ratedoctorvideocall');
 }

  if(localStorage.getItem("is_doctor") == 1){
   $state.go('app.DoctorsHome');
 }

   $http({
        method:"post",
        url:'http://68.183.101.193/android/338/UpdateVideoCallEndStatus.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_DocId : localStorage.getItem("VideoCallDoctorId"),
          Angular_UserId : localStorage.getItem("UserIdKey")
        }
        }).success(function(data){
         console.log(data);
        }) 
}

 function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

 function initializeSession() {
  $scope.offAudio1 = true;
  $scope.offVideo1 = true;
  $scope.onAudio1 = false;
  $scope.onVideo1 = false;
  $scope.CallButoon = false;
  $scope.show();

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

session = OT.initSession(apiKey, sessionId);
var publisherProperties = {resolution: '1280x720'};
  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    console.log(event);
    console.log(event.stream.connection.connectionId);
    localStorage.setItem("ConnectionId",event.stream.connection.connectionId)

    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      videoSource : true

    }, handleError);

  });

  // Create a publisher
   publisher = OT.initPublisher('publisher' , {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);




$scope.Endcall = true;
  // Connect to the session
  session.connect(token, function(error) {
    console.log(error);
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
      $scope.Endcall = true;
      $scope.hide();
    }
  });

  session.addEventListener('sessionConnected', sessionConnectedHandler);
  session.addEventListener('sessionDisconnected', sessionDisconnectedHandler);
  session.addEventListener('connectionCreated', connectionCreatedHandler);
  session.addEventListener('connectionDestroyed', connectionDestroyedHandler);
  session.addEventListener('streamCreated', streamCreatedHandler);
  session.addEventListener('streamDestroyed', streamDestroyedHandler);
 
  function sessionConnectedHandler(event) {
    console.log(event);
      // Subscribe to all streams currently in the Session
      for (var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
      }
    }

  function streamCreatedHandler(event) {
      console.log(event);
      // Subscribe to the newly created streams
      for (var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
      }
    }

  function streamDestroyedHandler(event) {
      console.log(event);
      // $state.go("'"+localStorage.getItem("lastView")+ "'");
   
      session.disconnect();
      var d = document.getElementById("videos");
      var d_nested1 = document.getElementById("subscriber");
      var d_nested2 = document.getElementById("publisher");
      var throwawayNode = d.removeChild(d_nested1);
      var throwawayNode1 = d.removeChild(d_nested2);
      // This signals that a stream was destroyed. Any Subscribers will automatically be removed.
      // This default behaviour can be prevented using event.preventDefault()
      // event.preventDefault();
      for (var i = 0; i < event.streams.length; i++) {
        console.log("streamDestroyedHandler");

        console.log(event.streams[i]);
        if (event.streams[i].connection.connectionId == session.connection.connectionId) {
          // Our publisher just stopped streaming
          event.preventDefault(); // Don't remove the Publisher from the DOM.
        }
      }
         // session.cleanUpDom();
   if(localStorage.getItem("is_doctor") == 0){

    
     $state.go('ratedoctorvideocall');
      setTimeout(function(){ 
     // location.reload();
       }, 3000);
     
    }

   if(localStorage.getItem("is_doctor") == 1){
    
     $state.go('app.DoctorsHome');
      setTimeout(function(){ 
     // location.reload();
       }, 3000);
     

    }
    }

  function sessionDisconnectedHandler(event) {
      console.log(event);
      session.disconnect();
      
      // This signals that the user was disconnected from the Session. Any subscribers and publishers
      // will automatically be removed. This default behaviour can be prevented using event.preventDefault()
      //publisher = null;
      // event.preventDefault();
      if (event.streams) {
        for (var i = 0; i < event.streams.length; i++) {
          console.log("sessionDisconnectedHandler");
          console.log(event.streams[i]);
          removeStream(event.streams[i]);
        }
      }

       if(localStorage.getItem("is_doctor") == 0){
       
     $state.go('ratedoctorvideocall');
      setTimeout(function(){ 
     // location.reload();
       }, 3000);
     
     
    }

   if(localStorage.getItem("is_doctor") == 1){
    
     $state.go('app.DoctorsHome');
      setTimeout(function(){ 
     // location.reload();
       }, 3000);
     
     
    }
    }

  function connectionDestroyedHandler(event) {
      console.log(event);
      session.disconnect();
      // This signals that connections were destroyed
    }

  function connectionCreatedHandler(event) {
      console.log(event);
      // This signals new connections have been created.
    }

  function addStream(stream) {
      // Check if this is the stream that I am publishing, and if so do not publish.
      if (stream.connection.connectionId == session.connection.connectionId) {
        return;
      }
      var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
      subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
      document.getElementById("subscribers").appendChild(subscriberDiv);
      subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id);
    }

  function removeStream(stream) {
      //var subscriberDiv = document.getElementById(stream.streamId); // 
      //subscriberDiv.parentNode.removeChild(subscriberDiv)
      session.unsubscribe(stream)
      subscribers[stream.streamId] = null;
    }


$("#offAudio").on('click', function() {
console.log("offAudio");
publisher.publishAudio(false);
});
     
$("#onAudio").on('click', function() {
console.log("onAudio");
publisher.publishAudio(true);
});

$("#offVideo").on('click', function() {
console.log("offVideo");
publisher.publishVideo(false);
});

$("#onVideo").on('click', function() {
console.log("onVideo");
publisher.publishVideo(true);
});

$("#switchcamera").on('click', function() {
  console.log(publisher);
  //alert(publisher);
publisher.cycleVideo();

});

}

// $scope.switchcamera = function(){
// alert("back");
//   $scope.sender = true;
//   $scope.receiver = true;
// }

$scope.off = function(){
  var options = {subscribeToAudio:false, subscribeToVideo:false};

// Replace stream and replacementElementId with your own values:
subscriber = session.subscribe(options);


 subscriber.setAudioVolume(0);
}

session.on("sessionDisconnected", function(event) {
     // alert("The session disconnected. " + event.reason);
 });




function initializeSession1() {
  $scope.offAudio1 = true;
  $scope.offVideo1 = true;
  $scope.onAudio1 = false;
  $scope.onVideo1 = false;
  $scope.show();

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
var publisherProperties = {resolution: '1280x720'};
  session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    console.log(event);
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
   publisher = OT.initPublisher('publisher' , {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);



  // Connect to the session
  $scope.Endcall = true;
  session.connect(token, function(error) {
     console.log(error);
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
      $scope.hide();
      $scope.Endcall = true;
      // var RandomId = Math.floor(1000 + Math.random() * 9000);
      // localStorage.setItem("RandomId",RandomId);
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/UpdateVideoCallStatus.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data: {
          Angular_DocId : localStorage.getItem("VideoCallDoctorId"),
          Angular_UserId : localStorage.getItem("UserIdKey")
        }
        }).success(function(data){
         console.log(data);
        })  

      
    }
  });

  session.addEventListener('sessionConnected', sessionConnectedHandler);
  session.addEventListener('sessionDisconnected', sessionDisconnectedHandler);
  session.addEventListener('connectionCreated', connectionCreatedHandler);
  session.addEventListener('connectionDestroyed', connectionDestroyedHandler);
  session.addEventListener('streamCreated', streamCreatedHandler);
  session.addEventListener('streamDestroyed', streamDestroyedHandler);
 
  function sessionConnectedHandler(event) {
    console.log(event);
      // Subscribe to all streams currently in the Session
      for (var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
      }
    }

  function streamCreatedHandler(event) {
      console.log(event);
      // Subscribe to the newly created streams
      for (var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
      }
    }

  function streamDestroyedHandler(event) {
      console.log(event);
      session.disconnect();
      // $state.go("'"+localStorage.getItem("lastView")+ "'");
      // session.cleanUpDom();
   if(localStorage.getItem("is_doctor") == 0){    
     $state.go('ratedoctorvideocall');
     // location.reload();
     
    }

   if(localStorage.getItem("is_doctor") == 1){
   
     $state.go('app.DoctorsHome');
      // location.reload();
     
    }

      var d = document.getElementById("videos");
      var d_nested1 = document.getElementById("subscriber");
      var d_nested2 = document.getElementById("publisher");
      var throwawayNode = d.removeChild(d_nested1);
      var throwawayNode1 = d.removeChild(d_nested2);
      // This signals that a stream was destroyed. Any Subscribers will automatically be removed.
      // This default behaviour can be prevented using event.preventDefault()
      // event.preventDefault();
      for (var i = 0; i < event.streams.length; i++) {
        console.log("streamDestroyedHandler");

        console.log(event.streams[i]);
        if (event.streams[i].connection.connectionId == session.connection.connectionId) {
          // Our publisher just stopped streaming
          event.preventDefault(); // Don't remove the Publisher from the DOM.
        }
      }
    }

  function sessionDisconnectedHandler(event) {
     console.log(event);
     session.disconnect();
     if(localStorage.getItem("is_doctor") == 0){
     
     $state.go('ratedoctorvideocall');
      // location.reload();
     
    }

   if(localStorage.getItem("is_doctor") == 1){
    
     $state.go('app.DoctorsHome');
     // location.reload();
     
    }
      // This signals that the user was disconnected from the Session. Any subscribers and publishers
      // will automatically be removed. This default behaviour can be prevented using event.preventDefault()
      //publisher = null;
      event.preventDefault();
      if (event.streams) {
        for (var i = 0; i < event.streams.length; i++) {
          console.log("sessionDisconnectedHandler");
          console.log(event.streams[i]);
          removeStream(event.streams[i]);
        }
      }
    }

  function connectionDestroyedHandler(event) {
      console.log(event);
    session.disconnect();
      // This signals that connections were destroyed
    }

  function connectionCreatedHandler(event) {
      console.log(event);
      // This signals new connections have been created.
    }

  function addStream(stream) {
      // Check if this is the stream that I am publishing, and if so do not publish.
      if (stream.connection.connectionId == session.connection.connectionId) {
        return;
      }
      var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
      subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
      document.getElementById("subscribers").appendChild(subscriberDiv);
      subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id);
    }

  function removeStream(stream) {
      //var subscriberDiv = document.getElementById(stream.streamId); // 
      //subscriberDiv.parentNode.removeChild(subscriberDiv)
      session.unsubscribe(stream)
      subscribers[stream.streamId] = null;
    }

$("#offAudio").on('click', function() {
console.log("offAudio");
publisher.publishAudio(false);


});
     
$("#onAudio").on('click', function() {
console.log("onAudio");
publisher.publishAudio(true);

});

$("#offVideo").on('click', function() {
console.log("offVideo");
publisher.publishVideo(false);

});

$("#onVideo").on('click', function() {
console.log("onVideo");
publisher.publishVideo(true);

});



}

$scope.switch = function(){
console.log("switch")
$(".switch-camera").click(function(){
publisher.setCameraPosition("back"); //or "back"
});
}

$scope.offAudio = function(){
$scope.offAudio1 = false;
$scope.onAudio1 = true;
}

$scope.onAudio = function(){
$scope.onAudio1 = false;
$scope.offAudio1 = true;
}


$scope.offVideo = function(){
$scope.offVideo1 = false;
$scope.onVideo1 = true;
}

$scope.onVideo = function(){
$scope.onVideo1 = false;
$scope.offVideo1 = true;
}



$scope.$on('$ionicView.enter', function () {
 var path = $location.path();
if (path == '/video_call') {
   var elem  = document.getElementById('publisher');
   elem.style.border = '5px solid transparent';
  clearTimeout(myVar);
 if(localStorage.getItem("is_doctor") == 0){
  $scope.u_name = localStorage.getItem("VideoUserName");
   var elem  = document.getElementById('publisher');
   elem.style.border = '5px solid #ffffff';
   initializeSession1();
 }
}
 if(localStorage.getItem("is_doctor") == 1){
  $scope.CallButoon = true;
 }

  });

$scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional 
        iconOff: 'ion-ios-star-outline',   //Optional 
        iconOnColor: '#50A0FF',  //Optional 
        iconOffColor:  '#1565C0',    //Optional 
        rating:  0, //Optional 
        minRating:0,    //Optional 
        readOnly: true, //Optional 
        callback: function(rating, index) {    //Mandatory 
          $scope.ratingsCallback(rating, index);
        }
      };
  
$scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
        localStorage.setItem("Rating",rating);
      };

$scope.GetUserReview = function(){
  
    $scope.show($ionicLoading);
    $http({
            method: "post",
            url:'http://68.183.101.193/android/338/CheckVideoCallRattingUser.php',
            data: {
              'UserId' : localStorage.getItem("UserIdKey"),
              'Angular_DoctoreId1':localStorage.getItem("VideoCallDoctorId")            
            },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
           console.log(data);
          $scope.hide($ionicLoading);
          localStorage.removeItem("Rating")
          $scope.ProfilePic = data[0].profile;
          $scope.name1 = data[0].name;
          $scope.name2 = data[0].lname;
         
         // $scope.Comment = data[0].video_review;
          $scope.Rate = data[0].total;
          if($scope.Rate == undefined){
            console.log('1');
            $scope.Rate = 0;
          }else{
            console.log('2');
            $scope.Rate = data[0].total;
          }
          $scope.ratingsObject = {
          iconOn: 'ion-ios-star',    //Optional 
          iconOff: 'ion-ios-star-outline',   //Optional 
          iconOnColor: 'rgb(200, 200, 100)',  //Optional 
          iconOffColor:  'rgb(200, 100, 100)',    //Optional 
          rating:   $scope.Rate, //Optional 
          minRating:1,    //Optional 
          readOnly: true, //Optional 
          callback: function(rating, index) {    //Mandatory 
            $scope.ratingsCallback(rating, index);
          }
        };
        })
}

$scope.SaveReview=function(Comment,total){
      var UserId= localStorage.getItem("UserIdKey");
      var Ratting=localStorage.getItem("Rating");
    
      var DoctoreId1=localStorage.getItem("VideoCallDoctorId");
      var CurrentDate = $filter('date')(new Date(), 'dd, MMMM yyyy');

      if(angular.isUndefined(Comment)){
        $cordovaToast.show('Please Write Review', 'short', 'center');
      }else if(Ratting == null &&  $scope.Rate ==  ''){
        $cordovaToast.show('Please Select Star', 'short', 'center');
      }
      else{
        $scope.show($ionicLoading);  
        $http({
            method: "post",
            url:'http://68.183.101.193/android/338/SaveVideoCallReview.php',
            data: {
              'Angular_UId' : localStorage.getItem("UserIdKey"),
              'Angular_Review': Comment,
              'Angular_Rate':Ratting,
              'Angular_DoctoreId1':DoctoreId1
            },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
        console.log(data);          
        if(data == 'sucess'){
        $scope.hide($ionicLoading);       
        $state.go('app.mainpage');
         $cordovaToast.show('Review Submitted', 'short', 'center');
        }
        else{
          $cordovaToast.show('server error. Please try after sometime', 'short', 'center');
          }              
        })
}
}

});