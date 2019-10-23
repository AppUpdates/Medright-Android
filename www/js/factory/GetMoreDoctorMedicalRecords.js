angular.module('starter.controllers')


.factory('GetMoreDoctorMedicalRecords', function($http){

  return {

    GetProjects: function(PageNumber,typeid,userid){  
      return $http.get("http://68.183.101.193/android/338/GetDoctorMedicalRecords1.php?Page="+PageNumber+"&Angular_Type="+typeid+"&Angular_UserId="+userid).then(function(response){
        DoctorTestResult = response.data;
        return DoctorTestResult;
      });
    }
  }
})