<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$PatientId = $request_arr->PatientId;


$result = mysqli_query($con, "SELECT tbl_doctor.name,notes.UserId FROM notes INNER JOIN tbl_doctor ON tbl_doctor.doc_id=notes.UserId WHERE notes.PatientId = $PatientId");

$data = array();

while ($row = mysqli_fetch_array($result)){
  $data[] = $row;
}

echo json_encode($data);
?>


