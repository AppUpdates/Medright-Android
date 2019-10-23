<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$ReminderId = $request_arr->Angular_ReminderId;


$result = mysqli_query($con, "SELECT * FROM `ReminderCategory` WHERE ReminderId='$ReminderId'");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {

      $LoginData[] = $row;
}

echo json_encode($LoginData);
  
?>