<?php
session_start();
$_SESSION['players']  = array("Adam","Martin");
$players = $_SESSION['players'];
?>
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
<!-- Modal for usernames -->
	<div class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Choose your player name</h4>
				</div>
				<div class="modal-body">
					<label for="name">Playername</label>
					<input type="text" title="name" value="My name..."/>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary">I'm ready!</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<div class="container-fluid">
		<div class="row">
			<!-- tärningarna-->
			<div id="dices" class="row col-md-2">
				<button id="start" class="pull-left btn-lg btn-success">Roll <span>0</span>/3</button>
				<div id="diceResult" class="col-md-3 col-sm-3 col-lg-3 col-md-offset-1">
				</div>
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
			<div class="col-md-4" style="border: 0px solid red;">
				<?php include_once("scoreboard.php");?>
			</div>
		</div>
	</div>
</body>
</html>