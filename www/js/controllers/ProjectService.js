angular.module('starter.controllers')
.factory('ProjectService', function($http){
  return {
    GetProjects: function(PageNumber,id){
      return $http.get("http://68.183.101.193/android/338/GetDoctorReviews1.php?Page="+PageNumber+"&Angular_DocId="+id).then(function(response){
        Review = response.data;
        return Review;
      });
    }
  }
})

.factory('DoctorService', function($http){
  return {
    GetMoreDoctors: function(PageNumber,id){
      return $http.get("http://68.183.101.193/android/338/GetDoctorReviews1.php?Page="+PageNumber+"&Angular_DocId="+id).then(function(response){
        Review = response.data;
        return Review;
      });
    }
  }
})

.factory('PersonalDoctorService', function($http){
  return {
    GetMoreDoctors: function(PageNumber,id){
      return $http.get("http://68.183.101.193/android/338/GetPersonalDoctors.php?Page="+PageNumber+"&Angular_DocId="+id).then(function(response){
        Review = response.data;
        return Review;
      });
    }
  }
})


