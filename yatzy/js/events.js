var user, rollCounter = $("#play").find("span");
window.onload = function() {
/**
 *  TOPLIST
 *  GETS THE TOPLIST TEMPLATE, FETCHES THE TOPLIST DATA AND ADDS TOGGLE TRIGGER
 */
    /*get the latest toplist from the database*/
    getTopList();
    /* Toggle top list visibility */
    $("aside > section").on("click","#toplistTitle",function(){
        $("#toplist").fadeToggle(800,"easeInOutCirc",function(){});
    });
    /* update the toplist when the user hides the endgame view*/
    $("#endview").on("hide.bs.modal",function(){
        getTopList(); //get the latest topList scores
    });
/* END TOPLIST */

/**
 * JS RELATED TO ENTERING PLAYERNAMES IN MODAL
 */
    var modal = $("#modal"),playerform = $("#playerform");
    modal.on('shown.bs.modal', function () {
        $('[name="setplayer1"]').focus();
    });
    /* Removes players from old game, and submits the playerform*/
    playerform.on("click","#setPlayerNames",function(){
        var scoreboard = $("#scoreboard");
        scoreboard.find("tr td[data-user]").remove();
        scoreboard.find(".playername").remove();
        $("#playerNames").submit();
    });
    /*submitting the player names form*/
    playerform.on("submit","#playerNames",function(event){
        event.preventDefault();
        //save the names in a session
        sendToServer({"playerNames":$(this).serializeArray()},setPlayerNames);
    });
    //controls which inputfields that should be accessible when user starts to write in a inputfield for playernames
    playerform.on("keydown","[name^='setplayer']",function(){
        enableNextInput($(this));
    });
/*END SETTING PLAYERNAMES */

/**
 * DICES ROLL & SELECT TO KEEP
 */
    /* click on a single dice selects the dice to keep it for next roll */
    $("#dices").on("click",".cubeWrapper",function(){
        if(rollCounter.html()==0)//no throws made yet
            return;
        keepDice($(this));
    });
    /* we click the roll dice button */
    $("#play").on("click",function (e) {
        e.preventDefault();
        newRoll(rollCounter);
    });
/* END DICES */

/* DIFFERENT TRIGGERS */
    /* submit of contact form*/
    $("footer").on("submit","#contactForm",function(e){
        e.preventDefault();
        $("footer > .container-fluid").loadingOverlay();
        var formData = $(this).serializeArray();
        sendToServer({"contactForm":JSON.stringify(formData)},emailCallback);
    });

    /* toggle information visibility */
    $("#infoTitle").on("click",function(){
        $("#info").fadeToggle(800,"easeInOutCirc",function(){});
    });

    /* To start a new game we remove the old scoreboard, hide the endview and displays the modal/button to enter usernames*/
    $(".newgame").on('click',function(){
       newGame();
    });//newgame click trigger

    /**
     *  Toggle the contactform's visibility
     *  We toggle the icon on the button to provide better user experience
    **/
    $("footer").on("click", '#hideContactForm', function () {
        $("#cfw").fadeToggle();
        var span = $(this).children("span:nth-child(2)");
        var down = "glyphicon-menu-down";
        var up = "glyphicon-menu-up";
        if(span.hasClass(down)){
            span.removeClass(down);
            span.addClass(up);
            $(this).attr("title","Show contact form");
        }else{
            span.removeClass(up);
            span.addClass(down);
            $(this).attr("title","Hide contact form");
        }
    });

    /**
     * pressing a row td to select it for points asks to confirm choice
     * if yes, set the score for that row, update the totals and prepares the game for a newturn
     */
    $("#scoreSection").on("click",".clickable",function(){
        confirmOption($(this),"blend-gradient");
    });//clickable tr click

    /*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
    $.widget.bridge('uibutton', $.ui.button);
    $.widget.bridge('uitooltip', $.ui.tooltip);
    $(document).uitooltip({tooltipClass: "blend-gradient",position: { my: "left top+15 center", at: "center" }});
};//document load

/**
 * webcomponents used for ff,edge,safari for html5 imports to work
 */
window.addEventListener('WebComponentsReady', function() {
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
    //INSERTS THE CONTACTFORM.HTML IMPORT to #cfw (contact form wrapper)
    importTemplate("contactform",$("#cfw"));
    /*END IMPORT templates*/
});