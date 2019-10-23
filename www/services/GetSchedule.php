<?php
require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$docid = $request_arr->Angular_DoctorId;

$result = mysqli_query($con, "SELECT * FROM tbl_schedule WHERE doc_id = '$docid' AND book = 0");

$ScheduleData = array();


while ($row = mysqli_fetch_array($result)) {
   $ScheduleData[] = $row;
}

echo json_encode($ScheduleData);
?>


