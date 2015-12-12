var dices = new Object();
dices ={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false
};
var diceElements = [];
var diceResults = [];
//get a random number without decimals
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}
//Generates a random number between 1-6 for each dice and sends them to the server for calculations
function rollDices(){
    $("#roll").prop("checked", false);
    var diceValues,target = $("#diceResult");
    for(i=0;i<5;i++){
        diceValues = getCorrectDiceValues(i);
    };
    target.html("");//empty the div with the dices
    $.each(diceElements,function(key,element){
        target.append(element); //add/display the elements from our merged array
    });
    //send the result to the server
    sendToServer(diceResults,showScoreOptions);
}
function getCorrectDiceValues(dicePosition){
    var element;
    if(!dices[dicePosition]) { //first roll or the dice isn't selected
        diceResults[dicePosition] = randomNumber(1, 6);
        //find the element with the correct backgroundimage
        element = $("#diceTemplate").find("[name='d" + diceResults[dicePosition] + "']").clone();
        element.attr("data-dicePosition", dicePosition); //give the cloned copy a dicePosition value (can be 0-4)
        diceElements[dicePosition] = element; //save the copied element so it can be inserted later
    }else{//it must be the second or third roll and the element is selected so we fetch its dicePosition
        element = $('[data-dicePosition="'+dicePosition+'"]');
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
                element.addClass("bg-primary clickable");
                element.html(value);
            }
        }
    });
}

//after the user confirms his pick among the scoring options, set the correct score and restore the other options
//if element is not passed it only clear all fields (used on second or third roll)
function setScore(element){
    $.each($(".clickable"),function(key,value){
        var start =$("#start"),obj = $(value);
        obj.removeClass("bg-primary clickable");
        if (obj.is(element)){
            obj.attr("data-score",obj.html());
            obj.addClass("bg-success");
        } else {
            obj.html("");
            start.prop("disabled",false);
            start.removeClass("btn-danger");
            start.addClass("btn-success");
        }
    });
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
        var element = $("#bonus"+user);
        element.html("50");
        element.addClass("bg-success");
    }
}
//Sets the bottom result (toptotal+bonus+bottom half)
function setResult(user){
    var topTotal = parseInt($("#total"+user).html()), bonus = parseInt($("#bonus" + user).html());
    var topScore = topTotal + bonus;
    var number, result = 0, elements = $("[id^='bottom'][id$='"+user+"']");
    $.each(elements, function(key,value){
        number = $(value).html();
        if(parseInt(number) >=0) {
            result = result + parseInt(number);
        }
    });
    $("#result"+user).html(topScore+result);
}
window.onload = function() {
    //clicking a dice after making a roll
    $("#diceResult").on("click","div",function(){
        var element = $(this);
        //var dice = $(this).attr("name").substring(1);
        var pos = element.attr("data-position");
        //reverse selected status
        element.prop("selected",!element.prop("selected"));
        if(element.prop("selected")){
            dices[pos] = true;
            element.addClass("selectedDice");
            element.prepend('<span></span>');
        }else{
            dices[pos] = false;
            element.removeClass("selectedDice");
            element.find("span").remove();
        }
    });
    //pressing a scoring option td, ask for confirm
    $("tr").on("click",".clickable",function(){
        var element = $(this);
        $.confirm({
            text: "Are you sure?",
            title: "Confirm choice",
            confirm: function(button) {
                //sets score for element and resets unused fields and allow new throws
                setScore(element);
                $("#start span").html("0");
                setTopTotal("Adam");
                setResult("Adam");
            },
            confirmButton: "Yes I am",
            cancelButton: "No",
            post: true,
            confirmButtonClass: "btn-success",
            cancelButtonClass: "btn-danger",
            dialogClass: "modal-dialog modal-sm"
        });
    });
    //dont need "live element" selector
    $("#start").on("click",function(){
        //reset unused fields because we are doing a new roll
        setScore();
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
            $(this).prop("disabled",true);
            $(this).removeClass("btn-success");
            $(this).addClass("btn-danger");
        }
    });
}
