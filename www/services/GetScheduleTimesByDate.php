<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$Angular_Date = $request_arr->Angular_Date;



$result = mysqli_query($con, "SELECT * FROM tbl_schedule WHERE doc_id = '$UserId' AND Start='$Angular_Date'");

$sch_times = array();

while ($row = mysqli_fetch_array($result)) {
   $sch_times[] = $row;
}

echo json_encode($sch_times);
?>