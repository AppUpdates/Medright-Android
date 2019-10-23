<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$CityName = $request_arr->Angular_CityName;
$UserId = $request_arr->Angular_UserId;

$result1 = mysqli_query($con, "SELECT id FROM cities WHERE name = '$CityName'");


while($row = mysqli_fetch_array($result1)){
   $CityId = $row['id'];
}

$result = mysqli_query($con, "SELECT tbl_doctor.*,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.city = '$CityId' AND tbl_doctor.IsAvailable=1");

$data = array();

while ($row = mysqli_fetch_array($result)){
  $data[] = $row;
}

echo json_encode($data);
?>


