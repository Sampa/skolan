<?php
header('Content-type: text/plain');
foreach($_POST as $key=>$value){
	echo  $key ." = ".$value . "\n";
}
