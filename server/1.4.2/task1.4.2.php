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
	echo "--endofsection\n";
	ob_flush();
	flush();
}
// Displays plain text

for($i=10;$i>=0;$i--){
	write(date("Y-m-d H:i:s ")."\n".$i);
	sleep(1);
}
?>