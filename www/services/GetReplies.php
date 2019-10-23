<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

// $SenderId = $request_arr->Angular_SenderId;
// $Message = $request_arr->Angular_Message;
$disId = $request_arr->Angular_disId;

     $result = mysqli_query($con, "SELECT tbl_users.FirstName,tbl_users.LastName,tbl_users.FileName,Reply.*,Discussion.Message AS 'Mess' FROM Discussion INNER JOIN Reply ON Discussion.DiscussionId=Reply.DiscussionId INNER JOIN tbl_users ON tbl_users.UserId=Reply.SenderId WHERE Reply.DiscussionId='$disId'");


  $LoginData = array();

  while ($row = mysqli_fetch_array($result)) {
    $LoginData[] = $row;
  }
  echo json_encode($LoginData);
// }
 
?>

