angular.module('starter.controllers')


.factory('GetDoctors', function($http){

  return {

    GetProjects: function(PageNumber,id,date,city){
      
      return $http.get("http://68.183.101.193/android/338/GetDoctors1.php?Page="+PageNumber+"&UserId="+id+"&Angular_Date="+date+"&Angular_CityName="+city).then(function(response){
        PersonalDocList = response.data;
        return PersonalDocList;
      });
    }
  }
})