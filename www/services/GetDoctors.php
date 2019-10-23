<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );

$page = $request_arr->Page;
$items_per_page = 10;
$offset = ($page - 1) * $items_per_page;

$CityName = $request_arr->Angular_CityName;
$UserId = $request_arr->Angular_UserId;
$Angular_Date= $request_arr->Angular_Date;

$result1 = mysqli_query($con, "SELECT id FROM cities WHERE name = '$CityName'");
while($row = mysqli_fetch_array($result1)){
   $CityId = $row['id'];
}

$result = mysqli_query($con, "SELECT tbl_doctor.*,doctor_speciality.*,(SELECT avg(user_review.total) FROM user_review WHERE user_review.doc_id = tbl_doctor.doc_id)  AS avg_rating,
CONCAT(GROUP_CONCAT(CONCAT(tbl_schedule.schedule))) AS schedule_times 
FROM tbl_doctor
INNER JOIN tbl_schedule ON tbl_doctor.doc_id = tbl_schedule.doc_id
INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id 
WHERE tbl_doctor.city = '$CityId' AND tbl_schedule.Start = '$Angular_Date' GROUP BY tbl_doctor.doc_id LIMIT $offset, $items_per_page");

// $result = mysqli_query($con, "SELECT tbl_doctor.*,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.city = '$CityId'");


// $result = mysql_query($con,"SELECT tbl_doctor.doc_id,tbl_doctor.city,tbl_doctor.name,tbl_doctor.profile,doctor_speciality.* FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.doc_id NOT IN (SELECT tbl_doctor.doc_id FROM tbl_doctor INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id WHERE tbl_doctor.doc_id = (SELECT doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId') OR tbl_doctor.doc_id = (SELECT works_with FROM tbl_doctor WHERE doc_id IN(SELECT tbl_doctor.doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId'))) AND tbl_doctor.city='$CityId'");



// $PersonalDocList = array();
// $index = 0;
// while ($row = mysqli_fetch_array($result)){
    
//   $time = explode(',',$row['schedule_times']);
//   $schedule = $row['tbl_schedule.schedule'];
//   $scheduleAll = array_values($time);

 
//   $PersonalDocList[] = $row;
//   $PersonalDocList[$index]['time'] = ($scheduleAll);
//   $index++;
// }

// echo json_encode($PersonalDocList);



$PersonalDocList = array();
$index = 0;
while ($row = mysqli_fetch_array($result)){
    
  $time = explode(',',$row['schedule_times']);
  $schedule = $row['tbl_schedule.schedule'];
  $scheduleAll = array_values($time);

  $times = array();
    foreach($scheduleAll as $id=>$timeStr) {
            $timeStr = (strpos($timeStr,'('))?str_replace(array("(",")"),"",$timeStr)." -1 DAY":$timeStr;
            $time = strtotime($timeStr);
            $times[$time] = $scheduleAll[$id];
    }
    ksort($times);
    $orderedStringTime = implode(",",$times); 
    $orderedStringTime1 = explode(',',$orderedStringTime);
    $orderedStringTime2 = array_values($orderedStringTime1);
    $PersonalDocList[] = $row;
    $PersonalDocList[$index]['time'] = ($orderedStringTime2);
    $index++;
}

//print_r(json_encode($PersonalDocList));
echo json_encode($PersonalDocList);
?>


