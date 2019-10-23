<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_Email = $request_arr->Angular_Email;
$Angular_Password = $request_arr->Angular_Password;
// $Angular_GcmToken = $request_arr->Angular_GcmToken;
$Angular_DeviceInfo = $request_arr->Angular_DeviceInfo;

$pass=md5($Angular_Password);

// $result = mysqli_query($con, "SELECT * FROM tbl_users WHERE Email='$Angular_Email' AND PasswordHash='$pass'");

// $result = mysqli_query($con, "SELECT tbl_users.*, tbl_user_contacts.* FROM tbl_users INNER JOIN tbl_user_contacts ON tbl_users.UserId=tbl_user_contacts.UserId WHERE tbl_users.Email ='$Angular_Email' AND tbl_users.PasswordHash='$pass'");

$result = mysqli_query($con, "SELECT * FROM tbl_users WHERE Email ='$Angular_Email' AND PasswordHash='$pass'");

$result2=mysqli_query($con, "UPDATE tbl_users SET DeviceInfo='$Angular_DeviceInfo' WHERE Email='$Angular_Email'");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {

      $LoginData[] = $row;
}

echo json_encode($LoginData);
  
?>