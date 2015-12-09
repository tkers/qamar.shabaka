var readCookie = require("./cookies").read;

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
var dir_target = null;
var first_success = false;

function orientationHandler(e) {

    if (dir_target == null)
        return;

    if (e.webkitCompassAccuracy < 0 || e.webkitCompassAccuracy > 30) {
        document.getElementById('warning').innerHTML = "Warning &rsaquo; calibrate compass!";
        document.getElementById('needle').style.opacity = 0.25;
        return;
    }

	if (e.webkitCompassHeading) {
		dir_navigate = (360 - e.webkitCompassHeading + dir_target - window.orientation) % 360;
	}
	else if (e.absolute !== false && e.alpha !== null) {
		dir_navigate = (e.alpha + dir_target) % 360;
	}
    else {
        document.getElementById('warning').innerHTML = "Warning &rsaquo; compass not supported";
        return;
    }

    document.getElementById('warning').innerHTML = "Qibla locator";
    document.getElementById('needle').style.opacity = 1;

	if (!first_success) {
		first_success = true;
		window.setInterval(animateNeedle, 10);
	}
}

function calibrateHandler() {
	alert("Please calibrate your compass.");
}

function initCompass() {
    if(!window.DeviceOrientationEvent)
        return;
    window.addEventListener("deviceorientation", orientationHandler, false);
    window.addEventListener("compassneedcalibration", calibrateHandler, false);
}

function updateCompass() {
    if (readCookie("qibla") == null) return;
	dir_target = parseInt(readCookie("qibla"));
	document.getElementById("heading").innerHTML = dir_target + "&deg; " + readCookie("wind");
}

module.exports = {
    initCompass: initCompass,
    updateCompass: updateCompass
};
