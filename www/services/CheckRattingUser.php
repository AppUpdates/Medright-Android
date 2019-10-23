<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$UserId =$request_arr->UserId;
$Angular_DoctoreId1 =$request_arr->Angular_DoctoreId1;

$result = mysqli_query($con, "SELECT * FROM  user_review  WHERE UserId='$UserId' AND doc_id='$Angular_DoctoreId1'");

$data = array();

while ($row = mysqli_fetch_array($result)) {

      $data[] = $row;	
}

echo json_encode($data);
    


?>