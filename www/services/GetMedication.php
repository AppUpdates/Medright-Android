<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$page = 1;
$items_per_page = 10;
$offset = ($page - 1) * $items_per_page;

$UserId = $request_arr->Angular_UserId;

$result = mysqli_query($con, "SELECT Medication.*, tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.profile FROM Medication INNER JOIN tbl_doctor ON Medication.DocId=tbl_doctor.doc_id WHERE Medication.UserId='$UserId' ORDER By Medication.MedicationId DESC");

$MedicationList = array();

while ($row = mysqli_fetch_array($result)) {
   $MedicationList[] = $row;
}

echo json_encode($MedicationList);
?>