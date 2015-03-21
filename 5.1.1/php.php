<?php
if(isset($_POST['submit'])){
//	var_export($_POST);
	//kolla lösenordet först
	if($_POST['password'] != 1234)
		echo "Ogiltigt lösenord";

	$to = $_POST['to'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
//	mail($to,$subject,$message);
	if(mail($to,$subject,$message)){
		echo "Skickat!<br/>";
		foreach($_POST as $key=>$field){
			echo $key . " : " . $field ."<br/>";
		}
		echo "Observera! Detta meddelande är sänt från ett formulär på Internet och avsändaren kan vara felaktig!";
	};

}