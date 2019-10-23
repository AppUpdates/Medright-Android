<?php
require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );
$Angular_SenderId = $request_arr->Angular_SenderId;
$Angular_ReceiverId = $request_arr->Angular_ReceiverId;
$Angular_UserName = $request_arr->Angular_UserName;
$Angular_RoomId = $request_arr->Angular_RoomId;
$Angular_MyRoomId = $request_arr->Angular_MyRoomId;
$Angular_MessageContent = $request_arr->Angular_MessageContent;
$Angular_MessageDate = $request_arr->Angular_MessageDate; 
$Angular_MessageTime = $request_arr->Angular_MessageTime;
$is_doctor = $request_arr->is_doctor;

$result = mysqli_query($con, "select * from tbl_appchat where room_id= '$Angular_RoomId'");


$result_number = mysqli_num_rows($result);
$Angular_SenderId1 = substr($Angular_SenderId, 3); 
if($result_number != 0){
    
    
$resul1 = mysqli_query($con, "INSERT INTO tbl_appchat (sender_id, receiver_id, room_id, content, message_date, message_time)
 VALUES ('$Angular_SenderId','$Angular_ReceiverId','$Angular_RoomId','$Angular_MessageContent','$Angular_MessageDate','$Angular_MessageTime')");

if($is_doctor == false){
  $Angular_ReceiverId1 = substr($Angular_ReceiverId, 3); 
  $result3 = mysqli_query($con, "SELECT * FROM tbl_users WHERE UserId = '$Angular_ReceiverId1'");

  $FCMToken = array();

     while ($row = mysqli_fetch_array($result3)) {
     
        $FCMToken[] = $row['fcm_token'];
     }
}

if($is_doctor == true ){
  $Angular_ReceiverId1 = substr($Angular_ReceiverId, 3); 
  $result3 = mysqli_query($con, "SELECT * FROM tbl_doctor WHERE doc_id = '$Angular_ReceiverId1'");

  $FCMToken = array();

     while ($row = mysqli_fetch_array($result3)) {
     
        $FCMToken[] = $row['fcm_token'];
     }
}
$to=$FCMToken;  
$title=$Angular_UserName;
$message= $Angular_MessageContent;
sendMessage($to,$title,$message,$Angular_SenderId1,$Angular_UserName);
}

else{
    
$result2 = mysqli_query($con, "INSERT INTO tbl_appchat (sender_id, receiver_id, room_id, content, message_date, message_time)
 VALUES ('$Angular_SenderId','$Angular_ReceiverId','$Angular_MyRoomId','$Angular_MessageContent','$Angular_MessageDate','$Angular_MessageTime')");

if($is_doctor == false){
  $Angular_ReceiverId1 = substr($Angular_ReceiverId, 3); 
  $result3 = mysqli_query($con, "SELECT * FROM tbl_users WHERE UserId = '$Angular_ReceiverId1'");

  $FCMToken = array();

     while ($row = mysqli_fetch_array($result3)) {
     
        $FCMToken[] = $row['fcm_token'];
     }
}

if($is_doctor == true){
  $Angular_ReceiverId1 = substr($Angular_ReceiverId, 3); 
  $result3 = mysqli_query($con, "SELECT * FROM tbl_doctor WHERE doc_id = '$Angular_ReceiverId1'");

  $FCMToken = array();

     while ($row = mysqli_fetch_array($result3)) {
     
        $FCMToken[] = $row['fcm_token'];
     }
}

$to=$FCMToken;  
$title=$Angular_UserName;
$message= $Angular_MessageContent;
sendMessage($to,$title,$message,$Angular_SenderId1,$Angular_UserName);
}


function sendMessage($to,$title,$message,$Angular_SenderId1,$Angular_UserName){
echo $to;
   $content = array(
      "en" => $message.''
      );
      
      $headings=["en" => $title];
      
  
//  print_r($content);
    $fields = array(
      'app_id' => "7994040e-c2e9-4f21-ab7d-43bd014b098a",
      'include_player_ids' => $to,
      'data' => array("message" => $message,
                      "ischat" => "1",
                      "receiverid" => $Angular_SenderId1,
                      "name" => $Angular_UserName),
      'contents' => $content,
      'headings'=> $headings,
      'headings_color' => '#E91E63',
//      'big_picture' => 'https://ibin.co/2t1lLdpfS06F.png',
      'large_icon' => 'http://68.183.101.193/android/338/uploads/icon.png',
      'small_icon' => 'fcm_icon'
    );
    
    $fields = json_encode($fields);
      print("\nJSON sent:\n");
      print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                           'Authorization: Basic NjAyOTdiM2MtMzI3Mi00ZmNhLWI3ZjMtNTFiMWEzODgzMzNi'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
  }
  
   $response = sendMessage();
  $return["allresponses"] = $response;
  $return = json_encode( $return);
  
  print("\n\nJSON received:\n");
  print($return); 
  print("\n");

?>