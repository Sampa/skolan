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
	<script type="text/javascript" src='js/functions.js'></script>
	<script type="text/javascript" src='js/events.js'></script>
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
		<div class="row toprow">
			<!-- dices -->
			<div id="dices" class="col-md-4 col-lg-3 col-sm-4">
				<!-- Counter for throws per turn -->
				<div id="start" class="col-md-2 col-lg-2 col-sm-2 alert alert-success largefont"><span>0</span>/3</div>
<!--			<div id="start" class="col-md-11 col-lg-11 col-sm-11 alert alert-success largefont"><span>0</span>/3</div>-->
               <!-- templates for dices showing the result uses css to display correct image-->
                <div id="diceTemplate" class="hidden col-md-9 col-lg-9 col-sm-9 ">
                    <div href="#" name="d1" ><img src="img_trans.gif" alt=""/></div>
                    <div href="#" name="d2" ><img src="img_trans.gif" alt=""/></div>
                    <div href="#" name="d3" ><img src="img_trans.gif" alt=""/></div>
                    <div href="#" name="d4" ><img src="img_trans.gif" alt=""/></div>
                    <div href="#" name="d5" ><img src="img_trans.gif" alt=""/></div>
                    <div href="#" name="d6" ><img src="img_trans.gif" alt=""/></div>
                </div>
                <!-- Target div for the result from each throw-->
                <div id="diceResult" class="col-md-9 col-lg-9 col-sm-9"></div>
			</div>
            <!-- hidden checkboxes to control animation -->
            <input id="secondroll" name="roll" type="checkbox">
            <input id="roll" name="roll" type="checkbox">
            <div id="wrapper" class="col-md-3 col-lg-3 col-sm-4">
                <!-- get 5 animated dices -->
                    <?php for($i=0;$i<5;$i++) {require("animation.html");}?>
            </div>
        </div>
		<div class="row">
			<div class="col-md-7 col-lg-7 col-sm-7">
<!--				<h2>Leaderboard</h2>
-->				<?php require_once("scoreboard.html");?>
			</div>
			<div class="col-md-4 col-lg-4 col-sm-4 ">
				<a class="" data-toggle="collapse" href="#collapseInfo" aria-expanded="false" aria-controls="collapseInfo">
					<h2>Information <span class="caret"></span></h2>
				</a>
				<div id="collapseInfo">
					<button id="enterNamesButton" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">
						Enter player names
					</button>
					<ul class="text-info mediumfont">
						<li>Press the spinning dices to throw</li>
						<li>Each player have 3 throws per turn</li>
						<li>The toplist shows the best scores of all time</li>
						<li>A player needs to score atleast 63 points in the top half to get bonus</li>
					</ul>
				</div>
				<a data-toggle="collapse" href="#collapseToplist" aria-expanded="false" aria-controls="collapseToplist">
					<h2>Toplist <span class="caret"></span></h2>
				</a>
				<div id="collapseToplist">
					<!-- Top 10 list -->
<!--					--><?php //include_once("toplist.html");?>
				</div>
			</div>
			<?php include_once("endview.html");?>
		</div>
</body>
</html>