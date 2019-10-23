angular.module('starter.controllers')

.controller('MedicationCtrl', function($scope,ionicToast,GetDoctorMedicationRecords,GetPatientMedicationRecords, $state, $ionicPlatform, $ionicHistory, $location,  $rootScope, $ionicSideMenuDelegate,$http,
       $ionicLoading,$filter){

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

$scope.GoBack=function(){
      $ionicHistory.goBack();
    };

$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/DoctorMedication') {
    console.log("exit");
    $state.go('app.DoctorsHome');    
  } else {
    $scope.GoBack();
  }
}, 100);


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
        })
      }

$scope.SaveMedication = function(patient,MedicationName,Dosage,Frequency){
  if(patient == undefined){
   window.plugins.toast.show('You dont have any patient to write medication', 'short', 'center') ; 
  }
  else if(MedicationName == undefined){
   window.plugins.toast.show('Please Enter Medication Name', 'short', 'center') ; 
  }
  else if(Dosage == undefined){
    window.plugins.toast.show('Please Add Dosage', 'short', 'center') ;
  }
  else if(Frequency == undefined){
    window.plugins.toast.show('Please Add Frequency', 'short', 'center') ;
  }
  else{
    var CreatedDate = $filter('date')(new Date(),'MMMM dd, yyyy');
    var CreatedTime = $filter('date')(new Date(),'hh:mm a');
    $scope.show($ionicLoading);
    $http({
          method:'post',
          url:'http://68.183.101.193/android/338/SaveMedication.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_UserId:localStorage.getItem('UserIdKey'),
            Angular_patientId: patient.UserId,
            Angular_MedicationName: MedicationName,
            Angular_Frequency: Frequency,
            Angular_Dosage: Dosage,
            Angular_CreatedDate:CreatedDate,
       }
        }).success(function(data){
          $scope.hide($ionicLoading);
          $state.go('app.DoctorsHome');
          window.plugins.toast.show('Medication sent to patient!', 'short', 'center') ;
      })    
  }
 }

$scope.has_more_MedicationList = true;
$scope.getMedication = function(){
  $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetMedication.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey"))
        }
      }).success(function(MedicationList){
        console.log(MedicationList);
        $scope.hide();

        if(MedicationList == ''){
          $scope.NoData = true;
          $scope.WithData = false;
        }
        else{
          $scope.WithData = true;
          $scope.NoData = false;
          $scope.MedicationList = [];
          for(var i=0;i<MedicationList.length;i++){            
           var n = $filter('date')(new Date(MedicationList[i].created_on),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            var MonthYear = $filter('date')(new Date(MedicationList[i].created_on),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' + MonthYear;

            $scope.MedicationList.push({
                DocId :MedicationList[i].DocId,
                Dosage :MedicationList[i].Dosage,
                Frequency :MedicationList[i].Frequency,
                MedicationId :MedicationList[i].MedicationId,
                DateDay :$scope.date,
                Medication_Name :MedicationList[i].Medication_Name,
                UserId :MedicationList[i].UserId,
                created_by :MedicationList[i].created_by,
                created_on :MedicationList[i].created_on,
                deleted :MedicationList[i].deleted,
                doc_id :MedicationList[i].doc_id,
                email :MedicationList[i].email,
                modified_by :MedicationList[i].modified_by,
                modified_on :MedicationList[i].modified_on,
                name :MedicationList[i].name,
                profile :MedicationList[i].profile    
              });
          }
        }       
      });
 }


$scope.PageNumber=1;
$scope.LoadMoreMedicationRecords = function(page){
    console.log(page);
    $scope.PageNumber = page+1;
    GetPatientMedicationRecords.GetProjects($scope.PageNumber,Number(localStorage.getItem("UserIdKey"))).then(function(TestResult) {
     if (MedicationList.length == 0) {
              // $scope.has_more_MedicationList = false;
              // $scope.ShowSpinner = false;
              // ionicToast.show('No more records found!', 'bottom', false, 1700);
      }          
  else{ 
    $scope.ShowSpinner = true;
    $scope.MedicationList1 = [];
    for(var i=0;i<MedicationList.length;i++){            
           var n = $filter('date')(new Date(MedicationList[i].created_on),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            var MonthYear = $filter('date')(new Date(MedicationList[i].created_on),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' + MonthYear;

            $scope.MedicationList1.push({
                DocId :MedicationList[i].DocId,
                Dosage :MedicationList[i].Dosage,
                Frequency :MedicationList[i].Frequency,
                MedicationId :MedicationList[i].MedicationId,
                DateDay :$scope.date,
                Medication_Name :MedicationList[i].Medication_Name,
                UserId :MedicationList[i].UserId,
                created_by :MedicationList[i].created_by,
                created_on :MedicationList[i].created_on,
                deleted :MedicationList[i].deleted,
                doc_id :MedicationList[i].doc_id,
                email :MedicationList[i].email,
                modified_by :MedicationList[i].modified_by,
                modified_on :MedicationList[i].modified_on,
                name :MedicationList[i].name,
                profile :MedicationList[i].profile    
              });
          }
    $scope.MedicationList = $scope.MedicationList.concat($scope.MedicationList1);
    console.log($scope.MedicationList);
    $scope.$broadcast('scroll.infiniteScrollComplete'); 
  }
  });
  };

$scope.GoToRefill = function(email,MedicationName,Datee,DocId){
     $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/SendMedicationMail.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_DocId:DocId,
          Angular_Name:localStorage.getItem("FirstNameKey"),
          Angular_Email:email,
          Angular_MedicationName:MedicationName,
          Angular_Date:Datee
        }
      }).success(function(data){
        console.log(data);
        $scope.hide();
        window.plugins.toast.show('Refill Medication notification sent to doctor!', 'short', 'center') ;
      });
 }

 $scope.MedicationList = function(){
  $state.go('DoctorMedicationList');
 }

