<?php
header("Content-Type: image/jpeg");
//text
$text = sha1(rand(0,999));
//Storlek
$width = 400;
$height = 200;
$picture = ImageCreate($width, $height);

//Random färger men lite mörkare text än bakgrund
$c1 = ImageColorAllocate($picture, rand(100,255), rand(100,255), rand(100,255));
$c2 = ImageColorAllocate($picture, rand(0,50), rand(0,50), rand(0,50));
$c3 = ImageColorAllocate($picture, rand(0,255), rand(0,255), rand(0,255));

//Bakgrund
ImageFill($picture, 0, 0, $c1);
//Textfärg
ImageString($picture, 5, 30, 3, $text, $c2);

//Fyll bilden med lite kludd, vi slumpar ett nummer för att få lite variation på våra linjer och rektanglar
$div = rand(2,10);
ImageRectangle($picture,0,0,$width-$div,$height-$div,$c3);
ImageRectangle($picture,0,0,$width-$div*5,$height-$div*5,$c2);
imageline($picture, 0, $height/$div, $width, $height/$div, $c3);
imageline($picture, $width/$div+1, 0, $width/$div+1, $height, $c3);

ImageJpeg($picture);
ImageDestroy($picture);