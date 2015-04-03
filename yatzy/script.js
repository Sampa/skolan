/**
 * Created by Happyjuiced on 2015-04-02.
 */
window.onload = function(){
    document.getElementById("roll").onclick = function(){
        D6AnimBuilder.get("dice").reset();
        D6AnimBuilder.get("dice").start();
    };

    $("[id^='containerdice']").on("click",function(){
        alert($(this).children("img").attr("id"));
        $(this).css("border", "1px solid red");
    });
}
