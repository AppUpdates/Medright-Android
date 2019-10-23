angular.module('starter.controllers')

.controller('ScheduleCtrl', function($scope, $http, $state, $filter, $timeout, $cordovaToast, $ionicLoading, $ionicSideMenuDelegate,$ionicPlatform, $ionicHistory, $location){

$scope.show = function() {
	      $ionicLoading.show({
	        template: '<ion-spinner class="spinner-energized" style="width: 28px;height: 28px;stroke: white;fill: white;"></ion-spinner>'
	      });
	  };

$scope.goBack = function(){
	  	$ionicHistory.goBack();
	  };

 $ionicPlatform.registerBackButtonAction(function (event) {
  var path = $location.path();
  if (path == '/app/DoctorsSchedule') {
    console.log("exit");
    $state.go('app.DoctorsHome');
    
  } else {
    $scope.GoBack();
  }
}, 100);


$scope.hide = function(){
	    $ionicLoading.hide().then(function(){});
	  };

$scope.showToast = function(msg){
	    window.plugins.toast.show(msg, 'short', 'center');        
	  };

$scope.openMenu = function (){
	    $ionicSideMenuDelegate.toggleLeft();
	  }; 	

$scope.scheduleTime = function(){
	  	$state.go('set_time');
	  };
      
$scope.GetScheduleByDate = function(s_date){
      if(s_date == undefined){
        $cordovaToast.show('Please select date', 'short', 'center');
      }
      else{
      	$scope.show();
      	var s_date1 = $filter('date')(s_date, 'yyyy-MM-dd');
      	$http({
		        method:"post",
		        url:'http://68.183.101.193/android/338/GetScheduleTimesByDate.php',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        data:{
		          Angular_UserId:localStorage.getItem('UserIdKey'),
		          Angular_Date:s_date1
		        }
		      }).success(function(data){                
            $scope.hide();
		      	if(data == ''){
                 $scope.NoData = true;
                 $scope.ShowData = false;
                 $scope.DateData = false;
		      	}
		      	else{
		      	     $scope.NoData = false;
                 $scope.ShowData = false;
                 $scope.DateData = true;
                 $scope.sch_date_data = data;	
		      	}
		  })    	
      }
  }

$scope.GetScheduleTImes = function(){
   
       $scope.show();       
	  	 $http({
		        method:"post",
		        url:'http://68.183.101.193/android/338/GetScheduleTimes.php',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        data:{
		          Angular_UserId:localStorage.getItem('UserIdKey')
		        }
		      }).success(function(data){
		      	$scope.hide(); 
                if(data == ''){
                 $scope.ShowData = false;
                 $scope.NoData = true;
                 $scope.DateData = false;
                }
                else{
                 $scope.ShowData = true;
                 $scope.NoData = false;
                 $scope.DateData = false;
		      	
		      	$scope.ScheduleTimes = [];

		      	 var  days = [];
                  var daysRequired = 7

			        for (var i = 0; i < 7; i++) {
			          days.push({
			              dates:moment().add(i, 'days').format('DD MMMM YYYY (dddd)'),
			              date_c:moment().add(i, 'days').format('DD') 
			          }) 
			        }

			         $scope.seven_days = days;

		      	  for(var i = 0; i < data.length; i++) {
                $scope.ScheduleTimes.push({
                  app_time : data[i].schedule,
                  app_date : data[i].Start,
                  date_c : $filter('date')(data[i].Start, 'dd'),
                  doc_id: data[i].doc_id,
                  sch_id: data[i].id
              });
              }
            }  
		 })  	
	  }

$scope.GetDoctorScheduleByDate = function(date){
		$http({
		        method:"post",
		        url:'http://68.183.101.193/android/338/GetScheduleTimesByDate.php',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        data:{
		          Angular_UserId:localStorage.getItem('UserIdKey'),
		          Angular_Date:date
		        }
		      }).success(function(data){
                 console.log(data);
                 $scope.hide();
                  $scope.ScheduleTimes = [];

                for(var i = 0; i < data.length; i++) {
                //console.log(data[i].schedule)

                if(data[i].schedule == '08:00 AM'){
                	$scope.A1 = true;
                	$scope.A2 = true;
                }


                if(data[i].schedule == '08:30 AM'){
                	$scope.B1 = true;
                	$scope.B2 = true;
                }

                  if(data[i].schedule == '09:00 AM'){
                	$scope.C1 = true;
                	$scope.C2 = true;
                }

                  if(data[i].schedule == '09:30 AM'){
                	$scope.D1 = true;
                	$scope.D2 = true;
                }

                  if(data[i].schedule == '10:00 AM'){
                	$scope.E1 = true;
                	$scope.E2 = true;
                }

                  if(data[i].schedule == '10:30 AM'){
                	$scope.F1 = true;
                	$scope.F2 = true;
                }

                  if(data[i].schedule == '11:00 AM'){
                	$scope.G1 = true;
                	$scope.G2 = true;
                }

                  if(data[i].schedule == '11:30 AM'){
                	$scope.H1 = true;
                	$scope.H2 = true;
                }

                  if(data[i].schedule == '12:00 PM'){
                	$scope.I1 = true;
                	$scope.I2 = true;
                }

                if(data[i].schedule == '12:30 PM'){
                	$scope.J1 = true;
                	$scope.J2 = true;
                }

                  if(data[i].schedule == '01:00 PM'){
                	$scope.K1 = true;
                	$scope.K2 = true;
                }

                 if(data[i].schedule == '01:30 PM'){
                	$scope.L1 = true;
                	$scope.L2 = true;
                }

                 if(data[i].schedule == '02:00 PM'){
                	$scope.M1 = true;
                	$scope.M2 = true;
                }

                 if(data[i].schedule == '02:30 PM'){
                	$scope.N1 = true;
                	$scope.N2 = true;
                }

                 if(data[i].schedule == '03:00 PM'){
                	$scope.O1 = true;
                	$scope.O2 = true;
                }

                 if(data[i].schedule == '03:30 PM'){
                	$scope.P1 = true;
                	$scope.P2 = true;
                }

                 if(data[i].schedule == '04:00 PM'){
                	$scope.Q1 = true;
                	$scope.Q2 = true;
                }

                 if(data[i].schedule == '04:30 PM'){
                	$scope.R1 = true;
                	$scope.R2 = true;
                }

                if(data[i].schedule == '05:00 PM'){
                	$scope.S1 = true;
                	$scope.S2 = true;
                }

                if(data[i].schedule == '05:30 PM'){
                	$scope.T1 = true;
                	$scope.T2 = true;
                }

                $scope.ScheduleTimes.push({
                  schedule : data[i].schedule,
                  id : data[i].id,
                  doc_id : data[i].doc_id,
                  book: data[i].book,
                  area: data[i].area,
                  Start: data[i].Start
              });
              }	      	

		  })    
}  


$scope.LoadDates = function(){
	$scope.dates = new Date();
  $scope.time =  $filter('date')(new Date($scope.dates),'hh:mm a');
  console.log( $scope.time);
	$scope.c =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');  
  $scope.PrivevousBtn= true;
  var currentdate = new Date();
  $scope.b =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
  console.log( $scope.b);
  localStorage.setItem("CurrentDate" , $scope.b);

  $scope.GetDoctorScheduleByDate($scope.b);
  
      }

$scope.PerivousDay = function(dates){   
  $scope.A1=false;
	$scope.A2=false;
	$scope.B1=false;
	$scope.B2=false;
	$scope.C1=false;
	$scope.C2=false;
	$scope.D1=false;
	$scope.D2=false;
	$scope.E1=false;
	$scope.E2=false;
	$scope.F1=false;
	$scope.F2=false;
	$scope.G1=false;
	$scope.G2=false;
	$scope.H1=false;
	$scope.H2=false;
	$scope.I1=false;
	$scope.I2=false;
	$scope.J1=false;
	$scope.J2=false;
	$scope.K1=false;
	$scope.K2=false;
	$scope.L1=false;
	$scope.L2=false;
	$scope.M1=false;
	$scope.M2=false;
	$scope.N1=false;
	$scope.N2=false;
	$scope.O1=false;
	$scope.O2=false;
	$scope.P1=false;
	$scope.P2=false;
	$scope.Q1=false;
	$scope.Q2=false;
	$scope.R1=false;
	$scope.R2=false;
	$scope.S1=false;
	$scope.S2=false;
	$scope.T1=false;
	$scope.T2=false; 
  
  time = [];
  removetime=[];
  $scope.NextBtn= false;
  var a=  $filter('date')(new Date(dates),'yyyy-MM-dd');
  var tomorrow = new Date(dates); 
  $scope.dates = tomorrow.setDate(tomorrow.getDate() - 1);
      

  var currentdate = new Date();
  var b =  $filter('date')(new Date(currentdate),'yyyy-MM-dd');
  $scope.c =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
    if ($scope.c == b){
     $scope.PrivevousBtn= true;
  }
  console.log( $scope.c);
  localStorage.setItem("CurrentDate" , $scope.c);
  $scope.GetDoctorScheduleByDate($scope.c);
  }

$scope.NextDay = function(dates){
  console.log(dates)
  $scope.A1=false;
	$scope.A2=false;
	$scope.B1=false;
	$scope.B2=false;
	$scope.C1=false;
	$scope.C2=false;
	$scope.D1=false;
	$scope.D2=false;
	$scope.E1=false;
	$scope.E2=false;
	$scope.F1=false;
	$scope.F2=false;
	$scope.G1=false;
	$scope.G2=false;
	$scope.H1=false;
	$scope.H2=false;
	$scope.I1=false;
	$scope.I2=false;
	$scope.J1=false;
	$scope.J2=false;
	$scope.K1=false;
	$scope.K2=false;
	$scope.L1=false;
	$scope.L2=false;
	$scope.M1=false;
	$scope.M2=false;
	$scope.N1=false;
	$scope.N2=false;
	$scope.O1=false;
	$scope.O2=false;
	$scope.P1=false;
	$scope.P2=false;
	$scope.Q1=false;
	$scope.Q2=false;
	$scope.R1=false;
	$scope.R2=false;
	$scope.S1=false;
	$scope.S2=false;
	$scope.T1=false;
	$scope.T2=false;
   		 
  time = [];
  removetime=[];

  $scope.PrivevousBtn= false;
  var a=  $filter('date')(new Date(dates),'yyyy-MM-dd');
  var tomorrow = new Date(dates); 
  console.log(tomorrow);
  $scope.dates = tomorrow.setDate(tomorrow.getDate() + 1);
  console.log(new Date($scope.dates))

  $scope.c =  $filter('date')(new Date($scope.dates),'yyyy-MM-dd');
	var Next = new Date();     
  $scope.Nextdate = Next.setDate(Next.getDate() +14);   
  var b =  $filter('date')(new Date($scope.Nextdate),'yyyy-MM-dd');
  if ($scope.c == b){  
              $scope.NextBtn= true;       
  }   
  console.log($scope.c);   
  localStorage.setItem("CurrentDate" , $scope.c); 
  $scope.GetDoctorScheduleByDate($scope.c);
          
  }

$scope.SetTime = function(){
console.log(time)
console.log(removetime)
$scope.SaveSchedule();
$scope.DeleteSchedule();
$state.go('app.DoctorsHome');
$cordovaToast.show('Time set successfully', 'short', 'center');
}

$scope.SaveSchedule = function(){
	for( i=0; i<time.length;i++){
		$http({
		        method:"post",
		        url:'http://68.183.101.193/android/338/SetTime.php',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        data:{
		          Angular_UserId:localStorage.getItem('UserIdKey'),
		          Angular_Date:localStorage.getItem('CurrentDate'),
		          Angular_Time: time[i].time
		        }
		      }).success(function(data){
                $scope.hide();                
		     }) 	
	}
}

$scope.DeleteSchedule = function(){
		for( j=0; j<removetime.length;j++){
			$http({
		        method:"post",
		        url:'http://68.183.101.193/android/338/DeleteSchedule.php',
		        headers: {'Content-Type':'application/x-www-form-urlencoded'},
		        data:{
		          Angular_UserId:localStorage.getItem('UserIdKey'),
		          Angular_Schedule : removetime[j].removetime,
		          CurrentDate : localStorage.getItem('CurrentDate')
		        }
		      }).success(function(data){     
		      console.log(data)           
		     }) 
		     }	
}


$scope.remove =function(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

var time = [];
var removetime = [];

$scope.Button1 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  var a = b + ' ' + '08:00 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id1').innerHTML});
	$scope.A1=true;
	$scope.A2=true;
  }	 
}
$scope.Button2 = function(){
	removetime.push({["removetime"]: document.getElementById('id1').innerHTML});
	//$scope.remove(time, "id1.innerHTML");
	$scope.A1=false;
	$scope.A2=false;
}
$scope.Button3 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  var a = b + ' ' + '08:30 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id2').innerHTML});
	$scope.B1=true;
	$scope.B2=true;
  }
}
$scope.Button4 = function(){
	removetime.push({["removetime"]: document.getElementById('id2').innerHTML});
	//$scope.remove(time, "id2.innerHTML");
	$scope.B1=false;
	$scope.B2=false;
}
$scope.Button5 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '09:00 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id3').innerHTML});
	$scope.C1=true;
	$scope.C2=true;
  }
}
$scope.Button6 = function(){
	removetime.push({["removetime"]: document.getElementById('id3').innerHTML}); 
	//$scope.remove(time, "id3.innerHTML");
	$scope.C1=false;
	$scope.C2=false;
}
$scope.Button7 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '09:30 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id4').innerHTML});
	$scope.D1=true;
	$scope.D2=true;
  }
}
$scope.Button8 = function(){
	removetime.push({["removetime"]: document.getElementById('id4').innerHTML});
	//$scope.remove(time, "id4.innerHTML");
	$scope.D1=false;
	$scope.D2=false;
}
$scope.Button9 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '10:00 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id5').innerHTML});
	$scope.E1=true;
	$scope.E2=true;
  }
}
$scope.Button10 = function(){
	removetime.push({["removetime"]: document.getElementById('id5').innerHTML});
	//$scope.remove(time, "id5.innerHTML");
	$scope.E1=false;
	$scope.E2=false;
}
$scope.Button11 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '10:30 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id6').innerHTML});
	$scope.F1=true;
	$scope.F2=true;
  }
}
$scope.Button12 = function(){
	removetime.push({["removetime"]: document.getElementById('id6').innerHTML});
	//$scope.remove(time, "id6.innerHTML");
	$scope.F1=false;
	$scope.F2=false;
}
$scope.Button13 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '11:00 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id7').innerHTML});
	$scope.G1=true;
	$scope.G2=true;
  }
}
$scope.Button14 = function(){
	removetime.push({["removetime"]: document.getElementById('id7').innerHTML});
	//$scope.remove(time, "id7.innerHTML");
	$scope.G1=false;
	$scope.G2=false;
}
$scope.Button15 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '11:30 AM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id8').innerHTML});
	$scope.H1=true;
	$scope.H2=true;
  }
}
$scope.Button16 = function(){
	removetime.push({["removetime"]: document.getElementById('id8').innerHTML});
	//$scope.remove(time, "id8.innerHTML");
	$scope.H1=false;
	$scope.H2=false;
}
$scope.Button17 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '12:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id9').innerHTML});
	$scope.I1=true;
	$scope.I2=true;
  }
}
$scope.Button18 = function(){
	removetime.push({["removetime"]: document.getElementById('id9').innerHTML});
	//$scope.remove(time, "id9.innerHTML");
	$scope.I1=false;
	$scope.I2=false;
}
$scope.Button19 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '12:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id10').innerHTML});
	$scope.J1=true;
	$scope.J2=true;
  }
}
$scope.Button20 = function(){
	removetime.push({["removetime"]: document.getElementById('id10').innerHTML});
	//$scope.remove(time, "id10.innerHTML");
	$scope.J1=false;
	$scope.J2=false;
}
$scope.Button21 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '01:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
     $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id11').innerHTML});
	$scope.K1=true;
	$scope.K2=true;
  }
}
$scope.Button22 = function(){
	removetime.push({["removetime"]: document.getElementById('id11').innerHTML});
	//$scope.remove(time, "id11.innerHTML");
	$scope.K1=false;
	$scope.K2=false;
}
$scope.Button23 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '01:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id12').innerHTML});
	$scope.L1=true;
	$scope.L2=true;
  }
}
$scope.Button24 = function(){
	removetime.push({["removetime"]: document.getElementById('id12').innerHTML});
	//$scope.remove(time, "id12.innerHTML");
	$scope.L1=false;
	$scope.L2=false;
}
$scope.Button25 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '02:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id13').innerHTML});
	$scope.M1=true;
	$scope.M2=true;
  }
}
$scope.Button26 = function(){
	removetime.push({["removetime"]: document.getElementById('id13').innerHTML});
	//$scope.remove(time, "id13.innerHTML");
	$scope.M1=false;
	$scope.M2=false;
}
$scope.Button27 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '02:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id14').innerHTML});
	$scope.N1=true;
	$scope.N2=true;
  }
}
$scope.Button28 = function(){
	removetime.push({["removetime"]: document.getElementById('id14').innerHTML});
	//$scope.remove(time, "id14.innerHTML");
	$scope.N1=false;
	$scope.N2=false;
}
$scope.Button29 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '03:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id15').innerHTML});
	$scope.O1=true;
	$scope.O2=true;
  }
}
$scope.Button30 = function(){
	removetime.push({["removetime"]: document.getElementById('id15').innerHTML});
	//$scope.remove(time, "id15.innerHTML");
	$scope.O1=false;
	$scope.O2=false;
}
$scope.Button31 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '03:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id16').innerHTML});
	$scope.P1=true;
	$scope.P2=true;
  }
}
$scope.Button32 = function(){
	removetime.push({["removetime"]: document.getElementById('id16').innerHTML});
	//$scope.remove(time, "id16.innerHTML");
	$scope.P1=false;
	$scope.P2=false;
}
$scope.Button33 = function(dates){
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '04:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id17').innerHTML});
	$scope.Q1=true;
	$scope.Q2=true;
  }
}
$scope.Button34 = function(){
	removetime.push({["removetime"]: document.getElementById('id17').innerHTML});
	//$scope.remove(time, "id17.innerHTML");
	$scope.Q1=false;
	$scope.Q2=false;
}
$scope.Button35 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '04:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id18').innerHTML});
	$scope.R1=true;
	$scope.R2=true;
  }
}
$scope.Button36 = function(){
	removetime.push({["removetime"]: document.getElementById('id18').innerHTML});
	//$scope.remove(time, "id18.innerHTML");
	$scope.R1=false;
	$scope.R2=false;
}
$scope.Button37 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '05:00 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id19').innerHTML});
	$scope.S1=true;
	$scope.S2=true;
  }
}
$scope.Button38 = function(){
	removetime.push({["removetime"]: document.getElementById('id19').innerHTML});
	//$scope.remove(time, "id19.innerHTML");
	$scope.S1=false;
	$scope.S2=false;
}
$scope.Button39 = function(dates){	
  var b = $filter('date')(new Date(dates), 'MM/dd/yyyy');
  console.log(b)
  var a = b + ' ' + '05:30 PM';
  var c = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
  // var c = '09/21/2018 06:00 PM'
  var aDate = new Date(a).getTime();
  var bDate = new Date(c).getTime();

  if(aDate <= bDate){
      $scope.showToast("Time can not be less or equal to current DateTime");
  }else{
  	time.push({["time"]: document.getElementById('id20').innerHTML});
	$scope.T1=true;
	$scope.T2=true;
  }
}
$scope.Button40 = function(){
	removetime.push({["removetime"]: document.getElementById('id20').innerHTML});
	//$scope.remove(time, "id20.innerHTML");
	$scope.T1=false;
	$scope.T2=false;
}


})

.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
});
