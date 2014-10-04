<?php
header('Content-Type: text/html; charset=UTF-8');
?><!DOCTYPE html>

<html manifest="/appcache">

<head>

<title>Qamar</title>

<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/icon/touch-icon-ipad-retina.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/icon/touch-icon-iphone-retina.png" />
<link href="/icon/touch-icon-iphone-retina.png" rel="SHORTCUT ICON">

<link rel="apple-touch-startup-image" sizes="320x460" href="/icon/touch-startup.png" />
<link rel="apple-touch-startup-image" sizes="640x920" href="/icon/touch-startup-retina.png" />

<link href="default.css" rel="stylesheet" type="text/css" media="all">

<script type="text/javascript">
var customLat = "<?php echo isset($_GET['lat']) ? htmlentities($_GET['lat']) : ''; ?>";
var customLon = "<?php echo isset($_GET['lon']) ? htmlentities($_GET['lon']) : ''; ?>";
</script>

<script type="text/javascript" src="/script/overthrow-mini.js"></script>
<script type="text/javascript" src="/script/application.js"></script>
<script type="text/javascript" src="/script/times.js"></script>
<script type="text/javascript" src="/script/names_arab.php"></script>
<script type="text/javascript" src="/script/settings.js"></script>

</head>

<body ontouchstart="">

<img src="/img/compass.png" class="flipright" onclick="window.location='/qibla'">
<img src="/img/gear.png" class="flipleft" onclick="toSettings()">

<center>

<img src="/img/sun2x.png" class="sunmoon" id="sawmimg" onclick="locateMe()">

<div id="scrollme" class="overthrow">
<div class="secondborder" id="timesdata">

</div>
</div>

</center>

</body>

</html>