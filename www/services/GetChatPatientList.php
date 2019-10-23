<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_DoctorId = $request_arr->Angular_DoctorId;

$result = mysqli_query($con, "SELECT tbl_users.UserId, tbl_users.FirstName, tbl_users.LastName ,tbl_users.profile FROM tbl_users 
INNER JOIN tbl_doctor ON tbl_users.service_provider = tbl_doctor.doc_id 
WHERE tbl_doctor.doc_id = '$Angular_DoctorId' OR tbl_doctor.works_with = '$Angular_DoctorId'");

$PatientList = array();

while ($row = mysqli_fetch_array($result)) {
   $PatientList[] = $row;
}

echo json_encode($PatientList);
?>