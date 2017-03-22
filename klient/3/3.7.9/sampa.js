/*
Loggar ut en användare och visar ett meddelande som bekräftelse
*/
$("#logout").on("click",function(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $("#profile").fadeOut();
        $("#logout").fadeOut();
        $(".g-signin2").fadeIn();
        $("#topbar p").html("Du är nu utloggad");
    });

});
/*
Visa användaren information efter att man loggat in
*/
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#pic").attr("src",profile.getImageUrl());
    $("#profile header h1").html(profile.getName());
    $("#info").html("#"+profile.getId()+" ").append(profile.getEmail());
    $(".g-signin2").fadeOut();
    $("#logout").fadeIn();
    $("#profile").fadeIn();
}