/**
 * Created by Happyjuiced on 2015-04-02.
 */
/* get a random number without decimals */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1 ) + min);
}
/* Generates 5 random number 1-6 and sends them to the server for calculations*/
function generateResult(){
    $("#roll").prop("checked", false);
    var element,roll, result = new Object(),target = $("#dices");
    target.html("");
    for(i=0;i<5;i++){
        result[i] = randomNumber(1,6);
        //clone the template element with the right dice image
        element = $("#diceTemplate").find("[name='d"+result[i]+"']").clone();
        element.appendTo(target);
    };
    sendToServer(result,showScoreOptions);
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
//shows the possible scoring options
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

//after confirming the score, restore the other divs
function setScore(element){
    $.each($(".clickable"),function(key,value){
        var obj = $(value);
        obj.removeClass("bg-primary clickable");
        if (obj.is(element)){
            obj.attr("data-score",obj.html());
            obj.addClass("bg-success");
        } else {
            obj.html("");
        }
    });
}
//calculates the top total (1-6)
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
function setBonus(topTotal,user){
    if(topTotal > 62){
        var element = $("#bonus"+user);
        element.html("50");
        element.addClass("bg-success");
    }
}
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
            confirmButtonClass: "btn-primary",
            cancelButtonClass: "btn-default",
            dialogClass: "modal-dialog modal-sm"
        });
    });
    $("#start").on("click",function(){
        //reset unused fields
        setScore();
        //start animation and then generate results
        $("#roll").prop("checked", true);
        setTimeout(generateResult,1000);
        //find span element inside the button and then its contents as int
        var element = $(this).find("span");
        var number = parseInt(element.html()) +1;
        //replace with the new count of rolls
        element.html(number);
        //if we reached our maximum number of throws prohibit more
        if(number > 2){
            $(this).attr("disabled","disabled");
        }
    });
}
