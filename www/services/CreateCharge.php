<?php

// require_once('config.php');

// $request_arr = json_decode( file_get_contents('php://input') );

\Stripe\Stripe::setApiKey("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

// Token is created using Stripe.js or Checkout!
// Get the payment token ID submitted by the form:
$token = 'tok_1B8Tjc2eZvKYlo2CqS6iXkIi';

$customer = \Stripe\Customer::create(array(
  "email" => "paying.user@example.com",
  "source" => $token,
));

// Charge the Customer instead of the card:
$charge = \Stripe\Charge::create(array(
  "amount" => 1000,
  "currency" => "usd",
  "customer" => $customer->id
));

// YOUR CODE: Save the customer ID and other info in a database for later.

// YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
$charge = \Stripe\Charge::create(array(
  "amount" => 1500, // $15.00 this time
  "currency" => "usd",
  "customer" => $customer_id
));

?>



