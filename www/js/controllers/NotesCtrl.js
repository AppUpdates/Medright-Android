angular.module('starter.controllers')

.controller("NotesCtrl",function($scope,$state,$rootScope,$ionicSideMenuDelegate,$ionicLoading,$http,$filter,$ionicPlatform, $ionicHistory, $location,$rootScope){
 
$scope.openMenu = function (){
    $ionicSideMenuDelegate.toggleLeft();
  };

$scope.show = function(){
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
  })
};

$scope.hide = function(){
      $ionicLoading.hide().then(function(){       
      });
};

$scope.MyNotes = function(){
  $state.go('MedicalRecord1');
}

$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/add_notes1') {
    console.log("exit");
    $state.go('app.DoctorsHome');    
  } else {
    $scope.GoBack();
  }
}, 100);


$scope.goBackToNotes = function(){
 $state.go('medicalrecords');
}

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.speech = {};
$scope.StartListening = function(){
var maxMatches = 1;
var promptString = "Speak now"; // optional
var language = "en-US";           // optional
window.plugins.speechrecognizer.startRecognize(function(result){

document.getElementById("spk").value = result.toString();
}, function(errorMessage){
    console.log("Error message: " + errorMessage);
}, maxMatches, promptString, language);
}

$scope.GetPatients = function(){
    $scope.show($ionicLoading);
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetPatients.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_UserId:localStorage.getItem('UserIdKey')
          }
        }).success(function(data){
          console.log(data)
          $scope.hide($ionicLoading);
          $scope.patient = data[0];
          $scope.plan1 = data;

          $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetNotesType.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
        }).success(function(data){
          console.log(data)
          $scope.hide($ionicLoading);
          $scope.selectedType = data[0];
          $scope.Type = data;   
      }) 
      })    
}

$scope.NotesData = {};
$scope.SaveNotes = function(patient,selectedType,visittype,test,notes){
 if(patient == undefined){
   window.plugins.toast.show('You dont have any patient to write notes', 'short', 'center') ; 
  }
 else if(selectedType == undefined){
   window.plugins.toast.show('Please select type', 'short', 'center') ; 
  }
  else if(visittype == undefined && selectedType.type_name == "Clinical Notes"){
   window.plugins.toast.show('Please enter visit type', 'short', 'center') ; 
  }

  else if(test == undefined && selectedType.type_name == "Lab Results"){
   window.plugins.toast.show('Please enter test name', 'short', 'center') ; 
  }

  else if(notes == undefined){
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
            Angular_patientId: patient.UserId,
            Angular_TestName: test,
            Angular_Notes: notes,
            Angular_CreatedDate:CreatedDate,
            Angular_CreatedTime: CreatedTime,
            Angular_Types : selectedType.type_id,
            Angular_VisitType : visittype
          }
        }).success(function(data){
          $scope.hide($ionicLoading);
          $scope.NotesData.test = '';
          $scope.NotesData.notes = '';
          $state.go('MedicalRecord1');
          window.plugins.toast.show('Notes sent to patient!', 'short', 'center') ;

      })    
  }
}

$scope.GetTypeId = function(selectedType){
  console.log(selectedType.type_name)
  if(selectedType.type_name == "Lab Results"){
    $scope.HideVisitType = true;
    $scope.ShowTestName = true;
  }
  if(selectedType.type_name == "Clinical Notes"){
    $scope.HideVisitType = false;
    $scope.ShowTestName = false;
  }

}


$scope.GetDetailNotes = function(){
    $scope.FName = localStorage.getItem("FirstNameKey");
    $scope.LName = localStorage.getItem("LastNameKey");
    $scope.MRN = localStorage.getItem("MRN");

    $scope.show($ionicLoading);
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetDetailNotes.php',
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
          var n = $filter('date')(new Date(data[0].CreatedDate),'d');
          $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');      
          var MonthYear = $filter('date')(new Date(data[0].CreatedDate),'MMMM, yyyy');
          $scope.date = $scope.Day + ' ' + MonthYear;    
      })
  } 

$scope.Print = function(MedicalRecords,FName,LName,visit_type,CreatedDate,TestName,docname,doclname,Notes){
var page1 = '<html><body background="img1/icon1.png" style="background-size: cover;"><center><image ></image><h1>'+ MedicalRecords +'</h1></center><h2>Patient</h2><p style="font-size: 25px;">'+ FName + LName +'</p><h2>Visit Type</h2><p style="font-size: 25px;">'+ visit_type +'</p><h2>Notes</h2><p style="font-size: 25px;">'+ Notes +'</p><h2>Date</h2><p style="font-size: 25px;">'+ CreatedDate  +'</p><h2>Physician</h2><p style="font-size: 25px;">'+ docname + doclname +'</p></body></html>';
var page2 = '<html><body background="img1/icon1.png" style="background-size: cover;"><center><h1>'+ MedicalRecords +'</h1></center><h2>Patient</h2><p style="font-size: 25px;">'+ FName + LName +'</p><h2>Test</h2><p style="font-size: 25px;">'+ TestName +'</p><h2>Notes</h2><p style="font-size: 25px;">'+ Notes +'</p><h2>Date</h2><p style="font-size: 25px;">'+ CreatedDate  +'</p><h2>Ordered By</h2><p style="font-size: 25px;">'+ docname + doclname +'</p></body></html>';
$scope.ShowNameMRN = true;
if(TestName == ''){
  cordova.plugins.printer.print(page1 , { duplex: 'long' }, function (res)  {
    // alert(res ? 'Done' : 'Canceled');
});
}

if(visit_type == ''){ 
  cordova.plugins.printer.print(page2 , { duplex: 'long' }, function (res)  {
    // alert(res ? 'Done' : 'Canceled');
});
}
}

});
