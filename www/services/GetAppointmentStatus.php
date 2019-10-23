<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;
$Angular_DoctorId = $request_arr->Angular_DoctorId;
$Angular_Time = $request_arr->Angular_Time;


$result2=mysqli_query($con, "SELECT AppointmentStatus FROM  Appointment  WHERE UserId='$Angular_UserId' AND DoctorId = '$Angular_DoctorId' AND AppointmentDate='$Angular_Time' ");




?>

