<?php
/*
 * Funkar bara i firefox
 */
//först sätter vi headern för att använda oss av server-push
header('Content-type: multipart/x-mixed-replace;boundary=endofsection');
/*
 * Functionen tar emot innehåll och skriver ut det som vanlig text
 * Sen tömmer vi buffern med ob_flush() och flush() för annars blir det problem med headern
 */
header('Content-type: multipart/x-mixed-replace;boundary=endofsection');

function write($content,$contentType="text/plain"){
	echo "Content-type: ".$contentType."\n\n";
	echo $content;
	echo "\n--endofsection\n";
	ob_flush();
	flush();
}
//vi börjar med vanlig text
$contentType="text/plain";
//evighetsloop som kollar contentType och  skriver ut lite innehåll baserat på den och ändrar sedan contentType till något annat
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