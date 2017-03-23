/*
    Funktionen kollar först att det är rätt origin, och har sen ett regulärjt
    uttryck för att hitta specialtecken. Om inga hittas så skickas datan tillbaka
    till det html dokument informationen kom ifrån. Annars skickas ett felmeddelande.

*/
var p = {
    "people":[
        {
            "name":"Adam",
            "street":"Markvägen 41",
            "zip":72248,
            "city":"Avesta",
            "country":"Sverige",
            "email": "adam@live.se"
        },
        {
            "name":"Mika",
            "street":"Latokartanonkaari",
            "zip":00014,
            "city":"Helsinki",
            "country":"Suomi",
            "email": "mika@gmail.com"
        }
    ]
};
/*var response = {
            "city":ul.find(".city").html(),
            "street":ul.find(".street").html(),
            "zip":ul.find(".zip").html(),
            "country":ul.find(".country").html()
            };*/
function rec(e) {
    if (e.origin == 'http://localhost:63342') {
       var regex = /(?=[!”§$%&()=?[\]{}#+\-_.,;<>*~|]).{1,}$/;
       var match = e.data.match(regex);
       if (match==null) {
          var response = p.people[e.data-1];
          e.source.postMessage(["adress",response], e.origin);
       } else {
          e.source.postMessage("Felaktig input", e.origin);
       }
    }
}
//En event lyssnare som reagerar när ett meddelande kommer upp och då kör funktionen rec
window.addEventListener('message', rec, false);