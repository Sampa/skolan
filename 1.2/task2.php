<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 16:11
 */
header('Content-type: text/plain');
$values = array(
	"REMOTE_ADDR",
	"REMOTE_PORT",
	"REQUEST_METHOD",
	"REQUEST_URI",
	"HTTP_ACCEPT",
	"HTTP_ACCEPT_ENCODING",
	"HTTP_ACCEPT_LANGUAGE",
	"HTTP_CACHE_CONTROL",
	"HTTP_CONNECTION",
	"HTTP_DNT",
	"HTTP_HOST",
	"HTTP_USER_AGENT",
	"GATEWAY_INTERFACE",
	"DOCUMENT_ROOT",
	"PATH",
	"SCRIPT_FILENAME",
	"SCRIPT_NAME",
	"SERVER_ADDR",
	"SERVER_ADMIN",
	"SERVER_NAME",
	"SERVER_PORT",
	"SERVER_PROTOCOL",
	"SERVER_SOFTWARE",

	"REDIRECT_STATUS",
	"HTTP_COOKIE",
	"HTTP_REFERER",
	"SCRIPT_URI",
	"SCRIPT_URL",
);

foreach($values as $key){
	echo $key . ":". getenv($key)."<br/>";
}
$server = array("PHP_SELF","REQUEST_TIME_FLOAT","REQUEST_TIME","SERVER_SIGNATURE","QUERY_STRING",);
foreach($server as $key){
	echo $key.":".$_SERVER[$key]."<br/>";
}
?>

