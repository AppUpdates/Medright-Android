<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$Angular_DocId = $request_arr->Angular_DocId;
$Angular_DocnameName = $request_arr->Angular_DocnameName;
$Angular_UserId = $request_arr->Angular_UserId;



// $result1 = mysqli_query($con, "SELECT * FROM tbl_doctor WHERE  IsAvailable= 1 ORDER BY RAND() LIMIT 3");

$result1 = mysqli_query($con, "SELECT * FROM tbl_users WHERE  UserId='$Angular_UserId'");

$doclist = array();
while ($row = mysqli_fetch_array($result1)) {
      $doclist[] = $row['fcm_token'];
   
    //   array_push($doclist, ( $row['fcm_token']));

}

// $json = json_encode($doclist);
// print_r($doclist);
// print_r($Angular_PatientName);
sendMessage($doclist,$Angular_PatientName,$Angular_UserId);

function sendMessage($doclist,$Angular_PatientName,$Angular_UserId){
 $a = '.$Angular_DocnameName.';

		$content = array(
			"en" => $Angular_DocnameName .' is ready to start chat. Please tap on this message to start chat.'
			);
// 	print_r($content);
		$fields = array(
			'app_id' => "7994040e-c2e9-4f21-ab7d-43bd014b098a",
			'include_player_ids' => $doclist,
			'data' => array("username" => $Angular_DocnameName,
			                "user_id" => $Angular_DocId),
			'contents' => $content,
			'headings_color' => '#E91E63',
// 			'big_picture' => 'https://ibin.co/2t1lLdpfS06F.png',
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


