<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$FirstName = $request_arr->Angular_FirstName;
$LastName = $request_arr->Angular_LastName;
$Email = $request_arr->Angular_Email;
$TermsVerified = $request_arr->Angular_TermsVerified;

$Profilepic = $request_arr->Angular_FileId;
$BirthDate = $request_arr->Angular_BirthDate;
$Password1 = $request_arr->Angular_Password;                   
$Password = md5($Password1);
$Gender = $request_arr->Angular_Gender;

$MobileNo = $request_arr->Angular_MobileNo;
$Address = $request_arr->Angular_Address;
$City_Id = $request_arr->Angular_CityId;

$GcmToken = $request_arr->Angular_GcmToken;

$date = date_create();
$CreatedDate = date_timestamp_get($date);

$CityCode = $request_arr->Angular_CityCode;
$DeviceInfo = $request_arr->Angular_DeviceId;

function randomstring($len)
   {
       $string = "";
       $chars = "0123456789";
       
       for($i=0;$i<$len;$i++)
       $string.=substr($chars,rand(0,strlen($chars)),1);
       return 'MD'.$string;
   }

$RandomString = randomstring(6);

$result=mysqli_query($con,"INSERT INTO tbl_users(profile,FirstName,LastName,Email,Gender,PasswordHash,BirthDate,GcmToken,
IsTermsVerified,service_area_code,Contact,address,reg_date,DeviceInfo,MRN) VALUES('$Profilepic','$FirstName','$LastName','$Email','$Gender','$Password','$BirthDate','$GcmToken','$TermsVerified','$CityCode','$MobileNo','$Address','$CreatedDate','$DeviceInfo','$RandomString');");

$UserId = mysqli_insert_id($con); 


if($result){ 

	$result1 = mysqli_query($con, "SELECT * FROM tbl_users WHERE UserId='$UserId'");
        
        $LoginData = array();
        
        while ($row = mysqli_fetch_array($result1)) {
        
              $LoginData[] = $row;
        }
        
        echo json_encode($LoginData);
}


?>

