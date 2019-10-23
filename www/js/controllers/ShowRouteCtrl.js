angular.module('starter.controllers')
  
.controller("ShowRouteCtrl",function($scope,$state,$ionicSideMenuDelegate,
       $cordovaGeolocation,$rootScope,$ionicPlatform, $ionicHistory, $location,$ionicLoading){
    
$scope.openMenu = function (){
      $ionicSideMenuDelegate.toggleLeft();
    };

$scope.GoBack = function(){
      $ionicHistory.goBack();
    };

$scope.showToast = function(msg){
      window.plugins.toast.show(msg, 'short', 'center')       
    };


$scope.directionsService = new google.maps.DirectionsService;
$scope.directionsDisplay = new google.maps.DirectionsRenderer;

$scope.loadMap = function(){
      
  $scope.start = localStorage.getItem("Address");
  $scope.end = localStorage.getItem("DocAddressKey");
  $rootScope.btnstatus = false;
   $ionicLoading.show({
      template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;'+
      'stroke: white;fill: white;"></ion-spinner> <br/> Please wait..'
    }); 
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position);
  
  var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
  
  var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat:position.coords.latitude, lng: position.coords.longitude}
      });
 $ionicLoading.hide();
  $scope.directionsDisplay.setMap(map);
  $scope.directionsService.route({
      origin:  $scope.start,
      destination: $scope.end ,
      travelMode: 'DRIVING'
  }, function(response, status) {
     
  if (status === 'OK') {
      $ionicLoading.hide();
      console.log(response);
      $scope.directionsDisplay.setDirections(response);
  } else {
      $ionicLoading.hide();
      window.alert('Directions request failed due to ' + status);
  }
 });
 }, function() {
      $ionicLoading.hide();
      handleLocationError(true, infoWindow, map.getCenter());
});
    
};

$scope.GetCurrentLocation = function(){

$scope.enableBtn();
$ionicLoading.show({
      template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;'+
      'stroke: white;fill: white;"></ion-spinner> <br/> Searching Location'
    }); 

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position);
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
var latlng = {lat:position.coords.latitude, lng:position.coords.longitude};
var geocoder = geocoder = new google.maps.Geocoder();
geocoder.geocode({'location': latlng}, function(results, status) {
    
if (status === 'OK') {
  if (results[0]) {          
      console.log(results[0].formatted_address);
      $scope.start = results[0].formatted_address;
      localStorage.setItem('MyLocationKey',results[1].formatted_address);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: position.coords.latitude, lng: position.coords.longitude}
      });
      $scope.directionsDisplay.setMap(map);
      $scope.directionsService.route({
        origin: localStorage.getItem("MyLocationKey"),
        destination: localStorage.getItem("DocAddressKey"),
        travelMode: 'DRIVING'
      }, function(response, status) {
            if (status === 'OK') {
                console.log(response);
                $scope.directionsDisplay.setDirections(response);
            }else {
                $scope.showToast(status);
              }
            });
            $ionicLoading.hide();            
            }else{
            $ionicLoading.hide();
            window.alert('No results found');
          }
          }else {
          $ionicLoading.hide();
          window.alert('Geocoder failed due to: ' + status);
        }
      });
          }, function() {
            $ionicLoading.hide();
            handleLocationError(true, infoWindow, map.getCenter());
          });
  }


$scope.showDirection = function (s,d){
      $scope.directionsService.route({
        origin: s,
        destination: d,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          console.log(response);
          $scope.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
      };

$scope.enableBtn = function(){
      $rootScope.btnstatus = true;
    };

});
