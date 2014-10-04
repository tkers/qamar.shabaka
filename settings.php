<?php
header('Content-Type: text/html; charset=UTF-8');
?><!DOCTYPE html>

<html>

<head>

<title>Qamar</title>

<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/icon/touch-icon-ipad-retina.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/icon/touch-icon-iphone-retina.png" />
<link href="/icon/touch-icon-iphone-retina.png" rel="SHORTCUT ICON">

<link href="default.css" rel="stylesheet" type="text/css" media="all">

<script type="text/javascript" src="script/application.js"></script>
<script type="text/javascript" src="script/settings.js"></script>

</head>

<body class="bodyhome">

<div id="config_method">
<div class="row fat">
<i>Calculation method</i>
</div>

<div class="row" style="background-color: rgba(234, 79, 51, 1)">
<a href="javascript: setMethod(1);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 1 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Karachi
</a>
</div>

<div class="row" style="background-color: rgba(223, 76, 56, 1)">
<a href="javascript: setMethod(2);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 2 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Jafari
</a>
</div>

<div class="row" style="background-color: rgba(212, 72, 61, 1)">
<a href="javascript: setMethod(3);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 3 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> MWL
</a>
</div>

<div class="row" style="background-color: rgba(200, 69, 67, 1)">
<a href="javascript: setMethod(4);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 4 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> ISNA
</a>
</div>

<div class="row" style="background-color: rgba(189, 65, 72, 1)">
<a href="javascript: setMethod(5);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 5 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Makkah
</a>
</div>

<div class="row" style="background-color: rgba(178, 62, 77, 1)">
<a href="javascript: setMethod(6);">
<script type="text/javascript">document.write(parseInt(readCookie("method")) == 6 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Egypt
</a>
</div>
</div>

<div id="config_hanafi" style="display:none">
<div class="row fat">
<i>Asr calculation</i>
</div>

<div class="row" style="background-color: rgba(234, 79, 51, 1)">
<a href="javascript: setHanafi(0);">
<script type="text/javascript">document.write(parseInt(readCookie("hanafi")) == 0 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Standard
</a>
</div>

<div class="row" style="background-color: rgba(178, 62, 77, 1)">
<a href="javascript: setHanafi(1);">
<script type="text/javascript">document.write(parseInt(readCookie("hanafi")) == 1 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Hanafi
</a>
</div>
</div>

<div id="config_highlats" style="display:none">
<div class="row fat">
<i>High latitude corrections</i>
</div>

<div class="row" style="background-color: rgba(234, 79, 51, 1)">
<a href="javascript: setHighlats(1);">
<script type="text/javascript">document.write(parseInt(readCookie("highlats")) == 1 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Angle based
</a>
</div>

<div class="row" style="background-color: rgba(212, 72, 61, 1)">
<a href="javascript: setHighlats(2);">
<script type="text/javascript">document.write(parseInt(readCookie("highlats")) == 2 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Midnight rule
</a></div>

<div class="row" style="background-color: rgba(178, 62, 77, 1)">
<a href="javascript: setHighlats(3);">
<script type="text/javascript">document.write(parseInt(readCookie("highlats")) == 3 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> One-seventh rule
</a>
</div>
</div>

<div id="config_language" style="display:none">
<div class="row fat">
<i>Prayer names</i>
</div>

<div class="row" style="background-color: rgba(234, 79, 51, 1)">
<a href="javascript: setLanguage(0);">
<script type="text/javascript">document.write(parseInt(readCookie("language")) == 0 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> English
</a>
</div>

<div class="row" style="background-color: rgba(178, 62, 77, 1)">
<a href="javascript: setLanguage(1);">
<script type="text/javascript">document.write(parseInt(readCookie("language")) == 1 ? '<img src="/img/yes.png">' : '<div class="noimg"></div>');</script> Arabic
</a>
</div>
</div>

</body>

</html>