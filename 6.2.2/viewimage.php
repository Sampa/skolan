<?php
/* Koden Hämtar och visar en bild från databasen */
include_once("db.php");
header("Content-type: image/png");
$conn = connectDb();
$image = $conn->query("SELECT * FROM image WHERE comment_id =".$_GET['id']." LIMIT 1");
$image = $image->fetch_row()[1]; //första resultatet, andra kolumnen (namn)
$conn->close();
echo $image;
