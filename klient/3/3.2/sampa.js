var errorMsg = "Felaktigt format, försök igen!";
function readAnswer(){
    var text = document.getElementById("answer").value; //hämta värdet från vår input
    var regex = new RegExp(/^Min ålder\: ([1-9]+)$/); //mönstret för att se om användaren skrivit korrekt
    var containsText  = text.match(regex); // pröva mönstret mot stringen, annan construct version
    var didMatch = new Boolean(containsText[1]); //exe
    if(didMatch){
        document.getElementById("response").innerHTML = "Din ålder är "+ containsText[1]; //skriver ut "Din ålder är" + åldern
    }else{
        alert(errorMsg); //om man inte skrev korrekt
    }

    var myArray = document.getElementsByName('color');
    var number = new Number(0);
    for (var i = 0, length = myArray.length; i < length; i++) {
        if (myArray[i].checked) {
            number++;
            document.getElementById("response").innerHTML += "<br>"+myArray[i].value;
        }
    }
    var num1 = parseInt(document.getElementById("nums").value);
    var num2 = parseInt(document.getElementById("nums2").value);
    var num3 = Math.floor(Math.random()*10);
    console.log(num3);
    document.getElementById("response").innerHTML += "<br>Du valde "+ number + " färger <br>";
    document.getElementById("response").innerHTML += "<br>Tid: "+ new Date();
    document.getElementById("response").innerHTML += "<br>Num1("+num1+") + Num2("+num2+") = ";
    document.getElementById("response").innerHTML += num1+num2;
    document.getElementById("response").innerHTML += "<br>Nummer 1, Nummer 2, Random. Högst är:" + Math.max(num1,num2,num3) + "<br>";
}