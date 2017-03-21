/*
    Skickar iväg en get request till
    http://people.dsv.su.se/~pierre/courses/05_ass/ip3/3/3.6.1/example.php
    med talen från formuläret och skriver in svaret i resultat elementet.
    Lägger även till en border för att visa att det är klart.
*/
$("#calc").on("submit",function(e){
    e.preventDefault();
    var url = "http://people.dsv.su.se/~pierre/courses/05_ass/ip3/3/3.6.1/example.php?number1=";
    url += $("#num1").val() + "&number2=" + $("#num2").val();
    $.get(url, function( data ) {
    $("#sum").html(data);
    $("#sum").css("border","1px solid green");
    });
});