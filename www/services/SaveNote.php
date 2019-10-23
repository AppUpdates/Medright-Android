<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;
$Angular_patientId = $request_arr->Angular_patientId;
$Angular_TestName = $request_arr->Angular_TestName;
$Angular_Notes = $request_arr->Angular_Notes;
$Angular_VisitType = $request_arr->Angular_VisitType;
$Angular_CreatedDate = $request_arr->Angular_CreatedDate;
$Angular_CreatedTime = $request_arr->Angular_CreatedTime;
$Angular_Types = $request_arr->Angular_Types;




$result1=mysqli_query($con, "INSERT INTO notes(UserId,PatientId,TestName,Notes,visit_type,Type,CreatedDate,CreatedTime) values('$Angular_UserId','$Angular_patientId','$Angular_TestName','$Angular_Notes','$Angular_VisitType','$Angular_Types','$Angular_CreatedDate','$Angular_CreatedTime')");


?>

