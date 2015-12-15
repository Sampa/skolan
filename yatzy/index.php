<?php
session_start();
//$_SESSION['players']  = array("Adam","Martin");
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
	<div id="modal" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Choose player names</h4>
				</div>
				<div class="modal-body" style="min-height: 200px;">
					<form id="playerNames" name="playerNames">
						<div class="form-group col-md-8" >
							<label for="player" class="control-label">Player 1</label>

							<input type="text" class="form-control" name="player1"/>
						</div>
						<div class="form-group col-md-8">
							<label for="player2" class="control-label">Player 2</label>
							<input type="text" class="form-control" name="player2"/>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="setPlayerNames" class="btn btn-primary">I'm ready!</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!-- visible content -->
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