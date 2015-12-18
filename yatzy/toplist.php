<?php
    include_once("db.php");
    $conn = connectDb();
    $result = mysqli_query($conn,"SELECT * FROM yatzy ORDER BY score DESC LIMIT 10");
    foreach($result as $row){
        echo"<tr><td>";
        echo $row['player'];
        echo "</td><td >";
        echo $row['score'];
        echo "</td></tr>";
    }
?>