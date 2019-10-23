<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );
$page = $_GET["PageNumber"];
$items_per_page = 10; 
$offset = ($page - 1) * $items_per_page;
$Angular_DocId = $request_arr->Angular_DocId;

$result = mysqli_query($con, "SELECT  tbl_users.FirstName,tbl_users.LastName,tbl_users.profile,user_review.review,user_review.total
FROM (user_review
INNER JOIN  tbl_users ON user_review.UserId = tbl_user  s.UserId) WHERE user_review.doc_id = '$Angular_DocId' ORDER BY review_id DESC LIMIT $offset, $items_per_page");

$data = array();

while ($row = mysqli_fetch_array($result)) {

      $data[] = $row;
}

echo json_encode($data);
  
?>