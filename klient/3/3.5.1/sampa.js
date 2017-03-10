//visar boxen om den är dold
$("#show").on("click",function(){
    $("#box").show();
});
//döljer boxen om den visas
$("#hide").on("click",function(){
    $("#box").hide();
});
//visar boxen med fade effekt om den är dold, tar 6 sekunder
$("#fadein").on("click",function(){
    $("#box").fadeIn(6000);
});
//visar/döljer boxen beroende på stadie med fade effekt
$("#fadetoggle").on("click",function(){
    $("#box").fadeToggle();
});
//ändrar opacity till 50% över 5 sekunder med fade effekt
$("#fadeto").on("click",function(){
    $("#box").fadeTo(5000,0.5,function(){});
});
//animerar boxen till ursprungsposition och utseende med standard swing easing
$("#fadetostart").on("click",function(){
    $("#box").animate({
        opacity: 1,
        left: 0,
        easing:"swing",//standard
        height: 200,
    });
});
//visar/döljer boxen beroende på dess stadie
$("#toggle").on("click",function(){
    $("#box").toggle();
});
//döljer boxen med fade effekt om den visas, tar 3 sekunder
$("#fadeout").on("click",function(){
    $("#box").fadeOut(3000);
});
/*
   animerar boxen 50px åt höger och ändrar opacity, höjd och tiden för animation
   samt easing baserat på fyra variabler.
   Ändrar även variablernas värde i callback funktionen
*/
var opacity=0.5;
var height=50;
var duratation=3000;
var easing="linear";
$("#animate").on("click",function(){
    $("#box").animate({
        backgroundcolor: "yellow",
        opacity: opacity,
        easing:easing,
        left: "+=50",
        height: height,
    },duratation,function(){
        height==50 ? height=200 : height=50;
        opacity==0.5 ? opacity=1 : opacity=0.5;
        duratation==3000 ? duratation=5000 : duratation=3000;
        easing=="linear" ? easing="swing" : "linear";
        $("#box").html("Animering klar <br>Texten försvinner om 3s");
        setTimeout(function(){$("#box").html("");},3000);
    });
});