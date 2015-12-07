function rotateNeedle(d) {
	var e = document.getElementById('needle');
	var s = "rotate(" + d + "deg)";
    e.style.MozTransform = s;
    e.style.WebkitTransform = s;
    e.style.OTransform = s;
    e.style.transform = s;
}

function animateNeedle() {
	var diff = angleDiff(dir_needle, dir_navigate);
	if(diff > needle_speed)
		dir_needle += needle_speed;
	else if(diff < -needle_speed)
		dir_needle -= needle_speed;
	else
		dir_needle = dir_navigate;
	rotateNeedle(dir_needle);
	document.getElementById('heading').className = (dir_needle < 30 || dir_needle > 360 - 30) ? "headingHot" : "headingCold";
}

function angleDiff(a1, a2) {
	return ((((a2 - a1) % 360) + 540) % 360) - 180;
}

var needle_speed = 360 / 36;
var dir_needle = 0;
var dir_navigate = 0;
var dir_target = 0;
var first_success = false;

function orientationHandler(e) {

    if (e.webkitCompassAccuracy < 0 || e.webkitCompassAccuracy > 30) {
        document.getElementById('warning').innerHTML = "Warning &rsaquo; calibrate compass!";
        return;
    }

    document.getElementById('warning').innerHTML = "Qibla locator";

	if (e.webkitCompassHeading) {
		dir_navigate = (360 - e.webkitCompassHeading + dir_target - window.orientation) % 360;
	}
	else if (e.absolute !== false) {
		dir_navigate = (e.alpha + dir_target) % 360;
	}
    else {
        document.getElementById('warning').innerHTML = "Warning &rsaquo; compass not supported";
        return;
    }

	if (!first_success) {
		first_success = true;
		window.setInterval(animateNeedle, 10);
		document.getElementById('needle').style.opacity = 1;
	}
}

function calibrateHandler() {
	alert("Please calibrate your compass.");
}

function updateCompass() {
	dir_target = parseInt(readCookie("qibla"));
	document.getElementById("heading").innerHTML = dir_target + "&deg; " + readCookie("wind");
}

/* Initialise */

function startUp(){
	updateCompass();
	hideAddressBar();
	locateMe();
	if(window.DeviceOrientationEvent){
		window.addEventListener("deviceorientation", orientationHandler, false);
		window.addEventListener("compassneedcalibration", calibrateHandler, false);
	}
}

window.addEventListener('load', startUp, false);
