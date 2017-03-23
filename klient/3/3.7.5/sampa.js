$("#send").on("click",function(e){
    e.preventDefault();
    $("#response").html("");
    var adress = document.getElementsByTagName('iframe')[0];
    adress.contentWindow.postMessage($("#user").val(),"http://localhost:63342");
 });
/*
    Funktionen kollar först att det är rätt origin, och har sen ett regulärjt
    uttryck för att hitta specialtecken.
    Om inga hittas så skrivs datan (som kan vara felmeddelande om samma kontroll
    misslyckades i mottagar dokumentet ) in i rätt html element.
    Annars skickas ett felmeddelande eftersom då har något gått helt fel då datan
    som skrevs in av användaren har kontrollerats i rec.js redan och om det innehöll
    specialtecken ska svaret vara "Felaktig data".
*/
var email;
function rec(e) {
    var spel;
    if (e.origin == 'http://localhost:63342') {
        if (e.data[0]=="adress") {
           email = adress(e.data[1]);
           spel = document.getElementsByTagName('iframe')[1];
           spel.contentWindow.postMessage(email,"http://localhost:63342");
        }else if(e.data[0]=="spel"){
            gameData(e.data[1],email);
        }
    }
}
function gameData(u,email){
    var ul=$("<ul></ul>");
    $.each(u,function(key,value){
        ul.append($("<li></li>").text(key+": "+value));
    });
    ul.append($("<li></li>").text("Email: "+email));
    $("#response").append(ul);
}
function adress(u){
    var email,ul=$("<ul></ul>");
    $.each(u,function(key,value){
        ul.append($("<li></li>").text(key+": "+value));
        if(key=="email"){
            email=value;
        }
    });
    $("#response").append(ul);
    return email;
}
//En event lyssnare som reagerar när ett meddelande kommer upp och då kör funktionen rec
window.addEventListener('message', rec, false);