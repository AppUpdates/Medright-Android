<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$CategoryId = $request_arr->Angular_CategoryId;
$UserId = $request_arr->Angular_UserId;
$StartDate1 = $request_arr->Angular_StartDate;
$Time1 = $request_arr->Angular_Time1;
$Time2 = $request_arr->Angular_Time2;
$Time3 = $request_arr->Angular_Time3;
$IsRepeat = $request_arr->Angular_IsRepeat;
$FirstName = $request_arr->Angular_FirstName;

$StartDate = date_timestamp_get($StartDate1);
$date = date_create();
$CreatedDate = date_timestamp_get($date);


$result1=mysqli_query($con, "INSERT INTO UserHealthReminder(CategoryId,UserId,StartDate,Time1,CreatedBy) values('$CategoryId','$UserId','$StartDate1','$Time1','$FirstName')");

if($result1){
   $result = mysqli_query($con, "SELECT UserHealthReminder.*, ReminderCategory.* FROM UserHealthReminder INNER JOIN ReminderCategory ON UserHealthReminder.CategoryId=ReminderCategory.CategoryId WHERE UserHealthReminder.UserId ='$UserId'");

    $LoginData = array();
    
    while ($row = mysqli_fetch_array($result)) {
       $LoginData[] = $row;
    }
    
    echo json_encode($LoginData);
}
?>

