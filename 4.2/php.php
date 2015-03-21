<?php
$now = date('m/d/Y h:i:s a');
$cookie ="kakmonstret";
if(isset($_COOKIE["kaka"])){
	$doc = new DOMDocument();
	$doc->loadHTMLFile("results.html");
	$ul = $doc->getElementsByTagName("ul")->item(0);
	$li = $doc->createElement("li","Tid = " . $_COOKIE["tid"]);
	$li2 = $doc->createElement("li","Namn = " . $cookie);
	$ul->appendChild($li);
	$ul->appendChild($li2);
	echo $doc->saveHTML();
}else{
	date_default_timezone_set('Europe/Stockholm');
	setcookie("kaka",$cookie, time() + (3600 * 3), "/"); // 3600= 1 timme
	setcookie("tid",$now, time() + (3600 * 3), "/"); // 3600= 1 timme
}


