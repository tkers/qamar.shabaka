"use strict";

const initCompass = require("./lib/compass").initCompass;
const updateCompass = require("./lib/compass").updateCompass;
const hideAddressBar = require("./lib/hideAddressBar");
const locateMe = require("./lib/geo").locateMe;
const navigation = require("./lib/navigation");

const refreshMe = () => locateMe(updateCompass);
const startUp = () => {
    initCompass();
    updateCompass();
    hideAddressBar();
    refreshMe();
};

window.addEventListener("load", startUp, false);

window.toTimes = navigation.toTimes;
window.toSettings = navigation.toSettings;
window.refreshMe = refreshMe;
