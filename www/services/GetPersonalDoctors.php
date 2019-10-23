<?php

require_once('config.php');
$request_arr = json_decode( file_get_contents('php://input') );


$page = $request_arr->Page;
$UserId = $request_arr->UserId;
$Angular_Date= $request_arr->Angular_Date;

$items_per_page = 10;
$offset = ($page - 1) * $items_per_page;

$result1 = mysqli_query($con, "SELECT
tbl_doctor.doc_id,tbl_doctor.off_address,tbl_doctor.name,tbl_doctor.lname,tbl_doctor.profile,tbl_doctor.emer_contact,tbl_doctor.email,tbl_doctor.IsAvailable,doctor_speciality.*, 
  tbl_schedule.start,
 (SELECT avg(user_review.total) FROM user_review WHERE user_review.doc_id = tbl_doctor.doc_id)  AS avg_rating,
  CONCAT(GROUP_CONCAT(CONCAT(tbl_schedule.schedule)))  AS schedule_times
FROM
  tbl_doctor 
  
INNER JOIN tbl_schedule ON tbl_doctor.doc_id = tbl_schedule.doc_id
INNER JOIN doctor_speciality ON tbl_doctor.speciality=doctor_speciality.id
 WHERE tbl_schedule.Start='$Angular_Date' AND (tbl_doctor.doc_id = (SELECT doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId') OR tbl_doctor.doc_id = (SELECT works_with FROM tbl_doctor WHERE doc_id IN(SELECT doc_id FROM tbl_doctor INNER JOIN tbl_users ON tbl_users.service_provider = tbl_doctor.doc_id WHERE tbl_users.UserId = '$UserId'))) GROUP BY
  tbl_doctor.doc_id ");

$PersonalDocList = array();
$index = 0;
while ($row = mysqli_fetch_array($result1)){
    
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


