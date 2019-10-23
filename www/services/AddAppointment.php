<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$Angular_Message = $request_arr->Angular_Message;
$Angular_AppointmentDate = $request_arr->Angular_AppointmentDate;
$Angular_AppointmentTime = $request_arr->Angular_AppointmentTime;

$Angular_DoctorId = $request_arr->Angular_DoctorId;
$Angular_Type = $request_arr->Angular_Type;
$Angular_alert = $request_arr->Angular_alert;
$Angular_schid = $request_arr->Angular_schid;


$Angular_AppointmentDate = date("Y-m-d H:i:s",strtotime($Angular_AppointmentDate));

$Angular_CreatedDate = date("d/m/y H:i:s");



$result1=mysqli_query($con, 
"INSERT INTO Appointment(UserId,Message,AppointmentDate,AppointmentTime,DoctorId,type,alert, CreatedOn, ModifyOn, sch_id) values ('$UserId','$Angular_Message','$Angular_AppointmentDate' ,'$Angular_AppointmentTime' ,'$Angular_DoctorId' , '$Angular_Type', '$Angular_alert',  '$Angular_CreatedDate', '$Angular_CreatedDate', '$Angular_schid')");

if($result1){
   echo "Success";
}
else{
   echo "Error";
}

 
?>

