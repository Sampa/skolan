<?php
	$players = array("Adam","Erik");
?>

<!DOCTYPE html>
<html>
<head>
	<title>Yatzy</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<!-- Optional theme -->
<!--	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">-->

	<!-- Javascript -->

	<!--bootstrap-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
	<!-- d6 dice roller -->
	<script type="text/javascript" src='diceroller/d6.js'></script>
	<!-- my own javascript -->
	<script type="text/javascript" src='script.js'></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<!-- tärningarna-->
			<div id="dices" class="col-sm-1 col-xs-1 well" style="min-width: 70px;">
				<script type='text/javascript'>
					D6.setBaseUrl("diceroller/");
					D6.dice(6,"D6.noop",null,true,"none");
					D6AnimBuilder.get("dice").reset();
					D6AnimBuilder.get("dice").start();
				</script>
				<button id="roll" class="btn btn-success">Roll</button>
			</div>
			<!-- scoreboard -->
			<div class="col-sm-3 col-xs-9">
				<table class="table table-hover table-striped table-bordered">
					<thead>
						<tr>
							<td> Yatzy </td>
							<?php
								foreach($players as $player){
									echo "<td>".$player."</td>";
								}
							?>
						</tr>
					</thead>
					<?php for($i=1;$i<7;$i++){?>
					<tr>
						<td class=""><?=$i;?></td>
						<?php
							foreach($players as $player){
								echo '<td><div id="'.$i.$player.'"></div></td>';
							}
						?>
					</tr>
					<?php }?>
					<!-- One Pair -->
					<tr>
						<td>One Pair</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>
					<!-- Two Pairs -->
					<tr>
						<td>Two Pairs</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>

					<!--Three of a kind -->
					<tr>
						<td>Three of a kind</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>
					<!-- Four of a kind -->
					<tr>
						<td>Four of a kind</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>
					<!-- Small Straight -->
					<tr>
						<td>Small straight</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>

					<!-- Large Straight -->
					<tr>
						<td>Large Straight</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>

					<!-- Full House -->
					<tr>
						<td>Full House</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>

					<!-- Chance  -->
					<tr>
						<td>Chance</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>

					<!-- Yatzy  -->
					<tr>
						<td>Yatzy</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="'.$player.'"></div></td>';
						}
						?>
					</tr>
				</table>
			</div>

		</div>
	</div>
</body>
</html>