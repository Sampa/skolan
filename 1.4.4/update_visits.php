
<?php
$countFile = "task1_count.txt";
$count = file_get_contents($countFile)+1;
echo $count;
file_put_contents($countFile,$count);
?>
