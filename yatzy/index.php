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
<?php include_once("playerform.html");?>
	<!-- visible content -->
	<div class="container-fluid">
		<div class="row">
			<!-- tärningarna-->
			<div id="dices" class="row col-md-2">
				<div id="start" class="alert alert-success  pull-left largefont"><span>0</span>/3</div>
				<div id="diceResult" class="col-md-3 col-sm-3 col-lg-3 col-md-offset-2"></div>
				<div id="diceTemplate" class="hidden">
					<div href="#" name="d1" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d2" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d3" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d4" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d5" ><img src="img_trans.gif" alt=""/></div>
					<div href="#" name="d6" ><img src="img_trans.gif" alt=""/></div>
				</div>
				<div id="wrapper">
					<input id="secondroll" name="roll" type="checkbox"/>
					<input id="roll" name="roll" type="checkbox"/>
					<div id="platform">
						<?php for($i=0;$i<5;$i++) {require("animation.html");}?>
					</div>
				</div>
			</div>
			<div class="col-md-5 col-lg-5 col-sm-5">
				<h2>Leaderboard</h2>
				<?php include_once("scoreboard.php");?>
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
			<div class="col-md-3 col-lg-3 col-sm-3">
				 <h2>Instructions</h2>
			</div>
	</div>
</body>
</html>