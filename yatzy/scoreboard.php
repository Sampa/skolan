    <!-- scoreboard -->
<table class="table table-hover table-striped table-bordered">
    <thead>
    <!-- Player names -->
        <tr class="largefont">
            <td class="col-md-1 col-xs-1 col-lg-1"> Yatzy </td>
            <?php foreach($players as $player){ echo '<td id="player'.$player.'" class="playername col-md-1 col-xs-1 col-lg-1">'.$player."</td>";}?>
        </tr>
    </thead>
    <!-- Top part 1-6 -->
    <?php for($i=1;$i<7;$i++){?>
        <tr>
            <td ><?=$i;?></td>
            <?php foreach($players as $player){ echo '<td  id="top'.$i.$player.'" name="'.$i.$player.'"></td>';}?>
        </tr>
    <?php }?>
    <!-- Top total -->
    <tr class="bg-info mediumfont">
        <td class="bg-info">Top total</td>
        <?php foreach($players as $player){ echo '<td id="total'.$player.'" class="bg-info">0</td>';}?>
    </tr>
    <!-- Bonus -->
    <tr>
        <td>Bonus</td>
        <?php foreach($players as $player){ echo '<td id="bonus'.$player.'">0</td>';}?>
    </tr>
    <!-- One Pair -->
    <tr>
        <td>One Pair</td>
        <?php foreach($players as $player){ echo '<td id="bottompair'.$player.'" name="pair"></td>';}?>
    </tr>
    <!-- Two Pairs -->
    <tr>
        <td>Two Pairs</td>
        <?php foreach($players as $player){ echo '<td id="bottomtwopairs'.$player.'" name="twopairs" ></td>';}?>
    </tr>
    <!--Three of a kind -->
    <tr>
        <td>Three of a kind</td>
        <?php foreach($players as $player){ echo '<td id="bottomtoak'.$player.'" name="toak" ></td>';}?>
    </tr>
    <!-- Four of a kind -->
    <tr>
        <td>Four of a kind</td>
        <?php foreach($players as $player){ echo '<td id="bottomfoak'.$player.'" name="foak" ></td>';}?>
    </tr>
    <!-- Small Straight -->
    <tr>
        <td>Small straight</td>
        <?php foreach($players as $player){ echo '<td id="bottomlittle'.$player.'" name="little" ></td>';}?>
    </tr>
    <!-- Large Straight -->
    <tr>
        <td>Large Straight</td>
        <?php foreach($players as $player){ echo '<td id="bottombig'.$player.'" name="big" ></td>';}?>
    </tr>
    <!-- Full House -->
    <tr>
        <td>Full House</td>
        <?php foreach($players as $player){ echo '<td id="bottomhouse'.$player.'" name="house" ></td>';}?>
    </tr>
    <!-- Chance  -->
    <tr>
        <td>Chance</td>
        <?php foreach($players as $player){ echo '<td id="bottomchance'.$player.'" name="chance"></td>';}?>
    </tr>
    <!-- Yatzy  -->
    <tr>
        <td>Yatzy</td>
        <?php foreach($players as $player){ echo '<td id="bottomyatzy'.$player.'" ></td>';}?>
    </tr>
    <!-- Endscore -->
    <tr class="mediumfont">
        <td class="bg-info">Result</td>
        <?php foreach($players as $player){ echo '<td id="result'.$player.'" class="bg-info"></td>'; }?>
    </tr>
</table>