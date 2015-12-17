<!DOCTYPE html>
<html>
<head>
	<title>Yatzy</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8">
	<!-- Javascript libraries/functions-->
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src='js/jquery.confirm.min.js'></script>
	<!-- Yatzy javascript -->
	<script type="text/javascript" src='js/script.js'></script>
	<!-- Latest compiled and minified Bootstrap CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<!-- Yatzy css-->
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
<!-- modal with form for setting playernames-->
<?php include_once("playerform.html");?>
	<!-- visible content -->
	<div class="container-fluid">
		<div class="row">
			<!-- dices -->
			<div id="dices" class="row col-md-2">
				<div id="start" class="alert alert-success  pull-left largefont"><span>0</span>/3</div>
				<div id="diceResult" class="col-md-3 col-sm-3 col-lg-3 col-md-offset-2"></div>
				<!-- templates for dices showing the result uses css to display correct image-->
				<div id="diceTemplate" class="hidden">
					<div href="#" name="d1" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d2" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d3" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d4" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d5" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d6" ><img src="img_trans.gif" alt=""/></div>
				</div>
				<!-- hidden checkboxes to control animation -->
				<div id="wrapper">
					<input id="secondroll" name="roll" type="checkbox"/>
					<input id="roll" name="roll" type="checkbox"/>
					<div id="platform">
						<!-- get 5 animated dices -->
						<?php for($i=0;$i<5;$i++) {require("animation.html");}?>
					</div>
				</div>
			</div>
			<div class="col-md-5 col-lg-5 col-sm-5">
				<h2>Leaderboard</h2>
				<?php require_once("scoreboard.html");?>
			</div>
			<div class="col-md-2 col-lg-2 col-sm-2">
				<h2>Toplist</h2>
				<table id="leaderboard" class="table table-hover table-striped table-bordered">
					<thead>
					<!-- Player names -->
					<tr class="largefont">
						<td class="col-md-2 col-xs-2 col-lg-2"> Score </td>
						<td>Playername</td>
					</tr>

					</thead>
					<!-- Top 10 list -->
					<?php for($i=1;$i<11;$i++){?>
						<tr>
							<td ><?=$i;?></td>
							<td ></td>
						</tr>
					<?php }?>
				</table>
			</div>
			<div class="col-md-3 col-lg-3 col-sm-3 ">
				 <h2>Information</h2>
				<div class="text-info mediumfont">
					<ul>
						<li>Press the spinning dices to throw</li>
						<li>Each player have 3 throws per turn</li>
						<li>The toplist shows the best scores of all time</li>
						<li>A player needs to score atleast 63 points in the top half to get bonus</li>
					</ul>
				</div>
			</div>
	</div>
</body>
</html>