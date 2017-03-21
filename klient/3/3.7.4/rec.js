/*
    Funktionen kollar först att det är rätt origin, och har sen ett regulärjt
    uttryck för att hitta specialtecken. Om inga hittas så skickas datan tillbaka
    till det html dokument informationen kom ifrån. Annars skickas ett felmeddelande.

*/
function rec(e) {
    if (e.origin == 'http://localhost:63342') {
       var regex = /(?=[!”§$%&()=?[\]{}#+\-_.,;<>*~|]).{1,}$/;
       var match = e.data.match(regex);
       if (match==null) {
          e.source.postMessage(e.data, e.origin);
       } else {
          e.source.postMessage("Felaktig input", e.origin);
       }
    }
}
//En event lyssnare som reagerar när ett meddelande kommer upp och då kör funktionen rec
window.addEventListener('message', rec, false);