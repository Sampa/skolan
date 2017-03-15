    //när man rör musen in över formuläret byter vi class på det
    function formHoverIn(event){
        $(this).removeClass("unhover");
        $(this).addClass("hover");
    }
    //när man rör musen ut från formuläret byter vi class på det.
    function formHoverOut(event){
        $(this).removeClass("hover");
        $(this).addClass("unhover");
    }
    $("form").hover(formHoverIn,formHoverOut);
    //när vi fokuserar i textfältet visar vi en text och ser till att den bara finns i en uppsättning
    $("input").focus(function(){
       $("#type").remove();
       $("form").append("<p id='type'>Skriv något i fältet och tryck på 'Enter' (klicka på den här raden för att rensa)</p>");
    });
    /*när vi klickar på parapgrahpen #type tar vi bort den igen och rensar
    textfältet samt lägger till en class på formuläret som ändrar dess bredd
    vi kollar även att man skrivit minst ett tecken i fältet*/
    $("form").on('click',"#type",function(){
        if($("input").val().length > 0){
            $(this).remove();
            $("#text").val('');
            $("form").addClass("done");
        }else{
            alert("Skriv något först");
        }
    });
    //när bilden har laddats in lägger vi till lite text och en länk nedanför bilden
    $("#bild").on('load', function(){
        $('<p class="load">Text och länk som syns när bilden ovan laddats in</p><a href="../3.4/" alt="">Nästa uppgift(3.4)</a>').insertAfter("img");
    });
    //Trycka på enter inom formuläret utlöser en händelse
    $("form").on("keypress", function(e) {
            if (e.keyCode == 13) { //13 = enter knappen
                e.preventDefault(); //hindrar standardbeteendet
                alert("Du skrev: " + $("#text").val()); //visa innehållet i textfältet
            }
    });

    //kombinerad mouseenter + mouseleave när man rör musen över bilden
    $("#bild").hover(
      function() {
        $('<span id="stars"> ***jQuery hover function***</span>').insertAfter(this);
      }, function() {
        $("#stars").remove();
      }
    );

    //för att visa musens position
    $( document ).on( "mousemove", function( event ) {
      $("#musPos").text("Mus position från vänster: " + event.pageX + "px, Mus position från toppen: " + event.pageY +"px" );
    });

    //formulärets submitknapp ska inte skicka iväg formuläret utan ta bort event från bilden
    $("form").on("submit",function(e){
        e.preventDefault();
        $("#bild").off();
    });