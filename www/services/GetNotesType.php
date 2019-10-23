<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );


$result = mysqli_query($con, "SELECT * from notes_type");

$PatientList = array();

while ($row = mysqli_fetch_array($result)) {
   $PatientList[] = $row;
}

echo json_encode($PatientList);
?>