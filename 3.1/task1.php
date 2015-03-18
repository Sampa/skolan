<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:00
 */
header('Content-type: text/html');
$countFile = "task1_count.txt";
$htmlFile = "task3.1.html";
$count = file_get_contents($countFile)+1;
$html = file_get_contents($htmlFile);
preg_replace("/(<p>)*(</p>)","<p>".$count."</p>",$html);
file_put_contents($countFile,$count);
echo $html;
?>