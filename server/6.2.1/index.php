<?php
include_once("form.html");
//strippar html taggar och kollar om fältet är ifyllt
function validateField($field){
	if(empty($field)){
		die("Fyll i alla fält");
	}
	return strip_tags($field);
}
//sätter databasinställningarna och ansluter till den och returnerar anslutningen om det funkar
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
	return $conn;
}

//Om man har skrivit ett inlägg så ansluter vi till databasen och validerar alla fält innan vi lägger till inlägget
//om allt går bra så uppdaterar vi sidan och stänger anslutningen
if(isset($_POST['submit'])){
	if($conn = connectDb()){
		$name = validateField($_POST['name']);
		$comment = validateField($_POST['comment']);
		$site = validateField($_POST['site']);
		$email = validateField($_POST['email']);
		if($insert = $conn->prepare("INSERT INTO gb(name ,comment,site,email) VALUES(?,?,?,?)")){
			//se till att det är strängar (bind params skyddar mot sql injections
			$insert->bind_param("ssss",$name,$comment,$site,$email);
			$insert->execute();
			$insert->close();
			$conn->close();
			header("Location: index.php");
		}else{
            echo "Misslyckades med att lägga till inlägget";
        }
	}
}

//Hämtar och visa alla nuvarande inlägg med comments.html som mall
if($conn = connectDb()){
	$sql = "SELECT * FROM gb ORDER BY 'time' DESC";
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

