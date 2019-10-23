<?php
require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;

$result = mysqli_query($con," SELECT tbl_doctor.*,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.doc_id  = '$Angular_UserId'");

$DoctorData = array();

while ($row = mysqli_fetch_array($result)) {
   $DoctorData[] = $row;
}

echo json_encode($DoctorData);
?>


