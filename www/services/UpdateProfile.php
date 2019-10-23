<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$Profilepic = $request_arr->Angular_FileName;
$MobileNo = $request_arr->Angular_MobileNo;
$Email = $request_arr->Angular_Email;
$Address = $request_arr->Angular_Address;



$date = date_create();
$UpdateddDate = date_timestamp_get($date);


$result1=mysqli_query($con, "UPDATE tbl_users SET profile='$Profilepic',Email='$Email',ModifyOn='$UpdateddDate',Contact='$MobileNo', address='$Address' WHERE UserId='$UserId'");


if($result1){
$result = mysqli_query($con, "SELECT * FROM tbl_users WHERE UserId='$UserId'");
$LoginData = array();
while ($row = mysqli_fetch_array($result)) {
$LoginData[] = $row;
}
echo json_encode($LoginData);
}


?>

