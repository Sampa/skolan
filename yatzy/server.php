<?php
/**
 * Created by PhpStorm.
 * User: Daniel
 * Date: 2015-12-03
 * Time: 19:04
 */
//gör att vi slipper kolla efter stegar i onödan
function has_duplicates($array) {
    return count($array) !== count(array_unique($array));
}
//dessa två funktioner kollar om man har en stege och sätter isåfall poängen

function littleStraight($data){
    if(!array_diff(array(1,2,3,4,5), $data))
        return 15;
    return false;
}
function bigStraight($data){
    if(!array_diff(array(2,3,4,5,6),$data))
        return 20;
    return false;
}
//den övre spelplanen
function setTopPoints($numbers,$results){
    foreach($numbers as $key=>$value){
        $results[$key] = $value * $key;
    }
    return $results;
}
function yatzy($numbers){
    if(count($numbers)==1)//yatzy
        return true;
    return false;
}
function twoPairs($data){
    if(count($data) == 2){
        return $data[0] + $data[1];
    }
    return false;
}
// tittar efter par,två par, fyrtal,kåk och tretal "of a kind"
function oak($results,$numbers){
    $pairs = [];
    //tretal, fyrtal och par
    foreach($numbers as $number =>$count){
        if($count > 3)
            $results["foak"] =  4 * $number; //four of a kind
        if($count > 2)
            $results["toak"] = 3 * $number; //three of a kind
        if($count > 1) { //måste det iof vara annars hade vi inte varit i den här funktionen
            $pairs[] = 2 * $number;
        }
    }
    //högsta paret vill vi åt så vi sorterar (man kan visserligen bara ha två par så sort() skulle funka
    rsort($pairs);
    $results["pair"] = $pairs[0];
    //kolla tvåpar / two pairs
    $twopairs = twoPairs($pairs);
    if($twopairs)
        $results["twopairs"] = $twopairs;
    //kollar kåk/ full house
    if(isset($results["pair"]) && isset($results["toak"])) { //kåk
        //kollar så att paret och tretalet inte är samma tärningar
        if($results["pair"] / 2 != $results["toak"] / 3) {
            $results["house"] = $results["pair"] + $results["toak"];
            echo $results["pair"] . "hej" . $results["toak"];
        }elseif(isset($pairs[1])){
            $results["house"] = $pairs[1] + $results["toak"];
        }
    }
    return $results;
}

$data = $_POST["data"];
//$data = array(1,2,3,6,4);
if(isset($data)) {
    $numbers = array_count_values($data); // vi räknar ut frekvensen av varje tal
    $results = []; //fylls med de yatzyvärden man ska ha rätt till att klicka på
    $results["chance"] = array_sum($data); //går alltid

    if (!has_duplicates($data)) { //inga dubletter = kan vara stege eller nada
        $results["little"] = littleStraight($data);
        $results["big"] = bigStraight($data);
    }else{
        $results = setTopPoints($numbers,$results); //räknar ut övre sektionens poäng
        $result["yatzy"] = yatzy($numbers);
        $results = oak($results,$numbers); //par,tvåpar,tretal,fyrtal
    }
    echo json_encode($results);
}