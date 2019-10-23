<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$schedule = $request_arr->Angular_Schedule;
$UserId = $request_arr->Angular_UserId;

$result=mysqli_query($con, "DELETE FROM tbl_schedule WHERE schedule='$schedule' AND doc_id = '$UserId'");

// $LoginData = array();

// while ($row = mysqli_fetch_array($result)) {
//    $LoginData[] = $row;
// }

// echo json_encode($LoginData);

?>

