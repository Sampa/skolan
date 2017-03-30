<?php
	/*
	 * Sätter content type till text/plain och loopar igenom $_POST som innehåller alla formulärfält och dess värden
	 * Varje namn->värde par skrivs ut på en egen rad
	 */
	header('Content-type: text/plain');
	foreach($_POST as $key=>$value){
		echo  $key ." = ".$value . "\n";
	}
?>