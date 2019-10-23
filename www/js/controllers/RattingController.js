angular.module('starter.controllers')

.controller('RattingController', function( $scope,$filter,$http,$state,$ionicLoading,$rootScope,
	$ionicSideMenuDelegate,$ionicModal, $timeout,$ionicHistory,$cordovaToast,ProjectService) {
	
$scope.show=function(){
      $ionicLoading.show({
        template:'<ion-spinner></ion-spinner>'+'<p style="font-size: 15px;text-align:center;font-style: normal;font-weight: 500;margin-top: -27px;margin-left:25px;">Please Wait ...</p>'
    });
}

$scope.hide=function(){
    $ionicLoading.hide();
  }

$scope.GoBack = function(){
  $ionicHistory.goBack();
};  

$scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional 
        iconOff: 'ion-ios-star-outline',   //Optional 
        iconOnColor: '#50A0FF',  //Optional 
        iconOffColor:  '#1565C0',    //Optional 
        rating:  2, //Optional 
        minRating:1,    //Optional 
        readOnly: true, //Optional 
        callback: function(rating, index) {    //Mandatory 
          $scope.ratingsCallback(rating, index);
        }
      };
  
$scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
        localStorage.setItem("Rating",rating);
      };

$scope.WriteUserReview = function(){
    $scope.ProfilePic = localStorage.getItem('UserProfilePic');
}

$scope.GetUserReview = function(){
   $scope.ProfilePic = localStorage.getItem('UserProfilePic');
    $http({
            method: "post",
            url:'http://68.183.101.193/android/338/CheckRattingUser.php',
            data: {
              'UserId' : localStorage.getItem("UserIdKey"),
              'Angular_DoctoreId1':localStorage.getItem("DoctoreId1")            
            },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
           console.log(data);
          $scope.Comment = data[0].review;
          $scope.Rate = data[0].total;
          $scope.ratingsObject = {
          iconOn: 'ion-ios-star',    //Optional 
          iconOff: 'ion-ios-star-outline',   //Optional 
          iconOnColor: 'rgb(200, 200, 100)',  //Optional 
          iconOffColor:  'rgb(200, 100, 100)',    //Optional 
          rating:   $scope.Rate, //Optional 
          minRating:1,    //Optional 
          readOnly: true, //Optional 
          callback: function(rating, index) {    //Mandatory 
            $scope.ratingsCallback(rating, index);
          }
        };
        })
}

$scope.SaveReview=function(Comment){
      var UserId= localStorage.getItem("UserIdKey");
      var Ratting=localStorage.getItem("Rating");
      var DoctoreId1=localStorage.getItem("DoctoreId1");
      var CurrentDate = $filter('date')(new Date(), 'dd, MMMM yyyy');

      if(angular.isUndefined(Comment)){
        $cordovaToast.show('Please Write Review', 'short', 'center');
      }
      else{
        $scope.show($ionicLoading);  
        $http({
            method: "post",
            url:'http://68.183.101.193/android/338/SaveReview.php',
            data: {
              'Angular_UId' : localStorage.getItem("UserIdKey"),
              'Angular_Review': Comment,
              'Angular_Rate':Ratting,
              'Angular_DoctoreId1':DoctoreId1
            },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
        console.log(data);          
        if(data == 'sucess'){
        $scope.hide($ionicLoading);       
        $state.go('DoctoreProfile');
         $cordovaToast.show('Review Submitted', 'short', 'center');
        }
        else{
          $cordovaToast.show('server error. Please try after sometime', 'short', 'center');
          }              
        })
}
}

});

