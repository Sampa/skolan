<?php
//loopar igenom alla namn->värde par i $_GET och skriver ut dem på varsin rad
header('Content-type: text/plain');
foreach($_GET as $key=>$value){
	echo  $key ." = ". $value . "\n";
}
?>
