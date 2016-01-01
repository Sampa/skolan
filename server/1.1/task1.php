<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:00
 */
header('Content-type: text/plain');
$countFile = "task1_count.txt";
$count = file_get_contents($countFile)+1;
echo $count;
file_put_contents($countFile,$count);
?>