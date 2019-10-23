<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$Angular_Date = $request_arr->Angular_Date;
$Angular_Time = $request_arr->Angular_Time;



$result = mysqli_query($con, "SELECT city FROM tbl_doctor WHERE doc_id='$UserId'");

     while ($row = mysqli_fetch_array($result1)) {
     $city = $row['city'];
}


$result1=mysqli_query($con, "INSERT INTO tbl_schedule(doc_id,schedule,Start, area) values('$UserId', '$Angular_Time','$Angular_Date', '$city')");

?>

