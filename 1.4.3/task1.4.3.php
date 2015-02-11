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
	echo "\n--endofsection\n";
	ob_flush();
	flush();
}
// Displays plain text
$contentType="text/plain";
//for($i=10;$i>=0;$i--){
while(true){
	if($contentType=="text/plain"){
		write(date("Y-m-d H:i:s "),$contentType);
		$contentType="image/gif";
	}elseif($contentType=="image/gif"){
		write(file_get_contents("test.gif"),$contentType);
		$contentType="text/html";
	}else{
		write("<h1>hej</h1>"."<br/>",$contentType);
		$contentType = "text/plain";
	}
	sleep(1);
}
?>