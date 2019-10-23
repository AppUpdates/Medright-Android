angular.module('starter.controllers')


.factory('GetAllDoctors', function($http){

  return {

    GetProjects: function(PageNumber,city){
      
      return $http.get("http://68.183.101.193/android/338/GetAllDoctors1.php?Page="+PageNumber+"&CityName="+city).then(function(response){
        DoctorsList = response.data;
        return DoctorsList;
      });
    }
  }
})