<?php
//Ifyllt?
if(validateForm($_POST)==0){
	echo "Minimum 1 character";
}

/* Första formuläret */
if(validateForm($_POST)==1){
	$html = file_get_contents("2.html");
	$name = $_POST['name'];
	eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
}


/*Andra formuläret*/
if(validateForm($_POST)==2){
	foreach($_POST as $key=>$value){
		echo $key . ": ". $value . "<br/>";
	}
}

function validateForm($post){
	if(isset($post['button']) && isset($post['name']) && strlen($post['name']) > 0 && isset($post['email'])){
		return 2; //true och andra formuläret
	}elseif(isset($post['button']) && isset($post['name']) && strlen($post['name']) > 0){
		return 1; //true och första formuläret
	}
	return 0; //någon gjort fel
}
?>
