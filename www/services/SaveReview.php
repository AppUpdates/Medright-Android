<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_UId =$request_arr->Angular_UId;
$Angular_DoctoreId1 =$request_arr->Angular_DoctoreId1;
$Angular_Review = $request_arr->Angular_Review;
$Angular_Rate = $request_arr->Angular_Rate;

$result = mysqli_query($con, "SELECT * from user_review WHERE UserId='$Angular_UId' AND doc_id='$Angular_DoctoreId1'");

  

  if(mysqli_num_rows($result)!=0){
    
    $result1 = mysqli_query($con,"UPDATE user_review SET review='$Angular_Review', total='$Angular_Rate' WHERE UserId='$Angular_UId' AND doc_id='$Angular_DoctoreId1'");

       if($result1){
            echo 'sucess';
       }

       else{
          echo 'error';
       } 
  
}
else{

$result1 = mysqli_query($con, "INSERT INTO  user_review (UserId,doc_id,review,total)
	
VALUES ('$Angular_UId','$Angular_DoctoreId1','$Angular_Review','$Angular_Rate')");

if(result1){
 echo 'sucess';   
}

else{
    
    echo 'error';
}
    
}
?>