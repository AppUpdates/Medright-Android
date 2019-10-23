<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;
$Angular_DoctorId = $request_arr->Angular_DoctorId;
$status = $request_arr->status;


$result2=mysqli_query($con, "UPDATE Appointment SET AppointmentStatus = '$status' WHERE UserId='$Angular_UserId' AND DoctorId = '$Angular_DoctorId'");




?>

