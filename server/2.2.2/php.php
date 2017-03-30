<?php
/*
    snodde den här funktionen från nätet bara för att skriva ut det lite snyggare än i bara bytes
	Kommeenterade den själv för att förstå den
*/
function display_filesize($filesize){
//om värdet man skickar in är ett tal
	if(is_numeric($filesize)){
		//initierar variabler
		$decr = 1024;
		$step = 0;
		//olika prefix i storleksordning
		$prefix = array('Byte','KB','MB','GB','TB','PB');
		//sålänge storleken kan delas med 1024 är mer är mer än 0,9 kan vi skriva ut med ett större prefix
		while(($filesize / $decr) > 0.9){
			//ändra filesize till så det mäts i rätt prefix och så vi delar ett nytt tal med 1024 nästa loop
			$filesize = $filesize / $decr;
			//öka vilket varv vi kör för att kunna hämta ut rätt prefix senare
			$step++;
		}
		//returnera det avrundade talet (2 decimaler), och skriv ut det prefix vi nådde innan filesize var så nära 1 som möjligt utan att vara mindre
		return round($filesize,2).' '.$prefix[$step];
	} else {
		//man skicka en fel typ av variabel i functionen
		return 'NaN';
	}

}
/*
 * Detta har jag skrivit själv
 * När man försöker ladda upp filen sätts $_POST['upload']
 * Då skapas en array med de contenttypes vi vill behandla på ett sätt, om filen har en av de typerna skrivs den ut med den
 * typen. Annars skrivs filnamnet, filstorleken och typen ut
 */
if(isset($_POST['upload'])){
	$mimeTypes = ["text/plain","image/jpeg","image/png"];
	if(in_array($_FILES['file']['type'],$mimeTypes)){
		//om man vill spara filen
//		move_uploaded_file($_FILES['file']['tmp_name'],"uploads/".$_FILES['file']['name']);
		header("Content-Type: ".$_FILES['file']['type']);
		echo file_get_contents($_FILES['file']['tmp_name']);
	}else{
		echo "Filnamn: ".$_FILES['file']['name'] ."\n";
		echo "Filstorlek: ".display_filesize($_FILES['file']['size']) ."\n";
		echo "Mime-type: ".$_FILES['file']['type'];
	}
}