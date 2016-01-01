<?php
include_once("form.html");
//strippar html taggar
function validateField($field){
	return strip_tags($field);
}
//databasinställningar + connecta
function connectDb(){
	//db inställningar
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$db = "skolan";
	$conn = new mysqli($servername, $username, $password,$db);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	return $conn;
}

//Om man har skrivit ett inlägg
if(isset($_POST['submit'])){
	if($conn = connectDb()){
		$comment = validateField($_POST['comment']);
		$site = validateField($_POST['site']);
		$email = validateField($_POST['email']);
		$name = validateField($_POST['name']);
		if($insert = $conn->prepare("INSERT INTO gbook(name ,comment,site,email) VALUES(?,?,?,?)")){
			//se till att det är strängar (bind params skyddar mot sql injections
			$insert->bind_param("ssss",$name,$comment,$site,$email);
			$insert->execute();
			$insert->close();
			$conn->close();
			header("Location: index.php");
		}
	}
}

//Hämta och visa alla nuvarande inlägg
if($conn = connectDb()){
	$sql = "SELECT * FROM gbook ORDER BY 'time' DESC";
	$result = $conn->query($sql);
	$html = file_get_contents("comments.html");
	//mer än ett resultat
	if($result->num_rows > 0){
		//för varje resultat, visa mallen
		while($row = $result->fetch_assoc()){
			eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
		}
	}
	$conn->close();
}

