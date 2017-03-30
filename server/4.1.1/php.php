<?php
    /*
     *
     */
    $html = file_get_contents("2.html");
    $name = $_GET['name'];
    eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
?>
