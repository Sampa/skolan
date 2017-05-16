var playerTurnClass = "blend-gradient",scoreOptionClass =".clickable",diceResults = [],user,
    posScoreClass = "text-primary", negScoreClass = "text-danger", tdWithPointsClass = "bg-success", tdNoPointsClass = "zero";
/***
 * jQuery extended disable function for input,button, textarea, select elements
 */
jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            var $this = $(this);
            if($this.is('input, button, textarea, select'))
                this.disabled = state;
            else if ($this.is('select') && state)
                $this.attr('disabled', 'disabled');
            else if ($this.is('select') && !state)
                $this.removeAttr('disabled');
            else
                $this.toggleClass('disabled', state);
        });
    }
});

/**
 * Accepts a 2 integer range and returns a random number inbetween without decimals
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}

/**
 * Generates a random number between 1-6 for each dice
 * Calls animateDice() on each to start animation
 * sends the roll results to the server for score option calculations
 */
function rollDices(){
    $.each($(".cubeWrapper").not(".selectedDice"), function(index,dice) {
        var face = randomNumber(1,6);
        var cube = $(this).children(".cube");
        var id=cube.attr("id").slice(-1); //the number in the id
        diceResults[id-1] = face; //id numbers  are 1-5 indexes 0-4
        animateDice(face,cube,0);
    });
    //send the result to the server to calculate the options (delay so that the dices animates first)
    setTimeout(function(){sendToServer({"dices":diceResults},showScoreOptions)},1300);
}
/**
 *  recursion, Animates the dice face for a single dice no different sides and stops on the result
 *  @result A randomnized interger(1-6)
 *  @obj The dice that is animated
 *  @done how many times the dice face has been changed
 */
function animateDice(result,obj,done) {
    var showFace,notDuplicateCheck
    if(done==10) { //if we are done making it look nice we animate the dice to the rolled result and exit the recursion
        done = 0;
        obj.attr('class', 'cube show'+result);
        obj.attr('name', result);
        return;
    }
    notDuplicateCheck = randomNumber(1,6);
    while(notDuplicateCheck == showFace){ //to make it show a different side
        notDuplicateCheck = randomNumber(1,6);
    }
    done++;
    obj.attr('class', 'cube show'+notDuplicateCheck); //actually animates the dice
    showFace = notDuplicateCheck;
    setTimeout(function(){animateDice(result,obj,done)},100); //pause so we get to animate it again for effect
};

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
            console.log(data);
        },
        dataType: "json"
    });
}
/**
 * shows the possible scoring options and what point  each would give
 * adds classes to the element for visibily if it does not already have an score and to make other js triggers work
 * @data is an array of possible scoring options
 */
function showScoreOptions(data){
    var element,prefix,top = [1,2,3,4,5,6];
    $.each(data,function(key,value){
        if(value !="user") {
            prefix = ($.inArray(parseInt(key),top) == -1 ? "bottom" :"top"); //prefix top or bottom part
            element = $("[id='" + prefix + key + data.user+"']");
            if (!element.attr("data-score")){
                if(value > 0) {
                    element.addClass(posScoreClass + " clickable").html(value);
                }else{
                    element.addClass(negScoreClass +" clickable").html(0);
                }
            }
        }
    });
    //each td that has no score set, and would only give 0 points is marked as red
    //$.each($("td[data-user="+data.user+"]:not(.clickable,[data-score],.score)"),function(key,value){
    //});

}
/**
 * after the user confirms his pick among the scoring options,
 * set the correct score and restore the other fields
 * @element the td element where the score is inserted for the active player
 **/
function setRowScore(element){
    $.each($(scoreOptionClass),function(key,value){
        var obj = $(value),bgclass;
        obj.removeClass(posScoreClass+" clickable "+negScoreClass);
        if (obj.is(element)){
            bgclass = parseInt(obj.html()) > 0 ? tdWithPointsClass : tdNoPointsClass;
            obj.addClass(bgclass).attr("data-score",obj.html());
        } else {
            obj.empty();
        }
    });
}
/**
 * clears all fields that the player did not choose to put points on
 */
function clearRowFields(){
    $.each($(scoreOptionClass),function(key,value) {
        $(value).removeClass(posScoreClass+" clickable "+negScoreClass).empty();
    });
}
/*
 * Runs after each turn
 *  unselect all dices, resets throw count, sets turn to next player and see if the game has ended
 */
