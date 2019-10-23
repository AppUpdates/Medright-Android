angular.module('starter.controllers')


.factory('GetAppointment', function($http){

  return {

    GetProjects: function(PageNumber, id){
     
      return $http.get("http://68.183.101.193/android/338/GetAppointment1.php?Page="+PageNumber+"&UserId="+id).then(function(response){
        AppointmentList = response.data;
        return AppointmentList;
      });
    }
  }
})