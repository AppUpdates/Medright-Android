<?php  
    $path = "uploads/";
    $filename=basename( $_FILES['file']['name']);
     
    $path = $path . basename( $_FILES['file']['name']);
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path) ){
       echo "success";
    }
     else{
        echo "fail";
    }
?>