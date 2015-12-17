var scoreOptionClass =".clickable",dices = new Object(),
    diceElements = [],diceResults = [],diceResultDiv = "#diceResult",user;
dices ={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false
};
window.onload = function() {

    /*
        Js related to modal for playernames
     */
    //display modal and focus on first input
    $("#modal").modal();
    $('#modal').on('shown.bs.modal', function () {
        $('[name="setplayer1"]').focus();
    });
    $("#modal").on("click","#setPlayerNames",function(){
        $("#playerNames").submit();
    });
    $("#playerNames").submit(function(event){
        event.preventDefault();
        sendToServer({"playerNames":$(this).serializeArray()},setPlayerNames);
    });
    //controls which inputfields that should be active
    $("[name^='setplayer']").keydown(function(event){
       var next, nextElement, playerNumber = parseInt($(this).attr("name").substr(9));
        next = 1+playerNumber;
        nextElement = $("[name='setplayer"+next+"']");
        if($("[name='setplayer"+playerNumber+"']").val().length > 0){
           nextElement.prop("disabled",false);
       }else{
           nextElement.prop("disabled",true);
       }
    });
    /*
        Various click triggers
     */
    //clicking a dice after making a roll
    $(diceResultDiv).on("click","div",function(){
        var element = $(this);
        var pos = element.attr("data-position");
        //reverse selected status
        element.prop("selected",!element.prop("selected"));
        if(element.prop("selected")){
            dices[pos] = true;
            element.addClass("selectedDice").prepend('<span></span>');
        }else{
            dices[pos] = false;
            element.removeClass("selectedDice").find("span").remove();
        }
    });
    //pressing a scoring option td
    $("tr").on("click",".clickable",function(){
        var element = $(this);
        user = element.attr("data-user");
        //user = $("thead").find("td[data-user='"+name+"']");
        $.confirm({
            text: "Are you sure?",
            title: "Confirm choice",
            confirm: function(button) {
                //sets score for element and resets unused fields and allow new throws
                setRowScore(element);
                setTotals(user);
            },
            confirmButton: "Yes I am",
            cancelButton: "No, I want to repick",
            post: true,
            confirmButtonClass: "btn-success",
            cancelButtonClass: "btn-danger",
            dialogClass: "modal-dialog modal-sm"
        });
    });
    //dont need "live element" selector
    $(".dice").on("click",function(){
        //reset unused fields because we are doing a new roll
        clearRowFields();
        //start animation and then generate results
        $("#roll").prop("checked", true);
        setTimeout(rollDices,1000);
        //find span element inside the button and then its contents as int
        var element = $("#start").find("span");
        var number = parseInt(element.html()) +1;
        //replace with the new count of rolls
        element.html(number);
        //if we reached our maximum number of throws prohibit more
        if(number > 2){
            $("#start").removeClass("alert-success").addClass("alert-danger");
        }
    });
}
//get a random number without decimals
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}
//Generates a random number between 1-6 for each dice and sends them to the server for calculations
function rollDices(){
    diceResultDiv = $(diceResultDiv);
    $("#roll").prop("checked", false);
    for(var i=0;i<5;i++){
        getCorrectDiceValues(i);
    };
    diceResultDiv.html("");//empty the div with the dices
    $.each(diceElements,function(key,element){
        diceResultDiv.append(element); //add/display the elements from our merged array
    });
    //send the result to the server
    sendToServer({"dices":diceResults},showScoreOptions);
}
//keeps the users selected dices and rolls new values for the others
function getCorrectDiceValues(dicePosition){
    var element;
    if(!dices[dicePosition]) { //first roll or the dice isn't selected
        diceResults[dicePosition] = randomNumber(1, 6);
        //find the element with the correct backgroundimage
        element = $("#diceTemplate").find("[name='d" + diceResults[dicePosition] + "']").clone();
        element.attr("data-position", dicePosition); //give the cloned copy a dicePosition value (can be 0-4)
        diceElements[dicePosition] = element; //save the copied element so it can be inserted later
    }else{//it must be the second or third roll and the element is selected so we fetch its dicePosition
        element = $('[data-position="'+dicePosition+'"]');
        diceResults[dicePosition] = element.attr("name").substring(1); //add the value to the result list again
        diceElements[dicePosition] = element; //save the selected dice element so it can be inserted later
    }
}
//passes data to the server as $_POST[postname] and calls the function callback on success
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
//shows the possible scoring options and what point  each would give
function showScoreOptions(data){
    var element,prefix,top = [1,2,3,4,5,6];
    $.each(data,function(key,value){
        if(value && value !="user") {
            prefix = ($.inArray(parseInt(key),top) == -1 ? "bottom" :"top");
            element = $("[id='" + prefix + key + data.user+"']");
            if (!element.attr("data-score")) {
                element.addClass("bg-primary clickable").html(value);
            }
        }
    });
}

//after the user confirms his pick among the scoring options, set the correct score and restore the other options
//if element is not passed it only clear all fields (used on second or third roll)
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
    newTurn();//reset so we can start a new turn
}
function clearRowFields(){
    $.each($(scoreOptionClass),function(key,value) {
        $(value).removeClass("bg-primary clickable").empty();
    });
}
function newTurn(){
    var turns = $(".bg-success");
    var players = $("#scoreboard thead tr td").length;
    if(turns.length == 15 *( players-1)){
        alert("game over");
    };
    $(diceResultDiv).empty();
    for(i=0;i<5;i++){
        dices[i] = false;
    }
    resetStartButton();
    sendToServer({turn:""})
}
function resetStartButton(){
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
        $(".modal-header").append("<h4 class='text-danger'>").find("h4").html("Names must be unique");
        return;
    }
    var currentRow,nameCell,currentCell,i= 1,
        table = document.getElementById("scoreboard"),
        row = table.rows.item(0);
    var fields=["top1","top2","top3","top4","top5","top6",
        'topTotal','bonus','bottompair','bottomtwopairs','bottomtoak','bottomfoak',
        'bottomlittle','bottombig','bottomhouse','bottomchance','bottomyatzy','result'
    ];
    //create scoreboard
    $.each(data,function(key,player){
        nameCell = row.insertCell(i);
        nameCell.innerHTML = player;
        for(var r= 0; r<fields.length;r++){
            currentRow = table.rows.item(r+1);
            currentCell = currentRow.insertCell(i);
            currentCell.setAttribute("id",fields[r]+player);
            currentCell.setAttribute("data-user",player);
            //toptotal/bonus/endresult
            if(r == 6|| r== 7 || r ==fields.length-1){
                currentCell.innerHTML = 0;
            }
        }
        i++;
    });
    $("#modal").modal("hide");
}