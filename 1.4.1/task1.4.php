<?php
	echo date("Y-m-d H:i:s"). "<br/> Du laddas snart om:";
?>
<script>
	setTimeout(function(){
		window.location.reload();
	}, 1000);
</script>