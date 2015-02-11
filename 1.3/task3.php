<?php
/**
 * Created by PhpStorm.
 * User: Happyjuiced
 * Date: 2015-02-10
 * Time: 17:05
 */
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

//Fyll bilden med lite kludd
ImageRectangle($picture,0,0,$width-1,$height-1,$c3);
ImageRectangle($picture,0,0,$width-30,$height-30,$c2);
imageline($picture, 0, $height/2, $width, $height/2, $c3);
imageline($picture, $width/3, 0, $width/3, $height, $c3);

ImageJpeg($picture);
ImageDestroy($picture);