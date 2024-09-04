<?php

$myemail = 'aneslamri69110@gmail.com';

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$to = $myemail;
$email_subject = "$subject";
$email_body = "\n Name: $name \n Email: $email \n Subject: $subject \n Message: \n $message";
$headers = "From: $email";
$headers = "Content-type:text/html; charset='UTF-8'";

mail($to, $email_subject, $email_body, $headers);
?>