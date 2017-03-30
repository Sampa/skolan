<?php
	/*
	 * Vi kollar om kakor redan är satt och isåfall hämtar vi results.html och lägger till en <ul> i dom trädet med informationen som finns sparad
	 * sen skriver vi ut hela dokumentet
	 * Annars sätter vi kakorna och låter dem sparas i 3 timmar
	 */

	if(isset($_COOKIE["kaka"])){
		$doc = new DOMDocument();
		$doc->loadHTMLFile("results.html");
		$ul = $doc->getElementsByTagName("ul")->item(0);
		$li = $doc->createElement("li","Tid = " . $_COOKIE["tid"]);
		$li2 = $doc->createElement("li","Namn = " . $_COOKIE["kaka"]);
		$ul->appendChild($li);
		$ul->appendChild($li2);
		echo $doc->saveHTML();
	}else{
        // 2 variabler med den information som ska sparas som kakor
        $now = date('m/d/Y h:i:s a');
        $cookie ="kakmonstret";
		date_default_timezone_set('Europe/Stockholm');
		setcookie("kaka",$cookie, time() + (3600 * 3), "/"); // 3600s= 1 timme
		setcookie("tid",$now, time() + (3600 * 3), "/");
	}
?>
