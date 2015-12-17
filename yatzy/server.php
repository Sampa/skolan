<?php
session_start();
//makes us able to skip looking for straight unessecarly
function has_duplicates($array) {
    return count($array) !== count(array_unique($array));
}
//looks for straights
function littleStraight($data,$results){
    if(!array_diff(array(1,2,3,4,5), $data)) $results["little"] = 15;
    return $results;
}
function bigStraight($data,$results){
    if(!array_diff(array(2,3,4,5,6),$data)) $results["big"] = 20;
    return $results;
}
//calculate the sum for each number ( 1-6)
function setTopPoints($numbers,$results){
    foreach($numbers as $key=>$value){ $results[$key] = $value * $key; }
    return $results;
}
//look for yatzy
function yatzy($numbers,$results){
    if(count($numbers)==1)
        $results['yatzy'] = 50;
    return $results;
}
//look for two pairs
function twoPairs($pairs,$results){
    if(count($pairs) == 2) $results["twopairs"] = $pairs[0] + $pairs[1];
    return $results;
}
/* only runs if there is atleast one pair.
Finds the highest and uses it to see if there is two pairs or a house
Also sets three/four of a kind
*/
function pairs($numbers,$results){
    $pairs = [];
    foreach($numbers as $number =>$count){
        if($count > 3) $results["foak"] =  4 * $number; //four of a kind
        if($count > 2) $results["toak"] = 3 * $number; //three of a kind
        if($count > 1) $pairs[] = 2 * $number; //one pair
    }
    //if there is more then one pair, make sure the highest one is at index 0
    if(count($pairs)>1) {
        rsort($pairs);
    }
    $results["pair"] = $pairs[0];
    //check if there is two pairs or a house
    $results = twoPairs($pairs,$results);
    $results = house($pairs,$results);
    return $results;
}
//finds out if there is both a pair and a toak not using the same dice twice
function house($pairs,$results){
    if(isset($results["pair"]) && isset($results["toak"])) { //there is house
        //make sure the pair and toak is diffrent dices
        if($results["pair"] / 2 != $results["toak"] / 3)
            $results["house"] = $results["pair"] + $results["toak"];
        elseif(isset($pairs[1]))
            $results["house"] = $pairs[1] + $results["toak"];
    }
    return $results;
}
/* returns the current user */
function getUser(){
    return array_values($_SESSION['players'])[$_SESSION['turn']]; //pass the correct playername
}
/* A request is sent from the client after each throw*/
$dices = $_POST["dices"];
//$dices = array(1,1,2,2,2);
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
    if($_SESSION['turn'] <  1){
        $_SESSION['turn'] = $_SESSION['turn']+1;
    }else{
        $_SESSION['turn']=0;
    }
    echo json_encode(array());
}
/*
 * Take care of the playernames form
 */
if(isset($_POST["playerNames"])) {
    $_SESSION['players'] =[];
    foreach($_POST['playerNames'] as $key=>$values) {
        if(strlen($values['value']) > 0)
            $_SESSION['players'][$values['name']] = $values['value'];
    }
    $_SESSION['turn'] = 0;
    if(has_duplicates($_SESSION['players']))
        echo json_encode(array("status"=>"dublicate"));
    else
        echo json_encode($_SESSION['players']);
}
