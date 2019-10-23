angular.module('starter.controllers')
  
.controller("MedicalRecordCtrl",function($scope,ionicToast,$rootScope,$state,ProjectService,$ionicSideMenuDelegate,$ionicLoading,$http,$ionicPlatform, $ionicHistory, $location, $filter,GetPatientMedicalRecords){

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

$scope.goHome = function(){
      $state.go('app.mainpage');
    }

$ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/medicalrecords') {
    console.log("exit");
      $state.go('app.mainpage');    
  } else {
    $scope.GoBack();
  }
}, 100);

$scope.hide = function(){
      $ionicLoading.hide().then(function(){       
      });
    };

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.loadCategory = function(){
      $scope.show();
      $http({
        method:"post",
        url:'http://68.183.101.193/android/338/GetMedicalCategories.php',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      }).success(function(data){
        $scope.hide();
        if(data.length!=0){
          $scope.RecordsList = data;
          $scope.hide();
        }
        else{
          $scope.showToast("No appointments");
          $scope.hide();
        }
      });

          $scope.show();
          $http({
            method:"post",
            url:'http://68.183.101.193/android/338/GetPersonalDoctors.php',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data:{
              Angular_CityName:localStorage.getItem('CityNameKey'),
              Angular_UserId:localStorage.getItem('UserIdKey'),
            }
          }).success(function(data){
             console.log(data);
            $scope.hide();
            $scope.DoctorsList = data;
            
          });
    };

$scope.submitRequest = function(SelectedDate1,SelectedDate2,Message,SelectedDoctorId,SelectedRecord){
      SelectedDate1 = $filter('date')(SelectedDate1,'dd-MMM-yy');
      SelectedDate2 = $filter('date')(SelectedDate2,'dd-MMM-yy');
      console.log(SelectedDate1,SelectedDate2,Message,SelectedDoctorId,SelectedRecord);    
      if(angular.isUndefined(SelectedDoctorId) || SelectedDoctorId == ""){
        $scope.showToast("Please select Doctor");
      }
      else{
        $scope.show();
        var RecordStr = "";
        var a = localStorage.getItem("RecordIdsKey").split(",");
        for(var i=0;i<a.length;i++){
          if(i==0){
            RecordStr = a[i];
          }
          else{
            RecordStr +=','+a[i];
          }
        }
        $http({
          method: "post",
          url:'http://68.183.101.193/android/338/RequestRecord.php',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_RecordId:RecordStr,
            Angular_DoctorId:SelectedDoctorId,
            Angular_UserId:Number(localStorage.getItem("UserIdKey")),
            Angular_StartDate:SelectedDate1,
            Angular_EndDate:SelectedDate2,
            Angular_Message:Message
          }
        }).success(function(data){
           $scope.hide();
           navigator.notification.confirm("Your request has been submitted successfully. You will be receive an email from admin of your medical records.", function(buttonIndex) {
                            switch(buttonIndex) {
                                case 1:
                                    console.log("Decline Pressed");
                                    break;
                             }
                           }, "", ["OK"])
        });
      }
    };

$scope.recordArr = [];
$scope.recordCheck = function(SelectedRecord,RecordId){
      console.log(SelectedRecord,RecordId);
      if(SelectedRecord){
        $scope.recordArr.push(RecordId);
      }
      else{
        var index = $scope.recordArr.indexOf(RecordId);
        if (index > -1) {
        $scope.recordArr.splice(index, 1);
        }
      }
      localStorage.setItem("RecordIdsKey",$scope.recordArr);
    };

$scope.goToCancel = function(){
      $state.go('app.doctors');
    }

$scope.GetTestResults = function(){
    $scope.show($ionicLoading);  
          $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetNotesType.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
        }).success(function(data){
          console.log(data)
          $scope.hide($ionicLoading);
          $scope.selectedType = data[0];
          $scope.Type = data;
          localStorage.setItem("TypeId",$scope.selectedType.type_id);
          $scope.GetMedicalRecord();
        })   
          $http({
          method:'post',
          url:'http://68.183.101.193/android/338/GetDoctorList.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            PatientId:localStorage.getItem('UserIdKey')
          }
        }).success(function(data){
          console.log(data)
          $scope.hide($ionicLoading);
          $scope.selectedDoctor = data[0];
          $scope.Doctor = data; 
      })  
  }

