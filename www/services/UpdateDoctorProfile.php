<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$DocId = $request_arr->Angular_DocId;
$contact = $request_arr->Angular_contact;
$emer_contact = $request_arr->Angular_emer_contact;
$email = $request_arr->Angular_email;
$res_address = $request_arr->Angular_res_address;
$off_address = $request_arr->Angular_off_address;
$Profilepic = $request_arr->Angular_Profilepic;

$date = date_create();
$UpdateddDate = date_timestamp_get($date);


$result1=mysqli_query($con, "UPDATE tbl_doctor SET profile='$Profilepic',contact='$contact',emer_contact='$emer_contact',email='$email',res_address='$res_address',off_address='$off_address' WHERE doc_id='$DocId'");


if($result1){
$result = mysqli_query($con, "SELECT * FROM tbl_doctor WHERE doc_id='$DocId'");
$LoginData = array();
while ($row = mysqli_fetch_array($result)) {
$LoginData[] = $row;
}
echo json_encode($LoginData);
}


?>

