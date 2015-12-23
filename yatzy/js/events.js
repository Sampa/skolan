var dices = new Object(),diceResultDiv = "#diceResult",user;
dices ={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false
};

window.onload = function() {
    //get the latest toplist from the database
    getTopList();
    $('#collapseToplist').collapse({
        parent:"#collapseToplist"

    });
    $('#collapseInfo').collapse({
        parent:"#collapseInfo"
    });
    /* update the toplist when the user hides the endgame view*/
    $("#endview").on("hide.bs.modal",function(){
        //update to latest database
        getTopList();
    });
    $("#newgame").on('click',function(){
       $("#scoreboard tr td[data-user]").remove();
       $("#scoreboard .playername").remove();
        $("#enterNamesButton").show();
        $("#endview").modal("hide");
        $("#modal").modal("show");
    });
    /*
        Js related to entering playernames
     */

    //display modal and focus on first input
    $("#modal").modal();
    $('#modal').on('hide.bs.modal', function (event) {
    });
    $('#modal').on('shown.bs.modal', function () {
        $('[name="setplayer1"]').focus();
    });
    $("#modal").on("click","#setPlayerNames",function(){
        $("#playerNames").submit();
    });
    /*submitting the player names form*/
    $("#playerNames").submit(function(event){
        event.preventDefault();
        //save the names in a session
        sendToServer({"playerNames":$(this).serializeArray()},setPlayerNames);
    });
    //controls which inputfields that should be active
    $("[name^='setplayer']").keydown(function(event){
       var next, nextElement, playerNumber = parseInt($(this).attr("name").substr(9));
        next = 1+playerNumber;
        nextElement = $("[name='setplayer"+next+"']");
        //if input field is not empty
        if($("[name='setplayer"+playerNumber+"']").val().length > 0){
           nextElement.prop("disabled",false);
       }else{ //empty
           nextElement.prop("disabled",true);
       }
    });
    /*
        Various click triggers
     */
    //clicking a dice after making a roll
    //.selecteddice
    $(diceResultDiv).on("click","div",function(){
        var element = $(this);
        var pos = element.attr("data-position");
        //reverse selected status
        element.prop("selected",!element.prop("selected"));
        if(element.prop("selected")){
            dices[pos] = true;
            element.addClass("selectedDice").append('<span></span>');
        }else{
            dices[pos] = false;
            element.removeClass("selectedDice").find("span").remove();
        }
    });
    //pressing a scoring option td, confirm choice
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
    /**
     * Clicks on the animated dices makes a roll

     */
    $(".dice").on("click",function(){
        //find span element inside the countor and get the content as an int
        var element = $("#start").find("span");
        var number = parseInt(element.html()) +1;
        if(number > 3  ){
            $("#start").removeClass("alert-success").addClass("alert-danger");
            return;
        }
        //reset unused fields because we are doing a new roll
        clearRowFields();
        //start animation ,pause 1s and then generate a random result
        $("#roll").prop("checked", true);
        setTimeout(rollDices,1000);
        //replace with the new count of rolls
        element.html(number);
        //if we reached our maximum number of throws prohibit more
    });
}
