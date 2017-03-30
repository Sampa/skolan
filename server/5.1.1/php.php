<?php
require 'PHPMailerAutoload.php';
/*
 * Om lösenordet är rätt kollar vi formulärfälten och mailar om allt står rätt till.
 * Om mailet skickas iväg så skriver vi ut detaljerna som bekräftelse, annars ett felmeddelande.
 */
if(isset($_POST['submit'])){
	//kolla lösenordet först, döda scriptet om det är fel
	if($_POST['password'] != 1234) {
        die("Ogiltigt lösenord");
    }
    $mail = new PHPMailer;
    $mail->IsSMTP();
    $mail->SMTPDebug =2;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'idrini@gmail.com';
    $mail->Password = 'draddydagols666';
    $mail->SMTPSecure = 'tls';

    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress($_POST['to']);
    $mail->addReplyTo('idrini@gmail.com', 'Information');
    $mail->addCC($_POST['cc']);
    $mail->addBCC($_POST['bcc']);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = $_POST['message'];
	if($mail->send()){
		echo "Skickat!\n";
		foreach($_POST as $key=>$field){
			echo $key . " : " . $field ."\n";
		}
		echo "Observera! Detta meddelande är sänt från ett formulär på Internet och avsändaren kan vara felaktig!";
	}else{
		echo "Mailet kunde inte skickas";
	}

}