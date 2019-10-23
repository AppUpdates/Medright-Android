<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );


$DeviceInfo = $request_arr->Angular_DeviceInfo;


$result = mysqli_query($con, "SELECT * FROM `tbl_users` WHERE DeviceInfo='$DeviceInfo'");

$LoginData = array();

while ($row = mysqli_fetch_array($result)){

      $LoginData[] = $row;
}

echo json_encode($LoginData);
  
?>