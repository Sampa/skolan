var img1 = "http://placehold.it/250x150";
var img2 = "http://placehold.it/350x150";
var img = img2;
//Togglar den bild som används
$("#changeImg").on("click",function(e){
    $("#img").attr('src',img);
    img == img1 ? img=img2 : img=img1;
});
//byter till 250x150 bilden om man hoovrar 25x15
$("#img3").mouseover(function(){
   $("#img").attr('src',img1);
   img=img2;
});
//byter till 350x150 bilden om man hoovrar 35x15
$("#img4").mouseover(function(){
   $("#img").attr('src',img2);
   img=img1;
});
