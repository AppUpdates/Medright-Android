<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$currentDate = gmdate("Y-m-d\TH:i:s\Z");

// print gmdate("Y-m-d\TH:i:s\Z");

$result = mysqli_query($con, "SELECT Appointment.*, tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.profile FROM Appointment INNER JOIN tbl_doctor ON Appointment.DoctorId=tbl_doctor.doc_id WHERE Appointment.DoctorId='$UserId' AND Appointment.appDone=0 AND Appointment.AppointmentTime > $currentDate");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {
   $LoginData[] = $row;
}

echo json_encode($LoginData);
?>