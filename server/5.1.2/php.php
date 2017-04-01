<?php
require 'PHPMailerAutoload.php';
/*
 * När man skickar formuläret måste till, från, ämne och meddelande vara ifyllda
 * Om lösenordet är rätt kollar vi formulärfälten och mailar om allt står rätt till.
 * Om mailet skickas iväg så skriver vi ut detaljerna som bekräftelse, annars ett felmeddelande.
 * Php mailer används för att skicka iväg det, fyll i lösenord och emailkonto för att prova
 * Vi kollar även om man försökt ladda upp 0,1 eller 2 filer och lägger isåfall till dem
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
    $mail->Username = 'idrini@gmail.com';
    $mail->Password = 'draddydagols666';
    $mail->SMTPSecure = 'tls';
    $mail->setFrom($_POST['from'], 'Mailer');
    $mail->addAddress($_POST['to']);
    $mail->addReplyTo('idrini@gmail.com', 'Information');
    $mail->addCC($_POST['cc']);
    $mail->addBCC($_POST['bcc']);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = $_POST['message'];
    if($_FILES['file1']['error'] === UPLOAD_ERR_OK)
        $mail->addAttachment($_FILES['file1']['tmp_name'],$_FILES['file1']['name']);
    if($_FILES['file2']['error'] === UPLOAD_ERR_OK)
        $mail->addAttachment($_FILES['file1']['tmp_name'],$_FILES['file2']['name']);
	if($mail->send()){
		echo nl2br("Skickat!\n");
		foreach($_POST as $key=>$field){
            if($key == "submit")
                continue;
			echo nl2br($key . " : " . $field ."\n");
		}
        foreach($_FILES as $key=>$file){
            echo nl2br($key . " : " . $file['name'] . " Storlek: " . $file['size'] . "b\n");
        }
		echo "Observera! Detta meddelande är sänt från ett formulär på Internet och avsändaren kan vara felaktig!";

	}else{
		echo "Mailet kunde inte skickas";
	}

}else{
    echo "Fälten från, till, ämne och meddelande måste vara ifyllda";
}
