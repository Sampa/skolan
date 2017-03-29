<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:00
 */
/*
 * Öpnnar filen för att kunna läsa antalet besök och spara det i en variabel (+1 för det nyaste besöket)
 * utan att nollställa filen först med file_get_contents
 * flock() används för att låsa filen medans vi skriver in det nya antalet besök för att undvika krockar
 * filen släpps och stängs sedan.
 */
//    header('Content-type: text/plain');
    $path = "task1_count.txt";
    $count = file_get_contents($path)+1;
    echo $count;
    $countFile = fopen($path,"w+");
if(flock($countFile,LOCK_EX | LOCK_NB)){
    fwrite($countFile,$count);
    flock($countFile,LOCK_UN);
}else{
        echo "Kunde inte låsa filen";
    }
    fclose($countFile);
?>