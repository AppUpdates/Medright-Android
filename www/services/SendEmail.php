<?php


require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$Email = $request_arr->Angular_Email;

$query = mysqli_query($con, "SELECT * FROM tbl_users WHERE Email='$Email'") or die(mysql_error()); 
$CategoryList = array();
while ($row = mysqli_fetch_array($query)) {
    $CategoryList[] =  $row['PasswordHash'];  
}

$pass = base64_decode($CategoryList[0]);

echo $pass;



if(mysqli_num_rows($query) >0){
    include('Mailer/PHPMailerAutoload.php');
    //PHPMailer Object
    $mail = new PHPMailer;

    //From email address and name
    $mail->From = "shalukanki@gmail.com";
    $mail->FromName = "MedRight Healthcare";
    
    //To address and name
    $mail->addAddress($Email);
    
    
    
    //Send HTML or Plain Text email
    $mail->isHTML(true);
    
    $mail->Subject = "Your Password is";
    $mail->Body = "<b>Password: $pass </b>";
    // $mail->AltBody = "This is the plain text version of the email content";
    
    if(!$mail->send()) 
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } 
    else 
    {
        echo "success";
    }
}
?>