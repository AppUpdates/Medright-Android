angular.module('starter.controllers')


.factory('GetPatientMedicalRecords', function($http){

  return {

    GetProjects: function(PageNumber,typeid,userid){  
      return $http.get("http://68.183.101.193/android/338/GetTestResults1.php?Page="+PageNumber+"&Angular_Type="+typeid+"&Angular_UserId="+userid).then(function(response){
        TestResult = response.data;
        return TestResult;
      });
    }
  }
})