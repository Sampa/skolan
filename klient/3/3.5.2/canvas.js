var can1 = document.getElementById("can1");
var c = can1.getContext("2d");
var can2 = document.getElementById("can2");
var c2 = can2.getContext("2d");
/*Canvas 1*/
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
//en cirkel
c2.beginPath();
c2.arc(95,50,20,0,2*Math.PI);
c2.fillStyle = '#8ED6FF';
c2.fill();
c2.stroke();
//gradient
var g=c2.createLinearGradient(0,0,250,0);
g.addColorStop(0,"black");
g.addColorStop(1,"red");
// rektangel
c2.beginPath();
c2.fillStyle = g;
c2.fillRect(150,30,100,50);
c2.stroke();