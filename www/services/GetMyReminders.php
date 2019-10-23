<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;

$CreatedDate = date("d-M-y");
$date = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$CreatedTime = $date->format('h:i A');
 
$result = mysqli_query($con, "SELECT UserHealthReminder.*, ReminderCategory.* FROM UserHealthReminder INNER JOIN ReminderCategory ON UserHealthReminder.CategoryId=ReminderCategory.CategoryId WHERE UserHealthReminder.UserId ='$UserId' AND UserHealthReminder.StartDate>'$CreatedDate' OR  UserHealthReminder.StartDate='$CreatedDate' AND UserHealthReminder.Time1>'$CreatedTime' OR UserHealthReminder.Time1<'$CreatedTime' ORDER BY UserHealthReminder.StartDate DESC");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {
   $LoginData[] = $row;
}

echo json_encode($LoginData);
?>