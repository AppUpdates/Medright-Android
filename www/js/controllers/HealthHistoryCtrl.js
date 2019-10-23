angular.module('starter.controllers')

  .controller("HealthHistoryCtrl",function($scope,$state,$ionicSideMenuDelegate,$http,
               $ionicPlatform, $ionicHistory, $location, $ionicLoading,$filter){
   

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
      window.plugins.toast.show(msg, 'short', 'center')       
  };
  

  $scope.ExerciseItemUncheck1 = function(){
     $scope.historyData.regularly = false;
  }
  $scope.ExerciseItemUncheck2 = function(){
     $scope.historyData.occasionally = false;
  }

  $scope.ItemUncheck3 = function(){
    $scope.historyData.hiv_no = false; 
  }

  $scope.ItemUncheck4 = function(){
    $scope.historyData.hiv_yes = false; 
  }

  $scope.viewList = function(type){
   localStorage.setItem('form_id',  $scope.history_form_id_app);
   localStorage.setItem('form_type',  type);
   
   $state.go('HistoryList');
   
  }

  $scope.GoBack = function(){
    if(localStorage.getItem("is_doctor" == 0)){
    $state.go('HealthHistory');
    localStorage.removeItem('form_id');
    localStorage.removeItem('form_type');
  }
  if(localStorage.getItem("is_doctor") == 1){
     $state.go('PatientHealthHistory');
  }
  }

  $scope.GoBacktoHome = function(){
    $state.go('app.mainpage');
  }

  $scope.goBackToVideoCall = function(){
    $state.go('video_call');
  }

  $scope.goBackToMain=function(){
     $state.go('AppointmentDetail');
  }

  $scope.checkExcercise = function(){
    if($scope.historyData.excercise == 'No'){
     $scope.showExcerciseDesc = false;
    }
    else{
    $scope.showExcerciseDesc = true;
    }
  }

  $scope.$on('$ionicView.loaded', function(){

  var absUrl = $location.url();
  
  if(absUrl == '/HealthHistory'){

   $scope.loadHealthHistory(localStorage.getItem('UserIdKey'));
  }

  else if(absUrl == '/PatientHealthHistory'){
   $scope.loadHealthHistory(localStorage.getItem('UserId11'));
  }

  else if(absUrl == '/PatientHealthHistory_call'){
   $scope.loadHealthHistory(localStorage.getItem('VideoCallPatientId'));
  }

  else if(absUrl == '/HistoryList'){
   $scope.loadHistoryList();
  }

   
})

  $scope.loadHealthHistory = function(id){
  
  $scope.historyData = {};
  $scope.historyData.name = localStorage.getItem("FirstNameKey")+' '+localStorage.getItem('LastNameKey');
  $scope.show($ionicLoading);

  $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetHealthHistory.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            user_id: id,
          }
        }).success(function(data){
           console.log(data);
           $scope.hide($ionicLoading);
           if(data == ''){
            $scope.NoData = '';
            $scope.historyData.name = localStorage.getItem("AppointmentPatientName");
            $scope.history_form_id_app = null;
            $scope.History1 = false;
            $scope.History2 = false;
            $scope.History3 = false;
            $scope.History4 = false;
           }
           else{
            $scope.NoData = 'Data';
            $scope.history_form_id_app = data[0].id;

            $scope.historyData.name = data[0].name;
            $scope.historyData.gender = data[0].gender;
            $scope.historyData.dob = new Date(data[0].dob);

            $scope.historyData.merital_status = data[0].merital_status;

            $scope.historyData.ref_doctor = data[0].ref_doctor;
            $scope.historyData.date_of_exam = new Date(data[0].date_of_exam);
            $scope.historyData.emergency_phone = data[0].emergency_contact;

            $scope.historyData.childhood_illness = data[0].childhood_illness;

            $scope.historyData.excercise = data[0].is_excercise;
           
            $scope.historyData.alcohol = data[0].is_alcohol;
            $scope.historyData.no_of_drinks = data[0].drinks_per_week;

            $scope.historyData.tobacco = data[0].is_tobacco;

            $scope.historyData.sex_active = data[0].sex_active;

            if(data[0].is_hiv == 0){
            $scope.historyData.hiv_no = true;
            $scope.historyData.hiv_yes = false;
            }

            if(data[0].is_hiv == 1){
            $scope.historyData.hiv_no = false;
            $scope.historyData.hiv_yes = true;
            }

            if(data[0].excercise_description == 1){
            $scope.historyData.occasionally = true;
            $scope.historyData.regularly = false;
            }

            if(data[0].excercise_description == 2){
            $scope.historyData.occasionally = false;
            $scope.historyData.regularly = true;
            }

            if(data[0].is_excercise == 'Yes'){
            $scope.showExcerciseDesc = true;
            }

            if(data[0].is_excercise == 'No'){
            $scope.showExcerciseDesc = false;
            }
            
            $scope.getCount(data[0].id);
         }

          
     })  
            

  }

  $scope.getCount = function(id){
   $http({
          method:'post',
          url:'http://68.183.101.193/android/338/getHistoryCount.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            form_id: id,
          }
        }).success(function(data){
          console.log(data)
          $scope.SurgeryCounter = data.result[0].SurgeryCounter;
          $scope.HopitalizationCounter = data.result[0].HopitalizationCounter;
          $scope.DrugsCounter = data.result[0].DrugsCounter;
          $scope.AllergiesCounter = data.result[0].AllergiesCounter;

          if($scope.SurgeryCounter != 0){
          $scope.History1 = true;
          }
          if($scope.HopitalizationCounter != 0){
          $scope.History2 = true;
          }  
          if($scope.DrugsCounter != 0){
          $scope.History3 = true;
          }  
          if($scope.AllergiesCounter != 0){
          $scope.History4 = true;
          }  
          $scope.hide($ionicLoading);
       })   
  }

  $scope.loadHistoryList = function(){

    $scope.show($ionicLoading);
    var form_type = localStorage.getItem('form_type');
    
    if(form_type == 1){
     $scope.title = 'Surgeries';
     $scope.type =1;
    }
    if(form_type == 2){
     $scope.title = 'Hospitalizations';
     $scope.type =2;
    }
    if(form_type == 3){
     $scope.title = 'Drugs';
     $scope.type =3;
    }
    if(form_type == 4){
     $scope.title = 'Allergies';
     $scope.type =4;
    }

     $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GethHistoryDetails.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            form_id: localStorage.getItem('form_id'),
            type: form_type
          }
        }).success(function(data){
          $scope.hide($ionicLoading);
          $scope.HealthDetails = data;
       })   
  }

  $scope.updateHealthHistory = function(){
  if($scope.historyData.name == undefined){
  $scope.showToast("Name cannot be empty");
  }

  if(($scope.historyData.surgerie_year != undefined) || ($scope.historyData.surgerie_reason != undefined) || ($scope.historyData.surgerie_hospital != undefined)){
        if(($scope.historyData.surgerie_year == undefined) || ($scope.historyData.surgerie_reason == undefined) || ($scope.historyData.surgerie_hospital == undefined)){
        alert("Fill all the fields of Surgery section");
        return;
        }
  }

  if(($scope.historyData.hospitalizations_year != undefined) || ($scope.historyData.hospitalizations_reason != undefined) || ($scope.historyData.hospitalizations_hospital != undefined)){
      if(($scope.historyData.hospitalizations_year == undefined) || ($scope.historyData.hospitalizations_reason == undefined) || ($scope.historyData.hospitalizations_hospital == undefined)){
       alert("Fill all the fields of Hospitalizations section");
       return;
      }
  }

  if(($scope.historyData.drug_name != undefined) || ($scope.historyData.drug_frequency != undefined)){
    if(($scope.historyData.drug_name == undefined) || ($scope.historyData.drug_frequency == undefined)){
    alert("Fill all the fields of Drug section");
    return;
    }
  }

  if(($scope.historyData.drug_name_allergies != undefined) || ($scope.historyData.drug_reaction != undefined)){
    if(($scope.historyData.drug_name_allergies == undefined) || ($scope.historyData.drug_reaction == undefined)){
    alert("Fill all the fields of Allergies section");
    return;
    }
  }


    if($scope.historyData.occasionally == true){
      var excercise_desc = 1;
    }
    if($scope.historyData.regularly == true){
      var excercise_desc = 2;
    }
    if($scope.historyData.hiv_no == true){
      var isHiv = 0;
    }
    if($scope.historyData.hiv_yes == true){
      var isHiv = 1;
    }
  
  var current_date = $filter('date')(new Date(), 'dd MMMM, yyyy');
  var current_time = $filter('date')(new Date(), 'hh:mm a');


  $scope.show($ionicLoading);

   $http({
          method:'post',
          url:'http://68.183.101.193/android/338/UpdateHealthHistory.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            user_id: localStorage.getItem('UserIdKey'),

            name: $scope.historyData.name,
            gender: $scope.historyData.gender,
            dob: $scope.historyData.dob,
            merital_status: $scope.historyData.merital_status,

            ref_doctor: $scope.historyData.ref_doctor,
            date_of_exam: $scope.historyData.date_of_exam,
            emergency_phone: $scope.historyData.emergency_phone,

            childhood_illness: $scope.historyData.childhood_illness,
            surgerie_year: $scope.historyData.surgerie_year,
            surgerie_reason: $scope.historyData.surgerie_reason,
            surgerie_hospital: $scope.historyData.surgerie_hospital,

            hospitalizations_year: $scope.historyData.hospitalizations_year,
            hospitalizations_reason: $scope.historyData.hospitalizations_reason,
            hospitalizations_hospital: $scope.historyData.hospitalizations_hospital,

            drug_name: $scope.historyData.drug_name,
            drug_frequency: $scope.historyData.drug_frequency,

            drug_name_allergies: $scope.historyData.drug_name_allergies,
            drug_reaction: $scope.historyData.drug_reaction,

            excercise: $scope.historyData.excercise,
            excercise_desc: excercise_desc,

            alcohol: $scope.historyData.alcohol,
            no_of_drinks: $scope.historyData.no_of_drinks,

            tobacco: $scope.historyData.tobacco,

            sex_active: $scope.historyData.sex_active,
            hiv_yes: isHiv,

            current_date: current_date,
            current_time: current_time,

            history_form_id_app: $scope.history_form_id_app 
          }
        }).success(function(data){
           console.log(data);
           $scope.hide($ionicLoading);
           $scope.showToast("Form updated");
           $state.go('app.mainpage');
     })
  } 
 });
