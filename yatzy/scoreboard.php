<?php
    $players = array("Adam");
?>
<!-- scoreboard -->
<table class="table table-hover table-striped table-bordered">
    <thead>
        <tr>
            <td class="col-md-2 col-xs-2 col-lg-2"> Yatzy </td>
            <?php
            foreach($players as $player){
                echo '<td class="col-md-3 col-xs-3 col-lg-3">'.$player."</td>";
            }
            ?>
        </tr>
    </thead>
<?php for($i=1;$i<7;$i++){?>
        <tr>
            <td ><?=$i;?></td>
            <?php
            foreach($players as $player){
                echo '<td  id="top'.$i.$player.'" name="'.$i.'"><div id="'.$i.$player.'"></div></td>';
            }
            ?>
        </tr>
<?php }?>
    <tr>
        <td>Total</td>
        <?php
        foreach($players as $player){
            echo '<td id="total'.$player.'"><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>
    <tr>
        <td>Bonus</td>
        <?php
        foreach($players as $player){
            echo '<td name="bonus"><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>
<!-- One Pair -->
    <tr>
        <td>One Pair</td>
        <?php
        foreach($players as $player){
            echo '<td name="pair"><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>
    <!-- Two Pairs -->
    <tr>
        <td>Two Pairs</td>
        <?php
        foreach($players as $player){
            echo '<td name="twopairs" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>

    <!--Three of a kind -->
    <tr>
        <td>Three of a kind</td>
        <?php
        foreach($players as $player){
            echo '<td name="toak" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>
    <!-- Four of a kind -->
    <tr>
        <td>Four of a kind</td>
        <?php
        foreach($players as $player){
            echo '<td name="foak" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>
    <!-- Small Straight -->
    <tr>
        <td>Small straight</td>
        <?php
        foreach($players as $player){
            echo '<td name="little" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>

    <!-- Large Straight -->
    <tr>
        <td>Large Straight</td>
        <?php
        foreach($players as $player){
            echo '<td name="big" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>

    <!-- Full House -->
    <tr>
        <td>Full House</td>
        <?php
        foreach($players as $player){
            echo '<td name="house" ><div id="'.$player.'"></div></td>';
        }
        ?>
    </tr>

    <!-- Chance  -->
    <tr>
        <td>Chance</td>
        <?php
        foreach($players as $player){
            echo '<td name="chance"><div  id="'.$player.'"></div></td>';
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
    <!-- Endscore -->
    <tr>
        <td>Result</td>
        <?php
        foreach($players as $player){
            echo '<td><div id="result'.$player.'"></div></td>';
        }
        ?>
    </tr>
</table>