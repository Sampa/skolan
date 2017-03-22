/*
 Funktionen körs när sidan laddas. Språk och location har satts till Sverige/Svenska när
 googles script laddas in. Från googles sida:
 "Setting the language shows the map in the language of your choice.
 Setting the region biases the geocoding results to that region."
 Stockholm är default. Accepterar två argument (lat och long) och ser till att de blir
 nummer om de består av en sträng med siffror
*/
var map;
function initMap(lat=32.715736, long=-117.161087) {
    if(typeof(lat)!="number"|| typeof(long)!="number"){
        lat=parseInt(lat);
        long=parseInt(long);
    }
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: lat, lng: long}
    });


}
function eqfeed_callback(response) {
      map.data.addGeoJson(response);
}
/*
    När man skrivit in koordinater och klickar på visa karta laddas en ny in
    hindrar att formuläret skickas iväg och anropar initMap med de nya koordinaterna.
*/
$("#showmap").on("click",function(e){
    e.preventDefault();
    var lat = $("#lat").val();
    var long = $("#long").val();
    initMap(lat,long);
});

/*
    Visar med hjälp av jsonp platser för jordbävningar på jorden utan att ladda om sidan
*/
$("#showplaces").on("click",function(e){
    e.preventDefault();
    var script = document.createElement('script');
    script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
    document.getElementsByTagName('head')[0].appendChild(script);
});
