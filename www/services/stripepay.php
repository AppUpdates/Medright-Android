<?php

require_once('slib/init.php');
require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );


$Angular_UserId = $request_arr->Angular_UserId;
$Angular_TranId = $request_arr->Angular_TranId;
$Angular_CurId = $request_arr->Angular_CurId;
$Angular_PayStatus = $request_arr->Angular_PayStatus;
$Angular_PayType = $request_arr->Angular_PayType;
$Angular_CardNo = $request_arr->Angular_CardNo;
$Angular_EmailId = $request_arr->Angular_EmailId;

$Angular_amount = $request_arr->Angular_amount;
$Anular_Token = $request_arr->Angular_Token;



$stripe = array(
  "secret_key" => "sk_test_83BGNkq2mk77dfvfTMrVrE54",
  "publishable_key" => "pk_test_BvzPnCoSpL5ZNvnDirPrQeqC"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);

  $customer = \Stripe\Customer::create(array(
      'email' => $Angular_EmailId,
      'source'  => $Anular_Token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => $Angular_amount,
      'currency' => 'usd'
  ));
  
 
 $result = mysqli_query($con, "UPDATE tbl_users SET transaction_id='$Angular_TranId' WHERE UserId='$Angular_UserId'");

  $result1 = mysqli_query($con, "INSERT INTO Payment(userId,transaction_id,currency_code,payment_status,payment_type,card_number,payer_email,amount) values('$Angular_UserId','$Angular_TranId','$Angular_CurId','$Angular_PayStatus','$Angular_PayType','$Angular_CardNo','$Angular_EmailId','$Angular_amount')");

  echo 'success';
?>