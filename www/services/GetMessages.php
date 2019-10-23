<?php

require_once('config.php');


$request_arr = json_decode( file_get_contents('php://input') );
$Angular_RoomId = $request_arr->Angular_RoomId;
$Angular_MyRoomId = $request_arr->Angular_MyRoomId;

 

$result = mysqli_query($con, "SELECT tbl_users.*,tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.lname,
 tbl_doctor.profile, tbl_appchat.id,tbl_appchat.sender_id, tbl_appchat.receiver_id, tbl_appchat.content,
tbl_appchat.message_date , tbl_appchat.message_time
FROM tbl_appchat  
INNER JOIN tbl_doctor ON tbl_appchat.sender_id=tbl_doctor.doc_id
INNER JOIN tbl_users ON tbl_appchat.receiver_id=tbl_users.UserId
WHERE tbl_appchat.deleted=0 AND tbl_appchat.room_id='$Angular_RoomId'  OR tbl_appchat.room_id='$Angular_MyRoomId' ORDER BY tbl_appchat.id, tbl_appchat.message_date, tbl_appchat.message_time DESC");




$Messages = array();

	 while ($row = mysqli_fetch_array($result)) {
     
        $Messages[] = $row;
     }
 echo json_encode($Messages);


     
?>