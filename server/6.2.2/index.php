<?php
include_once("form.html");
//strippar html taggar och kollar om fältet är ifyllt
function validateField($field){
    /*if(empty($field)){
        die("Fyll i alla fält");
    }*/
	return strip_tags($field);
}
//databasinställningar + connecta
include_once("db.php");

//Om man har skrivit ett inlägg
if(isset($_POST['submit'])){
	if($conn = connectDb()){
		$comment = validateField($_POST['comment']);
		$site = validateField($_POST['site']);
		$email = validateField($_POST['email']);
		$name = validateField($_POST['name']);

		//förbered gästbooks insert med param binding
		if($insert = $conn->prepare("INSERT INTO gb(name,comment,site,email) VALUES(?,?,?,?)")){
			//se till att det är strängar (bind params skyddar mot sql injections
			$insert->bind_param("ssss",$name,$comment,$site,$email);
			//om båda querys funkade stänger vi dom och comittar själva frågan
			if($insert->execute()){
				$insert->close();
				//nu är det en idé att kolla bilden också...
                $img = $_FILES['file']['tmp_name'];
                $file = fopen($img, 'r');
                $file_contents = fread($file, filesize($img));
                fclose($file);
                $file_contents = addslashes($file_contents);
                //insert_id är senaste primary keyn som sparats med vår connection, alltså blog inlägget
				$image = $conn->prepare("INSERT INTO image(name,mime,comment_id) VALUES(?,?,?)");
                $mime = $_FILES['file']['type'];
				$id = $conn->insert_id;
				$image->bind_param("ssi", $foo,$mime,$id);

				if(!$image->execute()){
					$conn->rollback();
					die("Tyvärr kunde inte inlägget sparas");
				}
				$image->close();
				//eftersom vi gör en transaction och har autocommit false behöver vi denna
				$conn->commit();
			}
			header("Location: php.php");
		}//no insert of gb
		$conn->close();
	}else{
		echo "Kunde inte ansluta till databasen";
	}
}

//Hämta och visa alla nuvarande inlägg
if($conn = connectDb()){
	$sql = "SELECT * FROM gb ORDER BY 'time' DESC";
	$result = $conn->query($sql);
	$html = file_get_contents("comments.html");
	//mer än ett resultat
	if($result->num_rows > 0){
		//för varje resultat, visa mallen
		while($row = $result->fetch_assoc()){
			$imageUrl = "viewimage.php?id=".$row['id'];
			eval("print \"" . addcslashes(preg_replace("/(--(.+?)--)/", "\\2", $html), '"') . "\";");
		}
	}
	$conn->close();
}

