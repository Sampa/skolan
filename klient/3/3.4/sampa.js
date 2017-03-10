//en variabel åt vårt fönsterobjekt som flera funktioner använder
var w;
//sätter igång klockan
var timer = setInterval(function(){ showTime() }, 1000);
//variabel som används för att bestämma om klockan ska gå mer än 10s eller inte
var timeOut;
/*
    uppdaterar informationen om vårt huvud fönster varje sekund så att
    man ser att det ändras om användaren modifierar det
*/
setInterval(function(){writeInfo();},1000);
//skapa nytt fönster med dsv.su.se och fokusera det och sätter värden på objekt variablarna
function openW(){
    if(w !=null){
        w.focus();
        w=null;
        return;
    }
    w = window.open('','_blank','width=400,height=300');
     //flyttar det så det inte är ivägen efter 1,5 sekund
    setTimeout(function(){w.moveTo(300,0);}, 1500);
}
//ändrar storleken på fönstret
function resizeW(){
    w.resizeBy(100,100);
    w.focus();
}
//skickar det öppnade fönstret till bakgrunden
function blurW(){
    if(w !=null){
        w.blur();
    }
}
//stänger fönstret om det är öppet
function closeW(){
     if(w !=null && w !=undefined){
        if(confirm("Är du säker?")){
            w.close();
            alert("Fönstret stängdes");
        }else{
            w.focus();
        }
     }
}
//flyttar öppnat fönster så mycket som användaren skriver in via prompt()
function moveW(){
    var x = prompt("Hur mycket vill du flytta fönstret åt höger?(px)");
    var y = prompt("Hur mycket vill du flytta fönstret nedåt?(px)");
    w.moveBy(x,y);
    w.focus();
}
//sätter storleken på öppnat fönster med det användaren skriver in
function resizeBy(){
    var x = prompt("Skriv in bredden (px)");
    var y = prompt("Skriv in höjden (px)");
    w.resizeBy(x,y);
    w.focus();
}
//skriv information om huvudfönstret
function writeInfo(){
    writeNavInfo();
    writeLocInfo();
    writeScreenInfo();
    writeWinInfo();
}
//skriver information om Window objektet
function writeWinInfo(){
    document.getElementById("winInfo").innerHTML =
    "<br>Left:" + window.screenLeft +
    "<br>Top:" + window.screenTop +
    "<br>X:" + window.screenX +
    "<br>Y:" + screenY +
    "<br>InnerHeight:" + innerHeight +
    "<br>OuterHeight:" + outerHeight +
    "<br>InnerWidth:" + innerWidth +
    "<br>OuterWidth:" + outerWidth +
    "<br>Screen width:" + screen.width;
}
//skriver information om Navigator objektet
function writeNavInfo(){
    document.getElementById("navInfo").innerHTML =
     "<br> appName:" + navigator.appName +
     "<br> language:" + navigator.language +
     "<br> appCodeName:" + navigator.appCodeName +
     "<br> appVersion:" + navigator.appVersion +
     "<br> platform:" + navigator.platform +
     "<br> userAgent:" + navigator.userAgent +
     "<br> cookieEnabled:" + navigator.cookieEnabled;
}
//skriver information om Location objektet
function writeLocInfo(){
    document.getElementById("locInfo").innerHTML =
     "<br> host:" + location.host +
     "<br> hostname:" + location.hostname +
     "<br> port:" + location.port +
     "<br> href:" + location.href +
     "<br> protocol:" + location.protocol +
     "<br> userAgent:" + location.pathname +
     "<br> hash:" + location.hash +
     "<br> search:" + location.search;
}
//skriver information om Screen objektet
function writeScreenInfo(){
    document.getElementById("screenInfo").innerHTML =
     "<br> width:" + screen.width +
     "<br> height:" + screen.height +
     "<br> availWidth:" + screen.availWidth +
     "<br> availHeight:" + screen.availHeight +
     "<br> colorDepth:" + screen.colorDepth +
     "<br> pixelDepth:" + screen.pixelDepth;
}
/*
    tar hjälp av jQuerys scroll() som körs när man scrollar
    och visar hur långt man skrollat åt höger eller neråt.
*/
$(document).scroll(function(){
    document.getElementById("pageYX").innerHTML = "<br>PageYOffset:" + pageYOffset + "<br>PageXOffset:" + pageXOffset;
});
//visar klockan
function showTime() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    document.getElementById("time").innerHTML = time;
     if(timeOut == null)
        timeOut = setTimeout(function(){stopTime();},10000);
}
//stoppar klockan
function stopTime() {
    clearInterval(timer);
}
//avbryter timeouten för klockan
function stopTimeOut(){
    clearTimeout(timeOut);
    document.getElementById("clockInfo").innerHTML = "Klockan kommer fortsätta att rulla";
}
