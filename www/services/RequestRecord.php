<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$RecordId = $request_arr->Angular_RecordId;
$DoctorId = $request_arr->Angular_DoctorId;
$UserId = $request_arr->Angular_UserId;
$StartDate = $request_arr->Angular_StartDate;
$EndDate = $request_arr->Angular_EndDate;
$Message = $request_arr->Angular_Message;


$date = date_create();
$CreatedDate = date_timestamp_get($date);


$result=mysqli_query($con,"INSERT INTO MedicalRecordRelease(DoctorId,RecordId,UserId,StartDate,EndDate,Message) VALUES('$DoctorId','$RecordId','$UserId','$StartDate','$EndDate','$Message');");


if($result){
    echo "Success";
}


?>

