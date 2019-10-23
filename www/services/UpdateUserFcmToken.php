<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_Token = $request_arr->Angular_Token;
$Angular_UserId = $request_arr->Angular_UserId;


$result2=mysqli_query($con, "UPDATE   tbl_users SET fcm_token='$Angular_Token' WHERE 	UserId='$Angular_UserId'");

$data = array();

while ($row = mysqli_fetch_array($result)) {

      $data[] = $row;
}

echo json_encode($data);
  
?>