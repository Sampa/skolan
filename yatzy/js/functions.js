var scoreOptionClass =".clickable",dices = new Object(),
    diceElements = [],diceResults = [],diceResultDiv = "#diceResult",user;
dices ={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false
};
//get a random number without decimals
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}
//Generates a random number between 1-6 for each dice and sends them to the server for calculations
function rollDices(){
    diceResultDiv = $(diceResultDiv);
    $("#roll").prop("checked", false);
    for(var i=0;i<5;i++){
        getCorrectDiceValue(i);
    };
    diceResultDiv.html("");//empty the div with the dices
    $.each(diceElements,function(key,element){
        diceResultDiv.append(element); //add/display the elements from our merged array
    });
    //send the result to the server to calculate the options
    sendToServer({"dices":diceResults},showScoreOptions);
}
/**
 * keeps the users selected dices and rolls new values for the others
 */
function getCorrectDiceValue(dicePosition){
    var element;
    if(!dices[dicePosition]) { //first roll or the dice isn't selected
        //get a dice result
        diceResults[dicePosition] = randomNumber(1, 6);
        //find the element with the corresponding backgroundimage
        element = $("#diceTemplate").find("[name='d" + diceResults[dicePosition] + "']").clone();
        element.attr("data-position", dicePosition); //give the cloned copy a dicePosition value (can be 0-4)
        diceElements[dicePosition] = element; //save the copied element so it can be inserted later
    }else{//it must be the second or third roll and the element is selected so we fetch its dicePosition
        element = $('[data-position="'+dicePosition+'"]');
        diceResults[dicePosition] = element.attr("name").substring(1); //add the value to the result list again
        diceElements[dicePosition] = element; //save the selected dice element so it can be inserted later
    }
}
/**
 * passes data (json object) to the server as $_POST[postname] and calls
 * the function callback(optional) on success
 */
function sendToServer(data,callback){
    $.ajax({
        type: "POST",
        url: "server.php",
        data: data,
        success: function (data){
            if(callback !=undefined) {
                callback(data);
            }
        },
        error: function(data){
            console.log("error"+data);
        },
        dataType: "json"
    });
}
/**
 * shows the possible scoring options and what point  each would give
 * adds classes to the element for visibily and to make other js triggers work
 */
function showScoreOptions(data){
    var element,prefix,top = [1,2,3,4,5,6];
    $.each(data,function(key,value){
        if(value && value !="user") {
            prefix = ($.inArray(parseInt(key),top) == -1 ? "bottom" :"top");
            element = $("[id='" + prefix + key + data.user+"']");
            if (!element.attr("data-score")){
                element.addClass("bg-primary clickable").html(value);
            }
        }
    });

}
/**
 * after the user confirms his pick among the scoring options,
 * set the correct score and restore the other fields
 **/
function setRowScore(element){
    $.each($(scoreOptionClass),function(key,value){
        var obj = $(value);
        obj.removeClass("bg-primary clickable");
        if (obj.is(element)){
            obj.addClass("bg-success").attr("data-score",obj.html());
        } else {
            obj.empty();
        }
    });
    //prepare the game for a new turn (also calls endgame callback)
    newTurn();
}
/**
 * clears all fields that the player did not choose to put points on
 */
function clearRowFields(){
    $.each($(scoreOptionClass),function(key,value) {
        $(value).removeClass("bg-primary clickable").empty();
    });
}
/*
 * Runs after each turn
 *  unselect all dices, resets throw count, sets turn to next player and see if the game has ended
 */
function newTurn(){
    $(diceResultDiv).empty();
    for(i=0;i<5;i++){
        dices[i] = false;
    }
    resetTurnCount();
    //next turn and see if its end of game
    sendToServer({turn:""},endgame);
}

/* A callback that runs after each turn
 * data is a json object from the server with a boolean telling us if the game is over
 * saves the endresult to the database and notify the players
 */
function endgame(data){
    if(data.gameOver){
        //gets and array with the players sorted (index 0] and as json objekt [index 1]
        var arr = sortPlayers();
        createEndTable(arr[0]);
        //save end result to database
        sendToServer({"saveToDB":arr[1]});
        //show endview with results and winner
        $("#endview").modal();

    }
}
/*
    Sorts the players by result and returns an array with
    a) the sorted result as array
    b) all the players and their score in a objekt
 */
