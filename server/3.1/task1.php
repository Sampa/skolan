<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:00
 */
header('Content-type: text/html');

//fixa räkningen
$countFile = "task1_count.txt";
$count = file_get_contents($countFile)+1;
file_put_contents($countFile,$count);

//visa räkning
$html = file_get_contents("task3.1.html");
eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
?>