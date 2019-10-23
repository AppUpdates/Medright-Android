angular.module('starter.controllers')

.factory('GetUserReminder', function($http){

  return {
    GetProjects: function(PageNumber,userid,date){  
      return $http.get("http://68.183.101.193/android/338/GetUserHealthRemider1.php?Page="+PageNumber+"&Angular_UserId="+userid+"&Current_Date="+date).then(function(response){
        ReminderCatList = response.data;
        return ReminderCatList;
      });
    }
  }
})