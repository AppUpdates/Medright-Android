<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$RemId = $request_arr->Angular_RemId;
$UserId = $request_arr->Angular_UserId;



$result1=mysqli_query($con, "DELETE FROM UserHealthReminder WHERE Id='$RemId'");

$result = mysqli_query($con, "SELECT UserHealthReminder.*, ReminderCategory.* FROM UserHealthReminder INNER JOIN ReminderCategory ON UserHealthReminder.CategoryId=ReminderCategory.CategoryId WHERE UserHealthReminder.UserId ='$UserId' ORDER BY UserHealthReminder.StartDate DESC");

$LoginData = array();

while ($row = mysqli_fetch_array($result)) {
   $LoginData[] = $row;
}

echo json_encode($LoginData);

?>

