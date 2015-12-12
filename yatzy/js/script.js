var scoreOptionClass =".clickable",dices = new Object(),
    diceElements = [],diceResults = [];
dices ={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false
};
var diceResultDiv = "#diceResult";
window.onload = function() {
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
        $.confirm({
            text: "Are you sure?",
            title: "Confirm choice",
            confirm: function(button) {
                //sets score for element and resets unused fields and allow new throws
                setRowScore(element);
                setTotals("Adam");
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
    $("#start").on("click",function(){
        //reset unused fields because we are doing a new roll
        clearRowFields();
        //start animation and then generate results
        $("#roll").prop("checked", true);
        setTimeout(rollDices,1000);
        //find span element inside the button and then its contents as int
        var element = $(this).find("span");
        var number = parseInt(element.html()) +1;
        //replace with the new count of rolls
        element.html(number);
        //if we reached our maximum number of throws prohibit more
        if(number > 2){
            $(this).prop("disabled",true).removeClass("btn-success").addClass("btn-danger");
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
    sendToServer(diceResults,showScoreOptions);
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
        console.log(element);
        diceResults[dicePosition] = element.attr("name").substring(1); //add the value to the result list again
        diceElements[dicePosition] = element; //save the selected dice element so it can be inserted later
    }
}
//data passed to the server and on success we show the user his/hers options
function sendToServer(result,callback){
    $.ajax({
        type: "POST",
        url: "server.php",
        data: {"data":result},
        success: function (data){
            callback(data);
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
    $(diceResultDiv).empty();
    for(i=0;i<5;i++){
        dices[i] = false;
    }
    resetStartButton();
}
function resetStartButton(){
    $("#start").prop("disabled", false).removeClass("btn-danger").addClass("btn-success").find("span").html("0");
}
//calculates the total for the top half (1-6)
function setTopTotal(user){
    var total = 0,number,elements = $("[id^='top']");
    $.each(elements,function(key,value){
        number = parseInt($(this).html());
        if(!isNaN(number))
            total = total + number;
    });
    $("#total"+user).html(total);
    setBonus(total,user);
}
//when the toptotal is 63 or more, this adds the 50 bonus points
function setBonus(topTotal,user){
    if(topTotal > 62){
        $("#bonus"+user).html("50").addClass("bg-success");
    }
}
//Sets the bottom result (toptotal+bonus+bottom half)
function setTotal(user){
    var topScore = parseInt($("#total"+user).html()) + parseInt($("#bonus" + user).html());
    var number, result = 0, elements = $("[id^='bottom'][id$='"+user+"']");
    $.each(elements, function(key,value){
        number = parseInt($(value).html());
        if(number >=0) {
            result = result + number;
        }
    });
    $("#result"+user).html(topScore+result);
}
function setTotals(user){
    setTopTotal(user);
    setTotal(user);
}