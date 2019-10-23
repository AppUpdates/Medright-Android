<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$page = $_GET["PageNumber"];
$items_per_page = 1; 
$offset = ($page - 1) * $items_per_page;
$UserId = $_GET["UserId"];
$CityName = $_GET["CityName"];


$result1 = mysqli_query($con, "SELECT id FROM cities WHERE name = '$CityName'");


while($row = mysqli_fetch_array($result1)){
   $CityId = $row['id'];
}

$result = mysqli_query($con, "SELECT tbl_doctor.*,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.city = '$CityId' LIMIT $offset, $items_per_page");


$DoctorsList = array();

while ($row = mysqli_fetch_array($result)){
  $DoctorsList[] = $row;
}

echo json_encode($DoctorsList);
?>