function sortPlayers(){
    var resultElement,results={},result=[],sortable = [];
    $.each($(".playername"),function(key,value){
        resultElement = $("#result"+value.innerHTML);
        results[value.innerHTML] = parseInt(resultElement.html());
    });
    for(var player in results) {
        sortable.push([player, results[player]]);
    }
    sortable.sort(function(a, b) {return b[1] - a[1]});
    result[0] = sortable;
    result[1] = results;
    return result;
}
function createEndTable(sortable){
    var row, table = $("#endboard"), i = 0;
    table.find("tr:not(:first)").remove();
    $.each(sortable,function(key,player) {
        row = $("<tr></tr>");
        table.append(row);
        row.html("<td>"+(i+1)+"</td>>");//placement
        row.append("<td>"+player[1]+"</td>");//player
        row.append("<td>"+player[0]+"</td>");// score
        row.append("<td>"+(sortable[0][1] - player[1])+"</td>");//diff
        i++;
    });
}
function resetTurnCount(){
    $("#start").removeClass("alert-danger").addClass("alert-success").find("span").html("0");
}
//calculates the total for the top half (1-6)
function setTopTotal(user){
    var topTotal = 0,number=0,elements = $("[id^=top][id$="+user+"]");
    $("#topTotal"+user).html("");
    $.each(elements,function(key,value){
        number = $(this).attr("data-score");
        if(!isNaN(number))
            topTotal = parseInt(topTotal) + parseInt(number);
    });
    $("#topTotal"+user).html(topTotal);
    setBonus(topTotal,user);
}
//when the toptotal is 63 or more, this adds the 50 bonus points
function setBonus(topTotal,user){
    if(topTotal > 62){
        $("#bonus"+user).html("50").addClass("bg-success");
    }
}
//Sets the bottom result (toptotal+bonus+bottom half)
function setTotal(user){
    var topScore = parseInt($("#topTotal"+user).html()) + parseInt($("#bonus" + user).html());
    var number=0, result = 0, elements = $("[id^=bottom][id$="+user+"]");
    $("#result"+user).html("");//topScore+result);
    $.each(elements, function(key,value){
        number = $(this).attr("data-score");
        if(!isNaN(number) && number > 0) {
            result = parseInt(result) + parseInt(number);;
        }
    });
    $("#result"+user).html(topScore+result);//topScore+result);
}
function setTotals(user){
    setTopTotal(user);
    setTotal(user);
}
function setPlayerNames(data){
    //if dublicate usernames
    if(data.status=="dublicate"){
        $(".modal-header").append("<h4 class='text-danger notunique'>").find(".notunique").html("Names must be unique");
        return;
    }
    if(data.status=="empty"){
        $(".modal-header").append("<h4 class='text-danger emptyname'>").find(".emptyname").html("Name cannot be empty");
        return;
    }
    createScoreboard(data);
    $("#modal").modal("hide");
    $("#enterNamesButton").hide();
}
//generates the scoreboard
function createScoreboard(data){
    var currentRow,nameCell,currentCell,i= 1,table = document.getElementById("scoreboard"),row = table.rows.item(0);
    //list of fields and ther id (playername will be added so its unique)
    var fields=["top1","top2","top3","top4","top5","top6",
        'topTotal','bonus','bottompair','bottomtwopairs','bottomtoak','bottomfoak',
        'bottomlittle','bottombig','bottomhouse','bottomchance','bottomyatzy','result'
    ];
    //for each player
    $.each(data,function(key,player){
        nameCell = row.insertCell(i);
        nameCell.innerHTML = player;
        nameCell.setAttribute("class","playername");
        //create each field and sets it proper attributes
        for(var r= 0; r<fields.length;r++){
            currentRow = table.rows.item(r+1);
            currentCell = $(currentRow.insertCell(i));
            currentCell.attr("id",fields[r]+player).attr("data-user",player);
            //toptotal/bonus/endresult
            if(r == 6|| r== 7 || r ==fields.length-1){
                currentCell.html(0);
            }
        }
        i++;
    });
}
function displayToplist(data){
    $("#collapseToplist").html(data.table);
    $(data.toplist).insertAfter("#leaderboard tr");
}
function getTopList(){
    sendToServer({"toplist":true}, displayToplist);
}