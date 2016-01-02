"use strict";

const readCookie = require("./cookies").read;

const rotateNeedle = d => {
    const e = document.getElementById("needle");
    const s = "rotate(" + d + "deg)";
    e.style.MozTransform = s;
    e.style.WebkitTransform = s;
    e.style.OTransform = s;
    e.style.transform = s;
};

const animateNeedle = () => {
    const diff = angleDiff(dir_needle, dir_navigate);
    if (diff > needle_speed)
        dir_needle += needle_speed;
    else if (diff < -needle_speed)
        dir_needle -= needle_speed;
    else
        dir_needle = dir_navigate;
    rotateNeedle(dir_needle);
    document.getElementById("heading").className = (dir_needle < 30 || dir_needle > 360 - 30) ? "headingHot" : "headingCold";
};

const angleDiff = (a1, a2) => ((((a2 - a1) % 360) + 540) % 360) - 180;

const needle_speed = 360 / 36;
let dir_needle = 0;
let dir_navigate = 0;
let dir_target = null;
let first_success = false;

const orientationHandler = e => {

    if (dir_target === null)
        return;

    if (e.webkitCompassAccuracy < 0 || e.webkitCompassAccuracy > 30) {
        document.getElementById("warning").innerHTML = "Warning &rsaquo; calibrate compass!";
        document.getElementById("needle").style.opacity = 0.25;
        return;
    }

    if (e.webkitCompassHeading)
        dir_navigate = (360 - e.webkitCompassHeading + dir_target - window.orientation) % 360;
    else if (e.absolute !== false && e.alpha !== null)
        dir_navigate = (e.alpha + dir_target) % 360;
    else {
        document.getElementById("warning").innerHTML = "Warning &rsaquo; compass not supported";
        return;
    }

    document.getElementById("warning").innerHTML = "Qibla locator";
    document.getElementById("needle").style.opacity = 1;

    if (!first_success) {
        first_success = true;
        window.setInterval(animateNeedle, 10);
    }
};

const calibrateHandler = () => {
    alert("Please calibrate your compass.");
};

const initCompass = () => {
    if (!window.DeviceOrientationEvent)
        return;

    window.addEventListener("deviceorientation", orientationHandler, false);
    window.addEventListener("compassneedcalibration", calibrateHandler, false);
};

const updateCompass = () => {

    if (readCookie("qibla") === null)
        return;

    dir_target = parseInt(readCookie("qibla"));
    document.getElementById("heading").innerHTML = dir_target + "&deg; " + readCookie("wind");
};

module.exports = {
    initCompass,
    updateCompass
};
