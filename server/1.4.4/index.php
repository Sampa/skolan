<?php
/**
 * Prova uppdatera besöksräknaren via uppgift 1.1
 */
/*
 * Funkar bara i firefox
 */

//först sätter vi headern för att använda oss av server-push
header('Content-type: multipart/x-mixed-replace;boundary=endofsection');
/*
 * Functionen tar emot innehåll och contenttype som parametrar och skriver ut innehållet med den contenttype som skickas med
 * default är text/plain.
 * Sen hämtas antalet besök från samma fil som i uppgift 1.1 och skrivs ut
 * Sen tömmer vi buffern med ob_flush() och flush() för annars blir det problem med headern
 */
function write($content,$contentType="text/plain"){
	echo "Content-type: ".$contentType."\n\n";
	echo $content;
	$countFile = "../1.1/task1_count.txt";
	$count = file_get_contents($countFile);
	echo $count;
	echo "--endofsection\n";
	ob_flush();
	flush();
}
//skriver ut datumet och vilar ett par sekunder så att det hela hinner synas för användaren
while(true){
	write(date("Y-m-d H:i:s ")."\n");
	sleep(2);
}
?>