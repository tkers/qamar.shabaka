<?php
header('Content-Type: text/html; charset=UTF-8');
?><!DOCTYPE html>

<html manifest="/appcache">

<head>

<title>Qibla</title>

<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/icon/touch-icon-ipad-retina-qibla.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/icon/touch-icon-iphone-retina-qibla.png" />
<link href="/icon/touch-icon-iphone-retina-qibla.png" rel="SHORTCUT ICON">

<link rel="apple-touch-startup-image" sizes="320x460" href="/icon/touch-startup.png" />
<link rel="apple-touch-startup-image" sizes="640x920" href="/icon/touch-startup-retina.png" />

<link href="default.css" rel="stylesheet" type="text/css" media="all">

<script type="text/javascript" src="/script/overthrow-mini.js"></script>
<script type="text/javascript" src="/script/application.js"></script>
<script type="text/javascript" src="/script/compass.js"></script>
<script type="text/javascript" src="/script/settings.js"></script>

</head>

<body ontouchstart="">

<img src="/img/times.png" class="flipright" onclick="window.location='/times'">
<img src="/img/gear.png" class="flipleft" onclick="toSettings()">

<center>

<img src="/img/needle2x.png" id="needle" class="sunmoon" style="opacity: 0.25" onclick="locateMe()">

<div id="navigation">
<span id="heading">&nbsp;</span><br>
<span id="warning">Qibla locator</span>
</div>

</center>

</body>

</html>