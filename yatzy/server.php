<?php
session_start();
include_once("db.php"); //db settings
include_once("yatzy.php"); //yatzy methods
/*
 * Server.php handles all the ajax request (all in post format) sent from the client
 */

/* A request is sent from the client after each throw*/
$dices = $_POST["dices"];
if(isset($dices)) {
    $numbers = array_count_values($dices); // frequency of each number (1-6)
    $results = []; //gets filled with the possible scoring options
    $results["chance"] = array_sum($dices); //chance is always possible
    $results = setTopPoints($numbers,$results); //calculates the points for each number (1-6)
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
    if($_SESSION['totalTurns'] >= count($_SESSION['players'])*1) {
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
        $values = $values;
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
function emptyOrDubplicate($array){
    //only unique usernames
    if(has_duplicates($array)) {
        return json_encode(array("status" => "dublicate"));
    }elseif(count($array)==0){ //must have atleast one player
        return json_encode(array("status"=>"empty"));
    }
    return false;
}
/* fetching the toplist is done at page load and after the endview is displayed*/
if(isset($_POST['toplist'])){
    //get table wrapper html
    $table = file_get_contents("toplist.php");
    //fetch the top 10 scores within tr/td's
    echo json_encode(array("table"=>$table,"toplist"=>getTopList()))    ;
}