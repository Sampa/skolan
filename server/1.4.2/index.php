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
	function write($content,$contentType="text/plain"){
		echo "Content-type: ".$contentType."\n\n";
		echo $content;
		echo "--endofsection\n";
		ob_flush();
		flush();
	}
	// Här har vi vår loop som skriver ut datum och tid samt räknar ner till 0, vi sover i en sekund för att det ska bli rätt

	for($i=10;$i>=0;$i--){
		write(date("Y-m-d H:i:s ")."\n".$i);
		sleep(1);
	}
?>