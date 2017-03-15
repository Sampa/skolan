//gör att alla externa länkar öppnas i nytt fönster
$("a[href^='http']").attr('target','_blank');


/* MENYN */
//första nivån visar/döljer
$(".top").hover(function(e){
    e.preventDefault();
    var ul = $(this).find("ul:first");
    ul.fadeToggle();
});
//andra nivåer
$(".sub").hover(function(e){
    e.preventDefault();
    var ul = $(this).find("ul:first");
    ul.fadeToggle();
    ul.css({
        "margin-left":"100%",
        "margin-top":"-3em"
    });
});
