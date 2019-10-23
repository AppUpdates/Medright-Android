<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$DocId = $request_arr->Angular_DocId;

$result=mysqli_query($con, "UPDATE tbl_users SET service_provider='$DocId' WHERE UserId='$UserId'");


if($result){
	echo json_encode("success");
}
else{
	echo "error";
}
 
?>

