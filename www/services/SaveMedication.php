<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UserId = $request_arr->Angular_UserId;
$Angular_patientId = $request_arr->Angular_patientId;
$Angular_MedicationName = $request_arr->Angular_MedicationName;
$Angular_Frequency = $request_arr->Angular_Frequency;
$Angular_Dosage = $request_arr->Angular_Dosage;
$Angular_CreatedDate = $request_arr->Angular_CreatedDate;

$result1=mysqli_query($con, "INSERT INTO Medication(UserId,DocId,Medication_Name,Dosage,Frequency,created_on) values('$Angular_patientId','$Angular_UserId','$Angular_MedicationName','$Angular_Dosage','$Angular_Frequency','$Angular_CreatedDate')");


?>

