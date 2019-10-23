<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$page = $_GET["PageNumber"];
$items_per_page = 10; 
$offset = ($page - 1) * $items_per_page;
$UserId = $request_arr->Angular_UserId;
$Angular_Type = $request_arr->Angular_Type;


$result = mysqli_query($con, "SELECT tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.lname, notes.* FROM notes INNER JOIN tbl_doctor ON tbl_doctor.doc_id=notes.UserId WHERE notes.PatientId='$UserId' AND Type='$Angular_Type' LIMIT $offset, $items_per_page");

$PatientNotes = array();

while ($row = mysqli_fetch_array($result)) {
   $PatientNotes[] = $row;
}

echo json_encode($PatientNotes);
?>