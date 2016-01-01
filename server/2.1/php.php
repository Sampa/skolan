<?php
header('Content-type: text/plain');
foreach($_GET as $key=>$value){
	echo  $key ." = ".$value . "\n";
}
