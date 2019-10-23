<?php

require("config.php");

$request_arr = json_decode( file_get_contents('php://input') );

$UserId = $request_arr->UserId;
$Patient_Email = $request_arr->Email;
$FirstName = $request_arr->FirstName;
$LastName = $request_arr->LastName;
$Contact = $request_arr->Contact;

// $UserId = '348';
// $Patient_Email = 'priya@gmail.com';
// $FirstName = 'priya';
// $LastName = 'wagh';

$query = mysqli_query($con, "SELECT Email FROM tbl_users WHERE UserId='1'") or die(mysql_error()); 
$CategoryList = array();
while ($row = mysqli_fetch_array($query)) {
    $CategoryList[] =  $row['Email'];  
}

// $Email = $CategoryList[0];
$Email = 'kobyenergy@gmail.com';
//$Email = 'w.priyanka34@gmail.com';
//echo $Email;


if(mysqli_num_rows($query) >0){
    include('Mailer/PHPMailerAutoload.php');
//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;
//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "decode.success@gmail.com";
//Password to use for SMTP authentication
$mail->Password = "Dhrup@123";
//Set who the message is to be sent from
$mail->setFrom('medrighthealthcare@gmail.com', 'MedRight Healthcare');
//Set an alternative reply-to address
$mail->addReplyTo('medrighthealthcare@gmail.com', 'MedRight Healthcare');
//Set who the message is to be sent to
$mail->addAddress($Email, 'MedRight Healthcare');
//Set the subject line
$mail->Subject = 'New Patient Alert!!! Cash Registration';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML();

$mail->Body = '
<html>
<head>  
  <title>New Patient Alert!!! Cash Registration</title>
</head>
<body>
<html>
<body>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>Hooray!!! </b></span></p>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>'.$FirstName.'&nbsp;'.$LastName.', </b></span></p>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>Is ready to take advantage of all the goodies MedRight Healthcare has to offer. His/ Her preferred payment mode is cash. Lets reach out to him/ her with a warm welcome and directions as to how to complete the payment process for the annual membership.</b></span></p>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>REMINDER - Payment can be made directly into the MedRight Healthcare bank account or through Hubtel Mobile Money option to complete the registration process.  </b></span></p>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>Patient Details - '.$Patient_Email.'  / '.$Contact.' </b></span></p>
<p>
<span style="font-family:tahoma,geneva,sans-serif;""><b>P.S. Dont forget to update their payment status from pending to approved with "Admin Panel".</b></span></p>
</body>
</html>'; 
	$mail->send();
    
 
    // if(!$mail->send()) 
    // {
    //     echo "Mailer Error: " . $mail->ErrorInfo;
    // } 
    // else 
    // {
    //     echo "success";
    // }
}
else{
echo "no user found";
    
}
?>