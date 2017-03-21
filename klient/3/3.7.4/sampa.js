$("#send").on("click",function(){
    var o = document.getElementsByTagName('iframe')[0];
    o.contentWindow.postMessage($("#message").val(),"http://localhost:63342");
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
function rec(e) {
    if (e.origin == 'http://localhost:63342') {
        var regex = /(?=[!”§$%&()=?[\]{}#+\-_.,;<>*~|]).{1,}$/;
        var match = e.data.match(regex);
        if (match==null) {
          $("#response").html(e.data);
        }else{
          $("#response").html("Trafiken har kapats");
        }
    }
}
//En event lyssnare som reagerar när ett meddelande kommer upp och då kör funktionen rec
window.addEventListener('message', rec, false);