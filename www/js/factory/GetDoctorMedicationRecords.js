angular.module('starter.controllers')


.factory('GetDoctorMedicationRecords', function($http){

  return {
    GetProjects: function(PageNumber,userid){  
      return $http.get("http://68.183.101.193/android/338/GetDoctorMedicationList1.php?Page="+PageNumber+"&Angular_UserId="+userid).then(function(response){
        DoctorMedicationList = response.data;
        return DoctorMedicationList;
      });
    }
  }
})