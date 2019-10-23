<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->Angular_UserId;
$TranId = $request_arr->Angular_TranId;
$CurCode = $request_arr->Angular_CurCode;
$PStatus = $request_arr->Angular_PStatus;
$PType = $request_arr->Angular_PType;
$CardNo = $request_arr->Angular_CardNo;
$PEmail = $request_arr->Angular_PEmail;
$amount = $request_arr->Angular_amount;
$PDate = date('Y-m-d H:i:s');




$result1=mysqli_query($con, "INSERT INTO Payment(userId,transaction_id,currency_code,payment_status,payment_type,card_number,payer_email,added_date,amount) values('$UserId','$TranId','$CurCode','$PStatus','$PType','$CardNo','$PEmail','$PDate','$amount')");

$result2=mysqli_query($con, "UPDATE tbl_users SET transaction_id='$TranId' WHERE UserId='$UserId'");



if($result1){
  echo "success";
}
else{
  echo "fail";    
}
?>

