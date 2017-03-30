<?php
require 'PHPMailerAutoload.php';
/*
 * När man skickar formuläret måste till, från, ämne och meddelande vara ifyllda
 * Om lösenordet är rätt kollar vi formulärfälten och mailar om allt står rätt till.
 * Om mailet skickas iväg så skriver vi ut detaljerna som bekräftelse, annars ett felmeddelande.
 * Php mailer används för att skicka iväg det, fyll i lösenord och emailkonto för att prova
 */
if(isset($_POST['submit']) && !empty($_POST['to']) && !empty($_POST['from'])
    && !empty($_POST['subject']) && !empty($_POST['message'])){
	//kolla lösenordet först, döda scriptet om det är fel
	if($_POST['password'] != 1234) {
        die("Ogiltigt lösenord");
    }
    $mail = new PHPMailer;
    $mail->IsSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = '';
    $mail->Password = '';
    $mail->SMTPSecure = 'tls';
    $mail->setFrom($_POST['from'], 'Mailer');
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

}else{
    echo "Fälten från, till, ämne och meddelande måste vara ifyllda";
}