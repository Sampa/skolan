var user, rollCounter = $("#play").find("span");
window.onload = function() {
/***
 * IMPORTS of templates files
 */
    //INSERTS THE SCOREBOARD.HTML IMPORT TEMPLATE to #scoreSection
    importTemplate("scoreboard",$("#scoreSection"));
    //INSERTS THE TOPLIST.HTML TEMPLATE to #toplist
    importTemplate("toplist");
    //INSERTS THE ENDVIEW.HTML MODAL TEMPLATE to #endviewWrapper
    importTemplate("endview",$("#endviewWrapper"));
    //INSERT THE PLAYERFORM.HTML MODAL TEMPLATE to #playerform
    importTemplate("playerform");
/*END IMPORT templates*/

/**
 *  TOPLIST
 *  GETS THE TOPLIST TEMPLATE, FETCHES THE TOPLIST DATA AND ADDS TOGGLE TRIGGER
 */
    /*get the latest toplist from the database*/
    getTopList();
    /* Toggle top list visibility */
    $('#toplistTitle').on("click",function(){
        $("#toplist").slideToggle(800,"easeInOutCirc",function(){});
    });
    /* update the toplist when the user hides the endgame view*/
    $("#endview").on("hide.bs.modal",function(){
        getTopList(); //get the latest topList scores
    });
/* END TOPLIST */

/**
 * JS RELATED TO ENTERING PLAYERNAMES IN MODAL
 */
    var modal = $("#modal");
    modal.on('shown.bs.modal', function () {
        $('[name="setplayer1"]').focus();
    });
    /* Removes players from old game, and submits the playerform*/
    modal.on("click","#setPlayerNames",function(){
        var scoreboard = $("#scoreboard");
        scoreboard.find("tr td[data-user]").remove();
        scoreboard.find(".playername").remove();
        $("#playerNames").submit();
    });
    /*submitting the player names form*/
    $("#playerNames").submit(function(event){
        event.preventDefault();
        //save the names in a session
        sendToServer({"playerNames":$(this).serializeArray()},setPlayerNames);
    });
    //controls which inputfields that should be accessible
    $("[name^='setplayer']").keydown(function(){ //starts to write in a inputfield for playernames
        var next, nextElement, playerNumber = parseInt($(this).attr("name").substr(9)); //too see which field it is
        next = 1+playerNumber;
        nextElement = $("[name='setplayer"+next+"']"); //the next field in the form
        //if input field is not empty
        if($("[name='setplayer"+playerNumber+"']").val().length > 0){
            nextElement.prop("disabled",false);
        }else{ //the field has been emptied
            nextElement.prop("disabled",true);
        }
    });
/*END SETTING PLAYERNAMES */

/**
 * DICES ROLL & SELECT TO KEEP
 */
    //selects a dice to keep it for next roll
    $("#dices").on("click",".cubeWrapper",function(){
        if(rollCounter.html()==0)//no throws made yet
            return;
        var element = $(this); //the wrapper around the cubes
        //reverse selected status
        element.prop("selected",!element.prop("selected"));
        if(element.prop("selected")){
            element.addClass("selectedDice").find("span").show();
        }else{
            element.removeClass("selectedDice").find("span").hide();
        }
    });//#dices click trigger
    //THROW THE DICES
    $("#play").on("click",function (e) {
        e.preventDefault();
        //updateThrowCount(rollCounter);
        //find span element inside the countor and get the content as an int
        var number = parseInt(rollCounter.html()) +1;
        //show the new count of rolls
        //if we reached our maximum number of throws prohibit more
        if(number >  3  ) {
            return;
        }else if( number == 3){ // it's the last throw so make it the counter red
           $(this).disable();
        }
        rollCounter.html(number);
        //reset unused fields because we are doing a new roll
        clearRowFields();
        rollDices();
    }); //#play click trigger
/* END DICES */

/* DIFFERENT TRIGGERS */
    /* toggle information visibility */
    $("#infoTitle").on("click",function(){
        $("#info").fadeToggle(800,"easeInOutCirc",function(){});
    });

    /* To start a new game we remove the old scoreboard, hide the endview and displays the modal/button to enter usernames*/
    $("#newgame").on('click',function(){
       newGame();
    });//newgame click trigger

    /** pressing a row td to select it for points asks to confirm choice
     * if yes, set the score for that row, update the totals and prepares the game for a newturn
     */
    $("#scoreSection tr").on("click",".clickable",function(){
        confirmOption($(this),"blend-gradient");
    });//clickable tr click
$(document).uitooltip({tooltipClass: "blend-gradient",position: { my: "left top+15 center", at: "center" }});
};//document load
