<?php

$name = $_POST['name'];
$returnEmail = $_POST['email'];
$msg = $_POST['msg'];


$to_email = "thematthaslem@gmail.com";
$subject = "Message from Resume Website";
$body = "
Name: $name \n
E-mail: $returnEmail \n\n
Message: $msg
";


// echo $body;

$headers = "Reply-to: The Sender < $returnEmail >";
$headers .= "Organization: Sender Organization\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";

if (mail($to_email, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "Email sending failed...";
}

?>
