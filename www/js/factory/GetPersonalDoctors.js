angular.module('starter.controllers')


.factory('GetPersonalDoctors', function($http){

  return {

    GetProjects: function(PageNumber,id,date){
         
      return $http.get("http://68.183.101.193/android/338/GetPersonalDoctors1.php?Page="+PageNumber+"&UserId="+id+"&Angular_Date="+date).then(function(response){
        PersonalDocList = response.data;
        return PersonalDocList;
      });
    }
  }
})