<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$page = 1;
$items_per_page = 10;
$offset = ($page - 1) * $items_per_page;

$UserId = $request_arr->Angular_UserId;

$result = mysqli_query($con, "SELECT Appointment.*, tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.profile FROM Appointment INNER JOIN tbl_doctor ON Appointment.DoctorId=tbl_doctor.doc_id WHERE Appointment.UserId='$UserId' ORDER By Appointment.AppointmentId DESC LIMIT $offset, $items_per_page");

$AppointmentList = array();

while ($row = mysqli_fetch_array($result)) {
   $AppointmentList[] = $row;
}

echo json_encode($AppointmentList);
?>