<?php
    /* Koden Hämtar och visar en bild från databasen med rätt content type*/
    include_once("db.php");
    $conn = connectDb();
    $row = $conn->query("SELECT * FROM image WHERE comment_id =".$_GET['id']." LIMIT 1");
    $image = $row->fetch_row()[0]; //första resultatet, första kolumnen (namn)
    $mime = $row->fetch_row()[1]; //första resultatet, andra kolumnen (mime)
    $conn->close();
    header("Content-type:".$mime);
    echo $image;
