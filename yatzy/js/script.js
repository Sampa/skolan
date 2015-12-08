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
    var result = new Object(); //iniate json array
    var element, roll;
    var target = $("#dices"); //where we want to put the dice image matching the result
    target.html("");
    for(i=0;i<5;i++){
        roll = randomNumber(1,6);
        result[i] = roll;
        //clone the template element with the right dice image
        element = $("#diceTemplate").find("[name='d"+roll+"']").clone();
        element.appendTo(target);
    };
    //data passed to the server and on success we show the user his/hers options
    $.ajax({
        type: "POST",
        url: "server.php",
        data: {"data":result},
        success: function (data){
            console.log(data);
            showScoreOptions(data);
        },
        error: function(data){
            console.log(data);
        },
        dataType: "json"
    });
}
//shows the possible scoring options
function showScoreOptions(data){
    $.each(data,function(key,value){
        if(value) {
            var name = "[name='" + key + "']";
            var parent = $(name);
            var element = $(name + " > div");
            console.log(element.html());//visar blank rad  eller undefined som bråkar
            if (element.html() == "" || element.html() == "undefined") {
                parent.addClass("bg-primary clickable");
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
        if(element != "undefined") {
            if (!obj.is(element)) {
                obj.html("");
            } else {
                obj.addClass("bg-success");
            }
        }
    });
}
//calculates the top total (1-6)
function setTopTotal(user){
    var elements = $("[id^='top']");
    var total = 0;
    var number;
    $.each(elements,function(key,value){
        number = $(this).find("div").html();
        number = parseInt(number);
        if(!isNaN(number)){
            total = total + number;
        }
    });
    $("#total"+user).html(total);
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
        //reset unused fields (we need dummy data to pass)
        setScore();
        //start animation and then generate results
        $("#roll").prop("checked", true);
        setTimeout(generateResult,1000);
        //find span element inside the button and then its contents as int
        var element = $(this).find("span");
        var number = parseInt(element.html());
        //replace with the new count of rolls
        number = number +1;
        element.html(number);
        //if we reached our maximum number of throws prohibit more
        if(number > 2){
            $(this).attr("disabled","disabled");
        }
    });


    //$("[id^='containerdice']").on("click",function(){
    //    //move the correct element
    //    var element = $(this).children("img");
    //    var target = $("#selected");
    //    var id = element.attr("id"); //which dice
    //    //extract the value from src attribute
    //    var src = element.attr("src");
    //    src = src.substr(src.lastIndexOf('/') + 1);
    //    src = src.charAt(4);
    //    //move and hide
    //    $(this).appendTo(target);
    //});
    //$("#selected").on("click", "img",function(){
    //});
}
