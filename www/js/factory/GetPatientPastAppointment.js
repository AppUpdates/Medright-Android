angular.module('starter.controllers')


.factory('GetPatientPastAppointment', function($http){

  return {

    GetProjects: function(PageNumber, id){
     
      return $http.get("http://68.183.101.193/android/338/GetPatientPastAppointment1.php?Page="+PageNumber+"&UserId="+id).then(function(response){
        PastAppointmentList = response.data;
        return PastAppointmentList;
      });
    }
  }
})