$scope.has_more_DoctorMedicationList = true;
 $scope.GetDoctorMedication = function(){
   $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetDoctorMedicationList.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_UserId:Number(localStorage.getItem("UserIdKey"))
        }
      }).success(function(DoctorMedicationList){
        console.log(DoctorMedicationList);
        $scope.hide();

        if(DoctorMedicationList == ''){
          $scope.NoData = true;
          $scope.WithData = false;
        }
        else{
          $scope.WithData = true;
          $scope.NoData = false;
          $scope.DoctorMedicationList = [];
          for(var i=0;i<DoctorMedicationList.length;i++){            
           var n = $filter('date')(new Date(DoctorMedicationList[i].created_on),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            var MonthYear = $filter('date')(new Date(DoctorMedicationList[i].created_on),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' + MonthYear;

            $scope.DoctorMedicationList.push({
                DocId :DoctorMedicationList[i].DocId,
                Dosage :DoctorMedicationList[i].Dosage,
                FirstName :DoctorMedicationList[i].FirstName,
                Frequency :DoctorMedicationList[i].Frequency,
                DateDay :$scope.date,
                LastName :DoctorMedicationList[i].LastName,
                MedicationId :DoctorMedicationList[i].MedicationId,
                Medication_Name :DoctorMedicationList[i].Medication_Name,
                UserId :DoctorMedicationList[i].UserId,
                created_by :DoctorMedicationList[i].created_by,
                created_on :DoctorMedicationList[i].created_on,
                deleted :DoctorMedicationList[i].deleted,
                email :DoctorMedicationList[i].email,
                modified_on :DoctorMedicationList[i].modified_on,
                modified_by :DoctorMedicationList[i].modified_by,
                profile :DoctorMedicationList[i].profile    
              });
          }
        }       
      });
 }

$scope.PageNumber=1;
$scope.LoadMoreDoctorMedication = function(page){
    console.log(page);
    $scope.PageNumber = page+1;
    GetDoctorMedicationRecords.GetProjects($scope.PageNumber,Number(localStorage.getItem("UserIdKey"))).then(function(DoctorMedicationList) {
    if (DoctorMedicationList.length == 0) {
              // $scope.has_more_DoctorMedicationList = false;
              // $scope.ShowSpinner = false;
              // ionicToast.show('No more records found!', 'bottom', false, 1700);
      }          
  else{ 
    $scope.ShowSpinner = true;
    $scope.DoctorMedicationList1 = [];
    for(var i=0;i<DoctorMedicationList.length;i++){            
           var n = $filter('date')(new Date(DoctorMedicationList[i].created_on),'d');
            $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            var MonthYear = $filter('date')(new Date(DoctorMedicationList[i].created_on),'MMMM, yyyy');
            $scope.date = $scope.Day + ' ' + MonthYear;

            $scope.DoctorMedicationList1.push({
                DocId :DoctorMedicationList[i].DocId,
                Dosage :DoctorMedicationList[i].Dosage,
                FirstName :DoctorMedicationList[i].FirstName,
                Frequency :DoctorMedicationList[i].Frequency,
                DateDay :$scope.date,
                LastName :DoctorMedicationList[i].LastName,
                MedicationId :DoctorMedicationList[i].MedicationId,
                Medication_Name :DoctorMedicationList[i].Medication_Name,
                UserId :DoctorMedicationList[i].UserId,
                created_by :DoctorMedicationList[i].created_by,
                created_on :DoctorMedicationList[i].created_on,
                deleted :DoctorMedicationList[i].deleted,
                email :DoctorMedicationList[i].email,
                modified_on :DoctorMedicationList[i].modified_on,
                modified_by :DoctorMedicationList[i].modified_by,
                profile :DoctorMedicationList[i].profile    
              });
          }
    $scope.DoctorMedicationList = $scope.DoctorMedicationList.concat($scope.DoctorMedicationList1);
    console.log($scope.DoctorMedicationList);
    $scope.$broadcast('scroll.infiniteScrollComplete');  
  }   
  });
  };



 $scope.DissmissMedication = function(MedicationId){
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/DismissMedicationList.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        data:{
          Angular_MedicationId:MedicationId
        }
      }).success(function(data){
        console.log(data);
        $scope.hide();
        $scope.GetDoctorMedication(); 
        window.plugins.toast.show('Dismiss Medication', 'short', 'center') ;       
      });
 }

});