function newTurn(user){
    var element = $("#playername"+user);
    element.removeClass(playerTurnClass);
    var next = element.next(".playername");
    $(".cubeWrapper").removeAttr("title");
    $("#play").removeAttr("title");
    $(".scoreTd").removeAttr("title");
    if(next.length ==0){ //there is no next element, this was the last player
        next = $(".playername").first();
    }
    next.addClass(playerTurnClass);
    $.each($(".selectedDice"),function(index,value){
        $(this).removeClass("selectedDice").find("span").hide();
        $(this).prop("selected",false);
    });
    resetTurnCount();
    //next turn and see if its end of game
    sendToServer({turn:""},endgame);
}

/* A callback that runs after each turn
 * @data is a json object from the server with a boolean telling us if the game is over
 * saves the endresult to the database and notify the players
 */
function endgame(data){
    if(data.gameOver){
        //gets and array with the players sorted (index 0] and as json objekt [index 1]
        var arr = sortPlayers();
        var results = arr[1];
        createEndTable(arr[0]);
        //save end result to database
        sendToServer({"saveToDB":results});
        //show endview with results and winner
        $("#endview").modal();
    }
}
/***
 * Sorts the players by result and returns an array with
 * a) the sorted result as array
 * b) all the players and their score in a objekt
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
/**
 * Adds the neccessary data and fields to the endgame result table
 * @sortable is a sorted array of the players with their scores
 */
function createEndTable(sortable){
    var row, table = $("#endboard"), i = 0;
    table.find("tr:not(:first)").remove();
    $.each(sortable,function(key,player) {
        row = $("<tr></tr>");
        table.append(row);
        row.html("<td>"+(i+1)+"</td>>");//placement
        row.append("<td>"+player[0]+"</td>");//player
        row.append("<td>"+player[1]+"</td>");// score
        row.append("<td>"+(sortable[0][1] - player[1])+"</td>");//diff
        i++;
    });
}
/* Resets the count for the number of throws per turn */
function resetTurnCount(){
    $("#play").disable(false).find("span").html("0");
}
/**
 * calculates the total for the top half (1-6)
 * @user is the active player
 */
function setTopTotal(user){
    var topTotal = 0,number=0,elements = $('[id^=top][id$="+user+"]');
    var topTotalUser = $("#topTotal"+user);
    topTotalUser.html("");
    $.each(elements,function(){
        number = $(this).attr("data-score");
        if(!isNaN(number))
            topTotal = parseInt(topTotal) + parseInt(number);

    });
    topTotalUser.html(topTotal);
    setBonus(topTotal, user,elements);
}
/**
 * if the toptotal is 63 or more, add the 50 bonus points
 * @user the active player
 * @topTotal the active players total score on the top half
 */
function setBonus(topTotal,user,elements){
    var element = $("#bonus"+user),topDone = true;
    console.log(element);
    $.each(elements,function(key,obj){
       if(!$(obj).attr("data-score") && $(obj).attr("id") != "topTotal"+user){
           topDone = false;
       }
    });
    if(topDone) {
        if (topTotal > 62) {
            element.html("50").addClass(tdWithPointsClass).css("color", "black");
        } else {
            element.html("0").addClass(tdNoPointsClass).css("color", "black");
        }
    }
}
/**
 * Sets the bottom result (toptotal+bonus+bottom half)
 * @user is the active player
 */
function setTotal(user){
    var topScore = parseInt($("#topTotal"+user).html()) + parseInt($("#bonus" + user).html()),
    number=0, result = 0, elements = $('[id^=bottom][id$="+user+"]'), resultUser = $("#result"+user);
    resultUser.html("");//topScore+result);
    $.each(elements, function(){
        number = $(this).attr("data-score");
        if(!isNaN(number) && number > 0) {
            result = parseInt(result) + parseInt(number);
        }
    });
    resultUser.html(topScore+result);//topScore+result);
}
/**
 * wrapper function called by the end of each turn
 * @user the active player
 */
function setTotals(user){
    setTopTotal(user);
    setTotal(user);
}
/**
 * Checks the playernames for dublicates and calls createScoreboard(data)
 * @data is the form data from the player form
 */
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
        nameCell = $(row.insertCell(i));
        nameCell.html(player);
        nameCell.addClass("playername bg-warning");
        nameCell.attr("id","playername"+player);
        if(i==1)
            nameCell.addClass(playerTurnClass); //first player starts of with specific bgglass
        //create each field and sets it proper attributes
        for(var r= 0; r<fields.length;r++){
            currentRow = table.rows.item(r+1);
            currentCell = $(currentRow.insertCell(i));
            currentCell.attr("id",fields[r]+player).attr("data-user",player);
            //toptotal/bonus/endresult
            if(r == 6 || r== 7 || r ==fields.length-1){//toptotal,bonus,result
                currentCell.html(0);
                currentCell.attr("class","score");
            }else{
                currentCell.addClass("scoreTd").attr("title","Click to save score");
            }
        }
        i++;
    });
    $(".cubeWrapper").attr("Click to keep this dice");
    $("#play").attr("title","Throw dices");
    resetTurnCount();
}
/**
 * TOPLIST Callback that recieves the toplist from the server and inserts it in the table
 **/
