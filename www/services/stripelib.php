<?php

require_once('slib/init.php');

$stripe = array(
  "secret_key" => "sk_test_83BGNkq2mk77dfvfTMrVrE54",
  "publishable_key" => "pk_test_BvzPnCoSpL5ZNvnDirPrQeqC"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>