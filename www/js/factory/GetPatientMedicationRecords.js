angular.module('starter.controllers')


.factory('GetPatientMedicationRecords', function($http){

  return {
    GetProjects: function(PageNumber,userid){  
      return $http.get("http://68.183.101.193/android/338/GetMedication1.php?Page="+PageNumber+"&Angular_UserId="+userid).then(function(response){
        MedicationList = response.data;
        return MedicationList;
      });
    }
  }
})