$scope.has_more_Record = true;
$scope.GetMedicalRecord = function(){
     $scope.show($ionicLoading);  
      $http({
          method:'post',  
          url:'http://68.183.101.193/android/338/GetTestResults.php',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          data:{
            Angular_UserId:localStorage.getItem('UserIdKey'),
            Angular_Type : localStorage.getItem('TypeId')
          }
        }).success(function(TestResult){
         console.log(TestResult)
         $scope.hide($ionicLoading);
         if(TestResult == ''){
         $scope.NoData = true;
         $scope.WithData = false;
         $scope.ShowFilter = false;
        }
        else{
         $scope.NoData = false;
         $scope.WithData = true;
         $scope.ShowFilter = true;
         $scope.TestResult = [];
         for(var i=0;i<TestResult.length;i++){            
           var n = $filter('date')(new Date(TestResult[i].CreatedDate),'d');
           $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
           var MonthYear = $filter('date')(new Date(TestResult[i].CreatedDate),'MMMM, yyyy');
           $scope.date = $scope.Day + ' ' + MonthYear;
           $scope.TestResult.push({
                CreatedDate1 :$scope.date,
                CreatedDate :TestResult[i].CreatedDate,
                CreatedTime :TestResult[i].CreatedTime,
                Deleted :TestResult[i].Deleted,
                Id :TestResult[i].Id,
                Notes :TestResult[i].Notes,
                PatientId :TestResult[i].PatientId,
                TestName :TestResult[i].TestName,
                Type :TestResult[i].Type,
                UserId :TestResult[i].UserId,
                doc_id :TestResult[i].doc_id,
                lname :TestResult[i].lname,
                name :TestResult[i].name,
                profile :TestResult[i].profile,
                visit_type :TestResult[i].visit_type,
              });
          }
        }
      })
  }

$scope.GetTypeId = function(selectedType){
    $scope.TypeId = selectedType.type_id;
    localStorage.setItem("TypeId",$scope.TypeId);
    $scope.PageNumber=1;  
    $scope.GetMedicalRecord();      
}

$scope.PageNumber=1;
$scope.LoadMoreMedicalRecords = function(page){
    console.log(page);
    $scope.PageNumber = page+1;
    GetPatientMedicalRecords.GetProjects($scope.PageNumber,localStorage.getItem('TypeId'),localStorage.getItem('UserIdKey')).then(function(TestResult) {
 
    $scope.ShowSpinner = true;
    $scope.TestResult1 = [];
    for(var i=0;i<TestResult.length;i++){            
           var n = $filter('date')(new Date(TestResult[i].CreatedDate),'d');
           $scope.Day =  n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
           var MonthYear = $filter('date')(new Date(TestResult[i].CreatedDate),'MMMM, yyyy');
           $scope.date = $scope.Day + ' ' + MonthYear;
            $scope.TestResult1.push({
                CreatedDate1 :$scope.date,
                CreatedDate :TestResult[i].CreatedDate,
                CreatedTime :TestResult[i].CreatedTime,
                Deleted :TestResult[i].Deleted,
                Id :TestResult[i].Id,
                Notes :TestResult[i].Notes,
                PatientId :TestResult[i].PatientId,
                TestName :TestResult[i].TestName,
                Type :TestResult[i].Type,
                UserId :TestResult[i].UserId,
                doc_id :TestResult[i].doc_id,
                lname :TestResult[i].lname,
                name :TestResult[i].name,
                profile :TestResult[i].profile,
                visit_type :TestResult[i].visit_type,
              });
          }

    $scope.TestResult = $scope.TestResult.concat($scope.TestResult1);
    console.log($scope.TestResult);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  
  });
  };




$scope.GoToDetailNotes = function(id){
    localStorage.setItem("NoteId", id);
    $state.go('detail_notes');
  }

});


