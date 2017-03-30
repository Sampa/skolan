<?php
/*
 * Öpnnar filen för att kunna läsa antalet besök och spara det i en variabel (+1 för det nyaste besöket)
 * utan att nollställa filen först med file_get_contents
 * flock() används för att låsa filen medans vi skriver in det nya antalet besök för att undvika krockar
 * filen släpps och stängs sedan.
 */
    header('Content-type: text/html');
    $path = "task1_count.txt";
    $count = file_get_contents($path)+1;
    $countFile = fopen($path,"w+");
    if(flock($countFile,LOCK_EX | LOCK_NB)){
        fwrite($countFile,$count);
        flock($countFile,LOCK_UN);
    }else{
        echo "Kunde inte låsa filen";
    }
    fclose($countFile);
    //vi hämtar vårt html dokument och ersätter --$count-- med räkningen med hjälp av preg_replace och eval() gör att vi skriver ut det hela
    $html = file_get_contents("task3.index.html");
    eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");

?>
