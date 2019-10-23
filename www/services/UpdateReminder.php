<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$RemDate = $request_arr->Angular_RemDate;
$RemTime = $request_arr->Angular_RemTime;
$RemRepeat = $request_arr->Angular_RemRepeat;
$RemId = $request_arr->Angular_RemId;
$UserId = $request_arr->Angular_UserId;


$result1=mysqli_query($con, "UPDATE UserHealthReminder SET StartDate='$RemDate',Time1='$RemTime',IsRepeat='$RemRepeat' WHERE Id='$RemId'");


if($result1){
    $result = mysqli_query($con, "SELECT UserHealthReminder.*, ReminderCategory.* FROM UserHealthReminder INNER JOIN ReminderCategory ON UserHealthReminder.CategoryId=ReminderCategory.CategoryId WHERE UserHealthReminder.UserId ='$UserId' ORDER BY UserHealthReminder.StartDate DESC");

        $LoginData = array();

        while ($row = mysqli_fetch_array($result)) {
          $LoginData[] = $row;
        }

        echo json_encode($LoginData);
}
?>

