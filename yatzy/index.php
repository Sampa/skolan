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
	<!-- d6 dice roller -->
	<script type="text/javascript" src='diceroller/d6.js'></script>
	<!-- my own javascript -->
	<script type="text/javascript" src='script.js'></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<!-- scoreboard -->
			<div class="col-sm-3">
				<table class="table table-hover table-striped table-bordered">
					<thead>
						<tr>
							<td> Roll </td>
							<?php
								foreach($players as $player){
									echo "<td>".$player."</td>";
								}
							?>
						</tr>
					</thead>
					<tr>
						<td class="">1</td>
						<?php
							foreach($players as $player){
								echo '<td><div id="1'.$player.'"></div></td>';
							}
						?>
					</tr>
					<tr>
						<td class="">2</td>
						<?php
							foreach($players as $player){
								echo '<td><div id="2'.$player.'"></div></td>';
							}
						?>
					</tr>
					<tr>
						<td class="">3</td>
						<?php
						foreach($players as $player){
							echo '<td><div id="3'.$player.'"></div></td>';
						}
						?>
					</tr>
					<tr>
						<td class="">4</td>
					</tr>
					<tr>
						<td class="">5</td>
					</tr>
					<tr>
						<td class="">6</td>
					</tr>
					<tr>
						<td class="success">...</td>
					</tr>
					<tr>
						<td class="warning">...</td>
					</tr>
					<tr>
						<td class="danger">...</td>
					</tr>
					<tr>
						<td class="info">...</td>
					</tr>
				</table>
			</div>
			<div class="col-sm-1">
				<div id="dices" class="well">
					<script type='text/javascript'>
						D6.setBaseUrl("diceroller/");
						D6.dice(6,"D6.noop",null,true,"none");
						D6AnimBuilder.get("dice").reset();
						D6AnimBuilder.get("dice").start();
					</script>
				</div>
				<button id="roll" class="btn btn-success">Roll</button>
			</div>
		</div>
	</div>
</body>
</html>
<?php
