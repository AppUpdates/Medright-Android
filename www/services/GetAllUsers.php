<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;

$result = mysqli_query($con, "SELECT * FROM tbl_users WHERE UserId <> '$UserId'");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {
   $LoginData[] = $row;
}

echo json_encode($LoginData);
?>