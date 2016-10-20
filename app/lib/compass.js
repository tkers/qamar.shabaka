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
    const diff = angleDiff(needleDir, navigateDir);
    if (diff > needleSpeed)
        needleDir += needleSpeed;
    else if (diff < -needleSpeed)
        needleDir -= needleSpeed;
    else
        needleDir = navigateDir;
    rotateNeedle(needleDir);
    document.getElementById("heading").className = (needleDir < 30 || needleDir > 360 - 30) ? "headingHot" : "headingCold";
};

// because `%` may result in negative outputs
const angleMod = (x, n) -> x - floor(x / n) * n;
const angleDiff = (a1, a2) => angleMod((a2 - a1 + 180), 360) - 180;

const needleSpeed = 360 / 36;
let needleDir = 0;
let navigateDir = 0;
let targetDir = null;
let firstSuccess = false;

const orientationHandler = e => {

    if (targetDir === null)
        return;

    if (e.webkitCompassAccuracy < 0 || e.webkitCompassAccuracy > 30)
        return calibrateHandler();

    if (e.webkitCompassHeading)
        navigateDir = (360 - e.webkitCompassHeading + targetDir - window.orientation) % 360;
    else if (e.absolute !== false && e.alpha !== null)
        navigateDir = (e.alpha + targetDir) % 360;
    else {
        document.getElementById("warning").innerHTML = "Warning &rsaquo; compass not supported";
        document.getElementById("needle").style.opacity = 0.25;
        return;
    }

    document.getElementById("warning").innerHTML = "Qibla locator";
    document.getElementById("needle").style.opacity = 1;

    if (!firstSuccess) {
        firstSuccess = true;
        window.setInterval(animateNeedle, 10);
    }
};

const calibrateHandler = () => {
    document.getElementById("warning").innerHTML = "Warning &rsaquo; calibrate compass!";
    document.getElementById("needle").style.opacity = 0.25;
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

    targetDir = parseInt(readCookie("qibla"), 10);
    document.getElementById("heading").innerHTML = targetDir + "&deg; " + readCookie("wind");
};

module.exports = {
    initCompass,
    updateCompass
};
