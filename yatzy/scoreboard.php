    <!-- scoreboard -->
<table id="scoreboard" class="table table-hover table-striped table-bordered">
    <thead>
    <!-- Player names -->
        <tr class="largefont">
            <td class="col-md-2 col-xs-2 col-lg-2" style="width: 200px;"> Yatzy </td>
        </tr>
    </thead>
    <!-- Top part 1-6 -->
    <?php for($i=1;$i<7;$i++){?>
        <tr>
            <td ><?=$i;?></td>
        </tr>
    <?php }?>
    <!-- Top total -->
    <tr class="bg-info mediumfont">
        <td class="bg-info">Top total</td>
    </tr>
    <!-- Bonus -->
    <tr>
        <td>Bonus</td>
    </tr>
    <!-- One Pair -->
    <tr>
        <td>One Pair</td>
    </tr>
    <!-- Two Pairs -->
    <tr>
        <td>Two Pairs</td>
    </tr>
    <!--Three of a kind -->
    <tr>
        <td>Three of a kind</td>
    </tr>
    <!-- Four of a kind -->
    <tr>
        <td>Four of a kind</td>
    </tr>
    <!-- Small Straight -->
    <tr>
        <td>Small straight</td>
    </tr>
    <!-- Large Straight -->
    <tr>
        <td>Large Straight</td>
    </tr>
    <!-- Full House -->
    <tr>
        <td>Full House</td>
    </tr>
    <!-- Chance  -->
    <tr>
        <td>Chance</td>
    </tr>
    <!-- Yatzy  -->
    <tr>
        <td>Yatzy</td>
    </tr>
    <!-- Endscore -->
    <tr class="mediumfont">
        <td class="bg-info">End score</td>
    </tr>
</table>