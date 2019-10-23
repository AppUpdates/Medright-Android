<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$StateId = $request_arr->Angular_StateId;

$result = mysqli_query($con, "SELECT * FROM cities WHERE state_id = '$StateId'");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {
   $LoginData[] = $row;
}

echo json_encode($LoginData);
?>