<?php
	//wi kollar om fältet är i fyllt?
	if(validateForm($_POST)==0){
		echo "Minimum 1 character";
	}
	/* Vi kollar vilket formulär det är
	 * Hämtar isåfall det andra formuläret och visar det med värdet från första i det dolda fältet
	 * Annars loopar vi formuläret och visar dess värden om det är ett inputfält
	*/
	//Första formuläret
	if(validateForm($_POST)==1){
		$html = file_get_contents("2.html");
		$name = $_POST['name'];
		eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
	} else if(validateForm($_POST)==2){/*Andra formuläret*/
		foreach($_POST as $key=>$value){
            if($key=="button")
                continue;
			echo $key . ": ". $value . "<br/>";
		}
	}
    /*
     * Funktion som validerar formuläret genom att kolla att fälten är satta och tillräckligt stora.
     * Returnera en siffra som berättar vilket formulär det är som skickats.
     */
	function validateForm($post){
		if(isset($post['button']) && isset($post['name']) && strlen($post['name']) > 0 && isset($post['email'])){
			return 2; //true och andra formuläret
		}elseif(isset($post['button']) && isset($post['name']) && strlen($post['name']) > 0){
			return 1; //true och första formuläret
		}
		return 0; //någon gjort fel
	}
?>
