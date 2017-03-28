var w = null;;
$("#reg").on("submit",function(e){
    e.preventDefault();
    var str = $(this).serialize();
    if(w == null || w.closed){
        w = window.open("home.html","sampa.dvdb.skolan.3.5.1.home");
    }
    w.focus();
    var data = $(this).serializeArray();
    localStorage.setItem('profile', JSON.stringify(data));
});
$("#reg [id]").on("change",function(){
    sessionSave($(this));
});
$("#reg select").on("change",function(){
    sessionSave($(this));
});
$(document).ready(function(){
    var formFields = $("#reg").children().not("label, button");
    var id;
    $.each(formFields,function(key,value){
        id = $(value).attr("id");
        $("#"+id).val(sessionStorage.getItem(id));
    });
});
$("#remove").on("click",function(){
    sessionStorage.clear();
    localStorage.clear();
    var formFields = $("#reg").children().not("label, button");
    var id;
    $.each(formFields,function(key,value){
        id = $(value).attr("id");
        $("#"+id).val("");
    });
});
function showInfo(event){
    var field;
    $.each(JSON.parse(localStorage.getItem("profile")),function(key,id){
        field = $("#"+id.name);
        field.val(id.value).trigger("change");
    });
}
function sessionSave(field){
    sessionStorage.setItem(field.attr("id"),field.val());
}
window.addEventListener("storage",showInfo,false);
