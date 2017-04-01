<?php
header("Charset: UTF-8");
/* inbox detaljer från formuläret */
$hostname = $_POST['address'];
$username = $_POST['user'];
$password = $_POST['password'];
$port = $_POST['port'];

/* porten måste vara del av hostname
* Så vi tar först reda på vart vi hittar första snedsträcket i hostname
 * hostname exempel från formuläret: {imap.gmail.com/imap/ssl}INBOX*/
$pos = strpos($hostname,"/");
/* lägg sen in ett kolon (:) och portnumret före snedsträcket */
$hostname = substr_replace($hostname, ":".$port, $pos, 0);

/* nu har vi: $hostname = '{imap.gmail.com:993/imap/ssl}INBOX';*/
/* försök anslut */
$inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());
/* hämta emails från gårdagen och framåt */
$yesterday = strtotime('-1 day', strtotime('00:00:01'));
$emails = imap_search($inbox,'ALL SINCE "'.date("d M Y",$yesterday).'"');
/* om vi hittar några mail gå igenom alla */
if($emails) {
    /* nyast först */
    rsort($emails);
    /* Hämta vål html fil */
    $doc = new DOMDocument();
    /*Se till att error reporting är på så att vi ignorera fel pga html5 taggar*/
    libxml_use_internal_errors(true);
    $doc->loadHTMLFile("index.html");
    $ib = $doc->getElementById("inbox");
    $tl = $doc->getElementsByTagName("div")[0]; //vår template
    $ib->removeChild($tl); //vi behöver inte ha en tom template i vårt domtree
    $tz = new DateTimeZone('Europe/Stockholm');
    /* loopa alla hittade emails */
    foreach($emails as $email_number) {
        /* hämta information om mailet */
        $overview = imap_fetch_overview($inbox,$email_number,0);
        $message = imap_fetchbody($inbox,$email_number,1);
        /* rensa errors skapade pga html5 taggar i vårt html dokument */
        libxml_clear_errors();
        /* skapa klon av vår template */
        $node = $tl->cloneNode(true);
        /* Vår html template
          <div id="template">
            <!-- Item 0 (tomrummet)-->
            <div class="toggler" > //item 1
                <span class="subject"></span> //item 1 -> child 1
                <span class="from"></span>//item 1 -> child 3
                <span class="date"></span> //item 1 -> child 5
            </div>
            <!-- Item 2 -->
            <div class="body"></div> //item 3
        </div>
        */
        /* Lägg till alla element med informationen om mailet */
        $node->childNodes->item(1)->childNodes->item(1)->nodeValue = $overview[0]->subject;
        $ib->appendChild($node);
        $node->childNodes->item(1)->childNodes->item(3)->nodeValue = $overview[0]->from;
        $ib->appendChild($node);
        /*Se till att datumet visas i korrekt format*/
        $date = new DateTime($overview[0]->date);
        $date->setTimezone($tz);
        $node->childNodes->item(1)->childNodes->item(5)->nodeValue = $date->format('l j F Y H:i');
        $ib->appendChild($node);
        $node->childNodes->item(3)->nodeValue = $message;
        $ib->appendChild($node);
    }
    /* Skriv ut vår html sida */
    echo $doc->saveHTML();
}else{
    echo "Inga email hittades";
}
/* stäng anslutningen */
imap_close($inbox);
?>
