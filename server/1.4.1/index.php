<?php
/*
 * Skriver ut datum och tid och uppdaterar en gång i sekunden
 */
    header("Refresh: 1");
    echo date("Y-m-d H:i:s");
?>
