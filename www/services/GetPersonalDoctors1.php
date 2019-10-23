<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$page = $_GET["Page"];
$UserId = $_GET["UserId"];
$items_per_page = 10; 
$offset = ($page - 1) * $items_per_page;

// $result1 = mysqli_query($con, "SELECT tbl_users.service_provider,tbl_doctor.doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider=tbl_doctor.doc_id WHERE tbl_users.UserId='$UserId'");


$result1 = mysqli_query($con, "SELECT tbl_doctor.doc_id,tbl_doctor.off_address,tbl_doctor.name,tbl_doctor.lname,tbl_doctor.profile,tbl_doctor.emer_contact,tbl_doctor.email,tbl_doctor.IsAvailable,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.doc_id = (SELECT doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId') OR tbl_doctor.doc_id = (SELECT works_with FROM tbl_doctor WHERE doc_id IN(SELECT doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId')) LIMIT $offset, $items_per_page");

$PersonalDocList = array();

while ($row = mysqli_fetch_array($result1)){
  $PersonalDocList[] = $row;
}

echo json_encode($PersonalDocList);

?>


