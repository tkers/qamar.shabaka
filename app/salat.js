"use strict";

const updateTimes = require("./lib/times").updateTimes;
const checkSettings = require("./lib/settings").checkSettings;
const hideAddressBar = require("./lib/hideAddressBar");
const locateMe = require("./lib/geo").locateMe;
const navigation = require("./lib/navigation");

const refreshMe = () => locateMe(updateTimes);
const startUp = () => {
    checkSettings();
    updateTimes();
    hideAddressBar();
    refreshMe();
    window.setInterval(refreshMe, 30 * 1000);
};

window.addEventListener("load", startUp, false);

window.toCompass = navigation.toCompass;
window.toSettings = navigation.toSettings;
window.refreshMe = refreshMe;
