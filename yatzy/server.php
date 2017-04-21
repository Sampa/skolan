<?php
session_start();
include_once("db.php"); //db settings
include_once("yatzy.php"); //yatzy methods
require 'phpmailer/PHPMailerAutoload.php';
/*
 * Server.php handles all the ajax request (all in post format) sent from the client
 */

/* A request is sent from the client after each throw*/
if(isset($_POST["dices"])) {
    $dices = $_POST["dices"];
    $numbers = array_count_values($dices); // frequency of each number (1-6)
//    $results = []; //gets filled with the possible scoring options
    $results = [1=>0,2=>0,3=>0,4=>0,5=>0,6=>0,
        'pair'=>0,'twopairs'=>0,'toak'=>0,'foak'=>0,'little'=>0,'big'=>0,'house'=>0,'chance'=>0,'yatzy'=>0];
    $results["chance"] = array_sum($dices); //chance is always possible
    $results = setTopPoints($numbers,$results); //calculates the points for each number (1-6)
//    echo json_encode($results);
//    return;
    if (!has_duplicates($dices)) { //no doubles, might be a straight
        $results = littleStraight($dices,$results);
        $results = bigStraight($dices,$results);
    }else{ //must be atleast one pair
        $results = yatzy($numbers,$results);
        $results = pairs($numbers,$results); //pair,2pairs,three/four of a kind
    }

    $results['user'] = getUser();
    echo json_encode($results);
}
/*
 * updates whos turn it is
 */
if(isset($_POST['turn'])){
    $_SESSION['totalTurns'] = $_SESSION['totalTurns']+1;
    //next players turn (playernumber+1)  or if current player is the last player start from the beginning
    $_SESSION['turn'] = $_SESSION['turn'] <  count($_SESSION['players'])-1 ? $_SESSION['turn']+1 : 0;
    $status["gameOver"] = false;
    //each player has 15 turns totally
    if($_SESSION['totalTurns'] >= count($_SESSION['players'])*15) {
        $status = array("gameOver" => true);
    }
    echo json_encode($status);
}
/*
 * Called when game is over
 * Connects to db and saves each player name with their endscore
 * primarykey and timestamp is handled by db
 */
if(isset($_POST['saveToDB'])){
    try {
        $conn = connectDb();
        foreach ($_SESSION['players'] as $key => $player) {
            $score = $_POST['saveToDB'][$player];
            $select = "INSERT INTO yatzy (player,score) VALUES('" . $player . "'," . $score . ")";
            mysqli_query($conn, $select);
        }
        echo json_encode(array("saved" => true));
        mysqli_close($conn);
    }catch(Exception $error){
        echo json_encode(array("saved"=>false,"error"=>$error->getMessage()));
    }
}
/*
 * Take care of the playernames form
 */
if(isset($_POST["playerNames"])) {
    //whos turn it is and total number of turns played
    $_SESSION['turn'] = 0;
    $_SESSION['totalTurns'] =0;
    // create session array in desired format with fixed names
    $_SESSION['players'] =[];
    foreach($_POST['playerNames'] as $key=>$values) {
        //only accept the inputs with atleast 1 character
        if(strlen($values['value']) > 0)
            $_SESSION['players'][$values['name']] = htmlspecialchars($values['value']);
    }

    //we dont allow duplicates or empty usernames
    $error = emptyOrDubplicate($_SESSION['players']);
    if(!$error)
        echo json_encode($_SESSION['players']);
    else
        echo $error;
}
/* fetching the toplist is done at page load and after the endview is displayed*/
if(isset($_POST['toplist'])){
    //get table wrapper html
    $table = file_get_contents("import/toplist.html");
    //fetch the top 10 scores within tr/td's
    echo json_encode(array("table"=>$table,"toplist"=>getTopList()))    ;
}
/**
 * When someone tries to send a question we take the values and email ourselves with phpmailer
 */
if(isset($_POST['contactForm'])){
    $data = json_decode($_POST['contactForm'],true);
    $name = $data[0]["value"];
    $email = $data[1]["value"];
    $message = $data[2]["value"];

    $mail = new PHPMailer;
    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'idrini@gmail.com'; //add your email
    $mail->Password = 'draddydagols666'; //add your password
    $mail->SMTPSecure = 'tls';
    $mail->AddReplyTo($email, 'Svar på Yatzy fråga');
    $mail->From = $email;
    $mail->FromName = $name;
    $mail->addAddress("idrini@gmail.com");
    $mail->Subject = "Fråga från Yatzy spelet";
    $mail->Body    = $message;
    if($mail->send()){
        echo json_encode(array("status"=>true,"message"=>"Skickat"));
    }else{
        echo json_encode(array("status"=>false,"message"=>$mail->ErrorInfo));
    }
}
/*$email = 'idrini@gmail.com';
$name = 'daniel';
$message = "testing";
$mail = new PHPMailer;
$mail->IsSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'idrini@gmail.com'; //add your email
$mail->Password = 'draddydagols666'; //add your password
$mail->SMTPSecure = 'tls';
$mail->AddReplyTo($email, 'Svar på Yatzy fråga');
$mail->From = $email;
$mail->FromName = $name;
$mail->addAddress("idrini@gmail.com");
$mail->Subject = "Fråga från Yatzy spelet";
$mail->Body    = $message;
if($mail->send()){
    echo json_encode(array("status"=>true,"message"=>"Skickat"));
}else{
    echo json_encode(array("status"=>false,"message"=>$mail->ErrorInfo));
}*/