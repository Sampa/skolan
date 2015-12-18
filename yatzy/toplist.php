<table id="leaderboard" class="table table-hover table-striped table-bordered">
    <thead>
    <!-- Player names -->
    <tr class="largefont">
        <td>#</td>
        <td>Player</td>
        <td class="col-md-2 col-xs-2 col-lg-2"> Score </td>
        <td>Date</td>
    </tr>
<?php
    include_once("db.php");
    $conn = connectDb();
    $result = mysqli_query($conn,"SELECT * FROM yatzy ORDER BY score DESC LIMIT 10");
    $i = 1;
    foreach($result as $row){
        echo "<tr>";
        echo "<td>".$i."</td>";
        echo "<td>".$row['player']."</td>";
        echo "<td>".$row['score']."</td>";
        echo "<td>".$row['date']."</td>";
        echo "</tr>";
        $i++;
    }
?>
    </thead>
</table>
