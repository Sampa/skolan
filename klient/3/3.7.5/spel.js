var players = {
    "adam@live.se":{
        "name":"haXXor",
        "games":["CS:GO","WOW"],
        "member_since": "2012-03-01"
    },
    "mika@gmail.com":{
        "name":"Mika1337",
        "games": ["Starcraft 2", "LoL"],
        "member_since": "2015-06-08"
    }
};
/*
    Funktionen kollar först att det är rätt origin, och har sen ett regulärjt
    uttryck för att testa om det är en email. Om en email hittas så skickas speldatan tillbaka
    till det html dokument informationen kom ifrån. Annars skickas ett felmeddelande.
*/
function rec(e) {
    if (e.origin == 'http://localhost:63342') {
        var regex = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/g;
        var match = e.data.match(regex);
        if (match!=null) {
            var response = players[e.data];
            e.source.postMessage(["spel",response], e.origin);
       }else{
            e.source.postMessage("Felaktig input", e.origin);
       }
    }
}
//En event lyssnare som reagerar när ett meddelande kommer upp och då kör funktionen rec
window.addEventListener('message', rec, false);