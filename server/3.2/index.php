<?php
	header('Content-type: text/html');
	//vilka vi vill visa
	$values = array(
		"REMOTE_ADDR",
		"REMOTE_PORT",
		"REQUEST_METHOD",
		"REQUEST_URI",
		"HTTP_ACCEPT",
		"HTTP_ACCEPT_ENCODING",
		"HTTP_ACCEPT_LANGUAGE",
		"HTTP_CACHE_CONTROL",
		"HTTP_CONNECTION",
		"HTTP_DNT",
		"HTTP_HOST",
		"HTTP_USER_AGENT",
		"GATEWAY_INTERFACE",
		"DOCUMENT_ROOT",
		"PATH",
		"SCRIPT_FILENAME",
		"SCRIPT_NAME",
		"SERVER_ADDR",
		"SERVER_ADMIN",
		"SERVER_NAME",
		"SERVER_PORT",
		"SERVER_PROTOCOL",
		"SERVER_SOFTWARE",
		"REDIRECT_STATUS",
		"HTTP_COOKIE",
		"HTTP_REFERER",
		"SCRIPT_URI",
		"SCRIPT_URL",
	);
	//traversera html med ett dom objekt
	$doc = new DOMDocument();
	$doc->loadHTMLFile("task.html");
	//hitta vår tabell
	$table = $doc->getElementsByTagName("tbody")->item(0);
	//vår template rad (kunde haft id:n för annan html markup än tables)
	$row = $doc->getElementsByTagName("tr")->item(1);
	//ta bort den ur dom:en då den bara är template
	$table->removeChild($row);
    //lägg till en rad för varje värde i vår array med rätt namn och värden
	foreach($values as $key){
		addNode($row,$key,getenv($key),$table);
	}
    //samma som ovan fast för övriga informations värden
	$server = array("PHP_SELF","REQUEST_TIME_FLOAT","REQUEST_TIME","SERVER_SIGNATURE","QUERY_STRING",);
	foreach($server as $key){
		addNode($row,$key,$_SERVER[$key],$table);
	}
	//Skriv ut det färdiga resultatet
	echo $doc->saveHTML();

	/* funktionen tar emot rad templaten, ett namn ur en av våra array:er, dess värde, och tabell objektet
	 * Sedan läggs helt enkelt en ny rad till med rätt text baserat på dessa värden
	*/
	function addNode($row,$key,$value,$table){
		$row = $row->cloneNode(true);
		$row->childNodes->item(0)->nodeValue = $key;
		$row->childNodes->item(2)->nodeValue = $value;
		$table->appendChild($row);
	}
?>

