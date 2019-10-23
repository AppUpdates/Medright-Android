<?php
require_once('config.php');


$result = mysqli_query($con, "SELECT * FROM tbl_plan");

$plan = array();


while ($row = mysqli_fetch_array($result)) {
   $plan[] = $row;
}

echo json_encode($plan);
?>


