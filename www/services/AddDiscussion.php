<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$SenderId = $request_arr->Angular_SenderId;
$Message = $request_arr->Angular_Message;



$result1=mysqli_query($con, "INSERT INTO Discussion(SenderId,Message) values('$SenderId','$Message')");

if($result1){
  $result = mysqli_query($con, "SELECT Discussion.*, tbl_users.FirstName,tbl_users.LastName FROM Discussion INNER JOIN tbl_users ON Discussion.SenderId=tbl_users.UserId");

  $LoginData = array();

  while ($row = mysqli_fetch_array($result)) {
    $LoginData[] = $row;
  }
  echo json_encode($LoginData);
}
 
?>

