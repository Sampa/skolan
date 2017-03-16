/* Använder jQuery UI för att skapa tabs */
$( function() {
    $("#flikar").tabs({width:300});
    $(document).tooltip();
} );

/* Vår kod för content slider */
$(window).on("load",function() {
	var theImage = $("ul li img:not(.arrow)");
	var theWidth = theImage.width()
	//wrap into mother div
	//assign height width and overflow hidden to mother
	$('#wrapper').css({
		width: function() {
		return theWidth;
	  },
		height: function() {
		return theImage.height()+50;
	  },
		position: 'relative',
		overflow: 'hidden'
	});
		//get total of image sizes and set as width for ul
	var totalWidth = theImage.length * theWidth;
	$('ul').css({
		width: function(){
		return totalWidth;
	}
	});
	/*
        Flyttar (animerar) listan åt vänster eller höger när man klickar
        på vänster eller höger pil. Koden loopar igenom varje bild i arrayen
        theImage och för varje bild kollar den varje länk's class och animerar
        åt rätt håll genom att ta bildens position gånger bredden som marginal.
        för sista bilden finns en länk som återställer hela slidern.
        På första bilden finns en länk som går till sista
    */

$(theImage).each(
    function(intIndex){
    console.log(theImage.length);
        $(this).prevAll('a').on("click", function(){
      		if($(this).is(".next"))	{
      			$(this).parent('li').parent('ul').animate({
      				"margin-left": (-(intIndex + 1) * theWidth)
      					}, 1000)
      			} else if($(this).is(".prev")){
      			$(this).parent('li').parent('ul').animate({
      				"margin-left": (-(intIndex - 1) * theWidth)
      			}, 1000)
      			} else if($(this).is(".first")){
                    $(this).parent('li').parent('ul').animate({"margin-left":(0)}, 1000);
      	        }
      	        else if($(this).is(".last")){
                    $(this).parent('li').parent('ul').animate({"margin-left":(-(theImage.length-1) * theWidth)}, 1000);
                }
    	});//.bind()
    });//.each()

});



