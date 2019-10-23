<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );



$result = mysqli_query($con, "SELECT * FROM tbl_doctor WHERE  IsAvailable= 1");

$data = array();

while ($row = mysqli_fetch_array($result)){
  $data[] = $row;
}

echo json_encode($data);
?>


