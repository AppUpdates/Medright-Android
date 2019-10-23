<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Message = $request_arr->Angular_Message;
$AppointmentDate = $request_arr->Angular_AppointmentDate;
$DoctorId = $request_arr->Angular_DoctorId;
$AppointId = $request_arr->Angular_AppId;
$UserId = $request_arr->Angular_UserId;


$result1=mysqli_query($con, "UPDATE Appointment SET Message='$Message',AppointmentDate='$AppointmentDate',DoctorId='$DoctorId' WHERE AppointmentId='$AppointId'");


if($result1){
    $result = mysqli_query($con, "SELECT Appointment.*, tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.profile FROM Appointment INNER JOIN tbl_doctor ON Appointment.DoctorId=tbl_doctor.doc_id WHERE Appointment.UserId='$UserId'");

    $LoginData = array();

    while ($row = mysqli_fetch_array($result)) {
       $LoginData[] = $row;
    }

    echo json_encode($LoginData);
}
?>

