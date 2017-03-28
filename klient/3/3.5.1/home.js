$(document).ready(function(){
    showInfo();
});
$("#removeLocal").on("click",function(){
    localStorage.clear();
    $("#profile").html("");
    $("#reverse").show();
});
$("#removeSession").on("click",function(){
    sessionStorage.clear();
    $("#profile").append("<h5>SessionStorage tömt</h5>");
    $("#removeSession").hide();
    $("#reverse").hide();
});
$("#reverse").on("click",function(){
    var info = sessionStorage.getItem("profile");
    localStorage.setItem("profile",info);
    info = JSON.parse(info);
    appendProfile(info);
});
function showInfo(event){
    var data = localStorage.getItem("profile");
    sessionStorage.setItem("profile",data);
    data = JSON.parse(data);
    $("#profile").html("");
    appendProfile(data);
}
function appendProfile(info){
    $.each(info,function(key,field){
        $("#profile").append("<br>"+field.name+" : "+field.value);
    });
}
window.addEventListener("storage",showInfo,false);
