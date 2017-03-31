<?php
/* databasinställningar som används i uppgiften */
function connectDb(){
	//db inställningar
	$servername = "localhost";
	$username = "root";
	$password = "4319";
	$db = "skolan";
	$conn = new mysqli($servername, $username, $password,$db);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$conn->autocommit(false);
	return $conn;
}