<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$user_id =$request_arr->user_id;

$name =$request_arr->name;
$gender = $request_arr->gender;
$dob = $request_arr->dob;
$merital_status = $request_arr->merital_status;

$ref_doctor = $request_arr->ref_doctor;
$date_of_exam = $request_arr->date_of_exam;
$emergency_phone = $request_arr->emergency_phone;

$childhood_illness =$request_arr->childhood_illness;
$surgerie_year = $request_arr->surgerie_year;
$surgerie_reason = $request_arr->surgerie_reason;
$surgerie_hospital = $request_arr->surgerie_hospital;

$hospitalizations_year = $request_arr->hospitalizations_year;
$hospitalizations_reason = $request_arr->hospitalizations_reason;
$hospitalizations_hospital = $request_arr->hospitalizations_hospital;

$drug_name = $request_arr->drug_name;
$drug_frequency = $request_arr->drug_frequency;

$drug_name_allergies = $request_arr->drug_name_allergies;
$drug_reaction = $request_arr->drug_reaction;

$excercise = $request_arr->excercise;
$excercise_desc = $request_arr->excercise_desc;

$alcohol = $request_arr->alcohol;
$no_of_drinks = $request_arr->no_of_drinks;

$tobacco = $request_arr->tobacco;

$sex_active = $request_arr->sex_active;
$hiv_yes = $request_arr->hiv_yes;

$current_date = $request_arr->current_date;
$current_time = $request_arr->current_time;

$history_form_id_app = $request_arr->history_form_id_app;




$result = mysqli_query($con, "SELECT * from health_history_form WHERE user_id='$user_id'");

if(mysqli_num_rows($result) == 0){
    
        $result2=mysqli_query($con, "INSERT INTO health_history_form (user_id, name, gender, dob, merital_status, ref_doctor, date_of_exam, emergency_contact, childhood_illness, is_excercise, excercise_description, is_alcohol, drinks_per_week, is_tobacco, sex_active, is_hiv, created_date, created_time, modify_date, modify_time) 

        values('$user_id','$name','$gender','$dob','$merital_status','$ref_doctor','$date_of_exam','$emergency_phone','$childhood_illness','$excercise','$excercise_desc','$alcohol','$no_of_drinks','$tobacco','$sex_active','$hiv_yes', '$current_date' ,'$current_time' , '$current_date' ,'$current_time')");

  if(result2){




        $result3 = mysqli_query($con, "SELECT * from health_history_form WHERE user_id = '$user_id'");

        $user_history = array();

        while ($row = mysqli_fetch_array($result3)) {
           $health_form_id = $row['id'];
        }



        $result4 = mysqli_query($con, "INSERT INTO health_history_surgeries (history_form_id, year, reason, hospital, created_date, created_time, modify_date, modify_time) 

        values ('$health_form_id','$surgerie_year','$surgerie_reason','$surgerie_hospital', '$current_date' ,'$current_time' , '$current_date' ,'$current_time')");


        $result5 = mysqli_query($con, "INSERT INTO health_history_hospitalization (history_form_id, year, reason, hospital, created_date, created_time, modify_date, modify_time) 

        values('$health_form_id','$hospitalizations_year','$hospitalizations_reason','$hospitalizations_hospital', '$current_date' ,'$current_time' , '$current_date' ,'$current_time')");


        $result6 = mysqli_query($con, "INSERT INTO health_history_drugs (history_form_id, drug_name, drug_frequency, created_date, created_time, modify_date, modify_time) 

        values('$health_form_id','$drug_name','$drug_frequency','$current_date' ,'$current_time' , '$current_date' ,'$current_time')");


        $result7 = mysqli_query($con, "INSERT INTO health_history_allergies (history_form_id, drug_name, drug_reaction, created_date, created_time, modify_date, modify_time) 

        values('$health_form_id','$drug_name_allergies','$drug_reaction','$current_date' ,'$current_time' , '$current_date' ,'$current_time')");


  }
 
 
 echo 'success';
   

}


else{


   $result8 = mysqli_query($con, "UPDATE  health_history_form SET name='$name', gender='$gender', dob='$dob', merital_status='$merital_status', ref_doctor='$ref_doctor', date_of_exam='$date_of_exam', emergency_contact='$emergency_phone', childhood_illness='$childhood_illness', is_excercise='$excercise', excercise_description='$excercise_desc', is_alcohol='$alcohol', drinks_per_week='$no_of_drinks', is_tobacco='$tobacco', sex_active='$sex_active', is_hiv='$hiv_yes', modify_date='$current_date', modify_time='$current_time' WHERE id='$history_form_id_app'");

        if($surgerie_year != null){
        $result9 = mysqli_query($con, "INSERT INTO health_history_surgeries (history_form_id, year, reason, hospital, created_date, created_time, modify_date, modify_time) 

        values('$history_form_id_app','$surgerie_year','$surgerie_reason','$surgerie_hospital', '$current_date' ,'$current_time' , '$current_date' ,'$current_time')");
        }
        
        
        if($hospitalizations_year != null){
        $result10 = mysqli_query($con, "INSERT INTO health_history_hospitalization (history_form_id, year, reason, hospital, created_date, created_time, modify_date, modify_time) 

        values('$history_form_id_app','$hospitalizations_year','$hospitalizations_reason','$hospitalizations_hospital', '$current_date' ,'$current_time' , '$current_date' ,'$current_time')");
        }
        
        
        if($drug_name != null){
        $result11 = mysqli_query($con, "INSERT INTO health_history_drugs (history_form_id, drug_name, drug_frequency, created_date, created_time, modify_date, modify_time) 

        values('$history_form_id_app','$drug_name','$drug_frequency','$current_date' ,'$current_time' , '$current_date' ,'$current_time')");
        }
        
        
        if($drug_name_allergies != null){
        $result12 = mysqli_query($con, "INSERT INTO health_history_allergies (history_form_id, drug_name, drug_reaction, created_date, created_time, modify_date, modify_time) 

        values('$history_form_id_app','$drug_name_allergies','$drug_reaction','$current_date' ,'$current_time' , '$current_date' ,'$current_time')");
        }
        
  echo 'error';

}


?>