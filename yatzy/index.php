<!DOCTYPE html>
<html>
<head>
	<title>Yatzy</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8">
	<!-- Javascript -->
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src='js/script.js'></script>
	<script type="text/javascript" src='js/jquery.confirm.min.js'></script>
	<!-- Latest compiled and minified Bootstrap CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<!-- tärningarna-->
			<div class="col-md-4" style="border: 1px solid red;" >
				<div id="diceResult" style="">
					<button id="start" style="" class="btn btn-success">Roll! <span>0</span>/3</button>
					<span id="dices"></span>
				</div>
				<div id="diceTemplate" style="display:none;">
					<a href="#" name="d1" class="diceresult"><img src="img_trans.gif" /></a>
					<a href="#" name="d2" class="diceresult"><img src="img_trans.gif" /></a>
					<a href="#" name="d3" class="diceresult"><img src="img_trans.gif" /></a>
					<a href="#" name="d4" class="diceresult"><img src="img_trans.gif" /></a>
					<a href="#" name="d5" class="diceresult"><img src="img_trans.gif" /></a>
					<a href="#" name="d6" class="diceresult"><img src="img_trans.gif" /></a>
				</div>
				<div id="wrapper">
					<input id="secondroll" name="roll" type="checkbox"/>
					<input id="roll" name="roll" type="checkbox"/>
					<div id="platform">
						<?php for($i=0;$i<5;$i++) {require("animation.html");}?>
					</div>
				</div>
			</div>
			<div class="col-md-6" style="border: 1px solid red;">
				<?php include_once("scoreboard.php");?>
			</div>
		</div>
	</div>
</body>
</html>