<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:00
 */
header('Content-type: multipart/x-mixed-replace;boundary=endofsection');

function write($content,$contentType="text/plain"){
	echo "Content-type: ".$contentType."\n\n";
	echo $content;
	$countFile = "task1_count.txt";
	$count = file_get_contents($countFile);
	echo $count;
	echo "--endofsection\n";
	ob_flush();
	flush();
	return $count;
}
// Displays plain text

while(true){
	write(date("Y-m-d H:i:s ")."\n");
	sleep(2);
}
?>