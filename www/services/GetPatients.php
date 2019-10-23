<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;

$result = mysqli_query($con, "SELECT tbl_users.UserId, tbl_users.FirstName, tbl_users.LastName FROM Appointment INNER JOIN tbl_users ON tbl_users.UserId=Appointment.UserId WHERE Appointment.DoctorId='$UserId'");

$PatientList = array();

while ($row = mysqli_fetch_array($result)) {
   $PatientList[] = $row;
}

echo json_encode($PatientList);
?>