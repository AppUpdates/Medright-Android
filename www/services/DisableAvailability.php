<?php
require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;
$Angular_Visit = $request_arr->Angular_Visit;


$result=mysqli_query($con, "UPDATE tbl_doctor SET IsAvailable='$Angular_Visit' WHERE doc_id='$Angular_UserId'");

?>


