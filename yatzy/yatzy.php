<?php
/*
 * gets the top 10 scores in descending order and returns a string that can be inserted in a table
 */
function getTopList(){
    $conn = connectDb();
    $result = mysqli_query($conn,"SELECT * FROM yatzy ORDER BY score DESC LIMIT 10");
    $i = 1;
    $table ="";
    foreach($result as $row){
        $date = date_create($row['date']);
        $date = date_format($date,"Y/m/d H:i");
        $table .="<tr>";
        $table .="<td>".$i."</td>";
        $table .="<td>".$row['player']."</td>";
        $table .="<td>".$row['score']."</td>";
        $table .="<td>".$date."</td>";
        $table .="</tr>";
        $i++;
    }
    return $table;
}
//makes us able to skip looking for straight unessecarly
function has_duplicates($array) {
    return count($array) !== count(array_unique($array));
}
//looks for straights, if the numbers don't diff set 0 otherwise set the correct straight point value
function littleStraight($data,$results){
    array_diff(array(1,2,3,4,5), $data) ? $results["little"]=0 : $results["little"] = 15;
    return $results;
}
function bigStraight($data,$results){
    array_diff(array(2,3,4,5,6),$data) ? $results["big"]=0 : $results["big"] = 20;
    return $results;
}
//calculate the sum for each number ( 1-6) based on the frequency of the number in $numbers
function setTopPoints($numbers,$results){
    foreach($numbers as $key=>$frequency){
        $results[$key] = $frequency * $key;
    }
    for($num=1;$num<=6;$num++){
        if(!isset($results[$num])){
            $results[$num]=0;
        }
    }
    return $results;
}
//look for yatzy
function yatzy($numbers,$results){
    count($numbers)==1 ? $results['yatzy'] = 50 : $results['yatzy'] = 0;
    return $results;
}
//look for two pairs
function twoPairs($pairs,$results){
    count($pairs) == 2 ? $results["twopairs"] = $pairs[0] + $pairs[1] : $results['twopairs'] = 0;
    return $results;
}
/* only runs if there is atleast one pair.
Finds the highest and uses it to see if there is two pairs or a house
Also sets three/four of a kind
*/
function pairs($numbers,$results){
    $pairs = [];
    foreach($numbers as $number =>$count){
        $count > 3 ? $results["foak"] =  4 * $number : $results['foak'] = 0; //four of a kind
        $count > 2 ? $results["toak"] = 3 * $number : $results['toak'] = 0; //three of a kind
        if($count > 1) $pairs[] = 2 * $number; //one pair
    }
    //if there is more then one pair, make sure the highest one is at index 0 else set pair points =0
    if(count($pairs)>1) {
        rsort($pairs);
        $results["pair"] = $pairs[0];
    }else{
        $results["pair"] = 0;
    }
    //check if there is two pairs or a house
    $results = twoPairs($pairs,$results);
    $results = house($pairs,$results);
    return $results;
}
/*
 * finds out if there is both a pair and a toak not using the same dice twice
 */
function house($pairs,$results){
    if($results["pair"] >0 && $results["toak"] >0) { //there is house or yatzy
        //make sure the pair and toak is diffrent dices
        if($results["pair"] / 2 != $results["toak"] / 3) //if !yatzy
            $results["house"] = $results["pair"] + $results["toak"];
        elseif(isset($pairs[1])) //toak is also highest pair
            $results["house"] = $pairs[1] + $results["toak"];
    }
    if(!isset($results["house"]))
        $results["house"]=0;
    return $results;
}
/* returns the current user */
function getUser(){
    return array_values($_SESSION['players'])[$_SESSION['turn']]; //pass the correct playername
}
/*
 * checks if an array is empty or contains duplicates
 * returns: json encoded array with the status or false
 */
function emptyOrDubplicate($array){
    //only unique usernames
    if(has_duplicates($array)) {
        return json_encode(array("status" => "dublicate"));
    }elseif(count($array)==0){ //must have atleast one player
        return json_encode(array("status"=>"empty"));
    }
    return false;
}