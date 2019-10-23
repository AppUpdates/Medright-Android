<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$AppId = $request_arr->Angular_AppId;
$Angular_schid = $request_arr->Angular_schid;


$result2=mysqli_query($con, "UPDATE tbl_schedule SET book=0 WHERE id='$Angular_schid'");


$result1=mysqli_query($con, "UPDATE Appointment SET appDone=1  WHERE AppointmentId='$AppId'");


?>

