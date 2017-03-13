/*Canvas 1*/
var can1 = document.getElementById("can1");
var c = can1.getContext("2d");
//rita lite raka och en diagonal linje
c.moveTo(0,0);
c.lineTo(0,100);
c.lineTo(200,0);//diagonal
c.arcTo(250,0,150,100,50); // Create an arc
c.lineTo(200,100);
c.stroke();
//rita en båge
c.beginPath();
c.arc(95,50,40,0,2);
c.stroke();
//böjd åt andra hållet
c.beginPath();
c.arc(75,50,40,40,-20);
c.stroke();
//Bezier kurva
c.beginPath();
c.moveTo(10,50);
c.bezierCurveTo(400,100,100,150,250,0);
c.stroke();

/* Canvas 2 */
var can2 = document.getElementById("can2");
var c2 = can2.getContext("2d");
//gradient
var g=c2.createLinearGradient(0,0,250,0);
g.addColorStop(0,"black");
g.addColorStop(1,"red");
// rektangel
c2.beginPath();
c2.fillStyle = g;
c2.fillRect(150,30,100,50);
c2.stroke();
//en cirkel
c2.beginPath();
c2.arc(95,50,20,0,2*Math.PI);
c2.shadowBlur=50;//skugga
c2.shadowColor="yellow";
c2.globalAlpha =0.5;//transparens
c2.fillStyle = '#8ED6FF';
c2.fill();
c2.stroke();

/*Canvas 3*/
var can3 = document.getElementById("can3");
var c3 = can3.getContext("2d");
//en bild
var image = new Image();
image.src = "pattern.png";//src
image.onload = drawP;
/*funktion som körs när bilden laddats in,
 ritar bilden och repeterar den till ett mönster
*/
function drawP() {
    c3.fillStyle = c3.createPattern(image, "repeat");
    c3.fillRect(0, 0, 250, 100);
}
c3.stroke();

/*Canvas 4*/
var can4 = document.getElementById("can4");
var c4 = can4.getContext("2d");
//lite text (datum +tid)
var d = new Date();
var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes();
c4.font = "30px Verdana";
c4.strokeText(datestring,10,50);


// skapar datasträng från bilden
var dataURL1 = can1.toDataURL();
// sätter attributen för nerladdningslänken
document.getElementById('canvasImg1').href = dataURL1;
document.getElementById('canvasImg1').download = "canvas1.jpg";

// skapar datasträng från bilden
var dataURL2 = can2.toDataURL();
//// sätter attributen för nerladdningslänken
document.getElementById('canvasImg2').href = dataURL2;
//document.getElementById('canvasImg2').download = "canvas2.png";

// skapar datasträng från bilden
var dataURL3 = can3.toDataURL();
// sätter attributen för nerladdningslänken
document.getElementById('canvasImg3').href = dataURL3;
//document.getElementById('canvasImg3').download = "canvas3.png";

// skapar datasträng från bilden
var dataURL4 = can4.toDataURL();
// sätter attributen för nerladdningslänken
document.getElementById('canvasImg4').href = dataURL4;
//document.getElementById('canvasImg4').download = "canvas4.png";