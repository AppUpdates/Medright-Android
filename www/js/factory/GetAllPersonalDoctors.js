angular.module('starter.controllers')


.factory('GetAllPersonalDoctors', function($http){

  return {

    GetProjects: function(PageNumber,id){
        
      return $http.get("http://68.183.101.193/android/338/GetPersonalDoctorList1.php?Page="+PageNumber+"&UserId="+id).then(function(response){
        PersonalDocList = response.data;
        return PersonalDocList;
      });
    }
  }
})