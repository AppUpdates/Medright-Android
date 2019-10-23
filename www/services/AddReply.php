<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$SenderId = $request_arr->Angular_SenderId;
$Message = $request_arr->Angular_Message;
$DisId = $request_arr->Angular_DisId;


$result1=mysqli_query($con, "INSERT INTO Reply(DiscussionId,SenderId,Message) values('$DisId','$SenderId','$Message')");

if($result1){
  $result2=mysqli_query($con, "UPDATE Discussion SET replies = replies+1 WHERE discussionId='$DisId'");
  
//   UPDATE myTable
// SET ID = ID + 1
  
  $result = mysqli_query($con, "SELECT Reply.*,tbl_users.FirstName,tbl_users.LastName,tbl_users.FileName FROM Reply INNER JOIN tbl_users ON Reply.SenderId=tbl_users.UserId WHERE Reply.DiscussionId='$DisId'");

  $LoginData = array();

  while ($row = mysqli_fetch_array($result)) {
    $LoginData[] = $row;
  }
  echo json_encode($LoginData);
}
 
?>