function displayToplist(data){
    $("#leaderboard").find("tr:gt(0)").remove();
    $(data.toplist).insertAfter("#leaderboard tr");
}
/**
 * TOPLIST ask the server to fetch the toplist from the database
 */
function getTopList(){
    sendToServer({"toplist":true}, displayToplist);
}
/***
 * accepts a filename (without fileext) and a html element as jQuery object
 */
function importTemplate(fileName,target){
    var href = "import/"+fileName+".html";
    if(target==undefined) //if no obj was passed create one from the filename
        target = $("#"+fileName);
    var link = document.querySelector('link[href="'+href+'"]');//the correct import file
    var template = link.import.querySelector("template");     // Clone the <template> in the import.
    target.append(document.importNode(template.content, true)); //add it to the dom
}

/***
 * NEWGAME clears the scoreboard table
 * shows the new game button
 * replaces the endview modal with the form to enter player names
 */
function newGame(){
    var scoreboard = $("#scoreboard");
    scoreboard.find("tr td[data-user]").remove();
    scoreboard.find(".playername").remove();
    $("#endview").modal("hide");
    $("#modal").modal("show");
    $(".cubeWrapper").attr("Click to keep this dice");
    $("#play").attr("title","Throw dices");
    resetTurnCount();
}

/**
 * Show dialog that asks user to confirm the selected score-option
 * If the user confirms it runs 3 functions to
 * 1)set the options score
 * 2)update the totals
 * 3)prepare the game for a new turn
 */
function confirmOption(element,bgclass){
    user = element.attr("data-user");
    var option = element.parent("tr").children("td:first").html(), points = element.html();
    element.addClass(bgclass);
    $.confirm({
        text: "Are you sure?",
        title: "Confirm "+points+" points for "+option+"?",
        confirm: function() {
            //sets score for the row and updates total scores and resets unused fields and allow new throws
            setRowScore(element);
            setTotals(user);
            //prepare the game for a new turn (also calls endgame callback)
            newTurn(user);
            element.removeClass(bgclass);
        },
        cancel: function(){
            element.removeClass(bgclass);
        },
        confirmButton: "Yes",
        cancelButton: "No, I want to repick",
        post: true,
        confirmButtonClass: "btn gradient",
        cancelButtonClass: "btn-danger",
        dialogClass: "modal-dialog"
    }); //confirm
} //confirmOption

/**
 * Takes care of the response from the server when an email has been sent
 */
function emailCallback(data){
    var form = $("#contactForm");
    if(data.status==true) {
        $("#emailSuccessAlert").fadeIn({easing: "easeInOutQuad"});
        form.trigger("reset");
    }else {
        $("#emailFailAlert").fadeIn({easing: "easeInOutQuad"});
    }
    $("footer > .container-fluid").loadingOverlay("remove");
}
/**
 * Updates the number of throws made on the current turn
 * Rolls the dices and clears the scoreboard
 * @rollCounter is the element where the count is beeing displayed
 */
function newRoll(rollCounter){
    //find span element inside the countor and get the content as an int
    var number = parseInt(rollCounter.html()) +1;
    //if we reached our maximum number of throws prohibit more
    if(number >  3  ) {
        return;
    }else if( number == 3) { // it's the last throw so make it the counter red
        $(this).disable();
    }
    //show the new count of rolls
    rollCounter.html(number);
    //reset unused fields because we are doing a new roll
    clearRowFields();
    rollDices(); //roll dices
}
/**
 * Keeps a dice for the next roll
 * @element is the wrapper object around the dice that the user clicked
 */
function keepDice(element){
    //reverse selected status
    element.prop("selected", !element.prop("selected"));
    if (element.prop("selected")) {
        element.addClass("selectedDice").find("span").show();
    } else {
        element.removeClass("selectedDice").find("span").hide();
    }
}
/**
 * Enables the next input field in the player form
 * @input is the text input in the form that the user has started typing in
 */
function enableNextInput(input){
    var next, nextElement, playerNumber = parseInt(input.attr("name").substr(9)); //too see which field it is
    next = 1+playerNumber;
    nextElement = $("[name='setplayer"+next+"']"); //the next field in the form
    //if input field is not empty
    if($("[name='setplayer"+playerNumber+"']").val().length > 0){
        nextElement.prop("disabled",false);
    }else{ //the field has been emptied
        nextElement.prop("disabled",true);
    }
}