/**
 * Created by Happyjuiced on 2015-04-02.
 */

//shows the possible scoring options
function score(result){
    var data = $("[id^='containerdice']").children("img:not(.sel)").toArray();
    var selected = $("#selected").find("[id^='containerdice']").children("img").toArray();
    console.log(data.length);
    console.log(selected.length);
    //var selected = $("#selected").children(".die").toArray();//$("[id^='selected']")
    //console.log(selected);
    //for(i=0;i < selected.length;i++){
    //    data[data.length+i+1] = selected[i];
    //}
    //data.concat(selected);
    var data =$.merge(data,selected);
    //console.log(foo);
    var scrArray = new Object();
    for(i=0;i<5;i++){
        var element = data[i];
        console.log(element);
        if(typeof element == "undefined")
            continue;
        var id = element.getAttribute("id"); //which dice
        var src = element.getAttribute("src"); //src attribute containing the result
        src = src.substr(src.lastIndexOf('/') + 1);//find the last part in the src path
        scrArray[id] = src.charAt(4); //the number containing the result is always at pos 5(index 4)
    };
    //console.log(scrArray);
    //send to server for calculations
    $.ajax({
        type: "POST",
        url: "server.php",
        data: {"data":scrArray, "chance":result},
        success: function (data){
            showScoreOptions(data);
        },
        error: function(data){
            console.log(data);
        },
        dataType: "json"
    });
}
function showScoreOptions(data){
    $.each(data,function(key,value){
        if(value) {
            var name = "[name='" + key + "']";
            var parent = $(name);
            var element = $(name + " > div");
            if (element.html() == "") {
                parent.addClass("bg-primary clickable");
                element.html(value);
            }
        }
    });
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function generateResult(){
    $("#roll").prop("checked", false);
    var result = [
        randomNumber(1,6),
        randomNumber(1,6),
        randomNumber(1,6),
        randomNumber(1,6),
        randomNumber(1,6),
    ];
    console.log(result);
}
//after confirming the score, restore the other divs
function setScore(element){
    $.each($(".clickable"),function(key,value){
        var obj = $(value);
        obj.removeClass("bg-primary clickable");
        if(!obj.is(element)){
            obj.html("");
        }else{
            obj.addClass("bg-success");
        }
    });
}
window.onload = function() {
    //D6.roll();
    $("tr").on("click",".clickable",function(){
        var element = $(this);
        $.confirm({
            text: "Are you sure?",
            title: "Confirm choice",
            confirm: function(button) {
                setScore(element);
            },
            confirmButton: "Yes I am",
            cancelButton: "No",
            post: true,
            confirmButtonClass: "btn-primary",
            cancelButtonClass: "btn-default",
            dialogClass: "modal-dialog modal-sm"
        });
    });


    $("#dices").on("click","#roll",function(){
        D6.roll();
    });

    $("[id^='containerdice']").on("click",function(){
        //move the correct element
        var element = $(this).children("img");
        var target = $("#selected");
        var id = element.attr("id"); //which dice
        //extract the value from src attribute
        var src = element.attr("src");
        src = src.substr(src.lastIndexOf('/') + 1);
        src = src.charAt(4);
        //move and hide
        $(this).appendTo(target);
        //show "dumb" pic instead
        //var picture = $("#selected"+src).clone();
        //picture.appendTo(target);
        //picture.removeClass("hidden");
        //element.addClass("sel");
        //$(this).hide();
    });
    $("#selected").on("click", "img",function(){
        var element = $(this);
        var id = element.attr("id"); //which dice
        var id = "#container" + id;
        element.appendTo(id);
    });
    $("#start").on("click",function(){
        $("#roll").prop("checked", true);
        setTimeout(generateResult,3000);
    });
}

/**
 * Created by Daniel on 2015-12-07.
 */
