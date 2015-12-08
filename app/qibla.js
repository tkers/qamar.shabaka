var initCompass = require("./lib/compass").initCompass;
var updateCompass = require("./lib/compass").updateCompass;
var hideAddressBar = require("./lib/hideAddressBar");
var locateMe = require("./lib/geo").locateMe;
var navigation = require("./lib/navigation");

function refreshMe() {
    locateMe(updateCompass);
};

function startUp(){
    initCompass();
	updateCompass();
	hideAddressBar();
	refreshMe();
}

window.addEventListener("load", startUp, false);

window.toTimes = navigation.toTimes;
window.toSettings = navigation.toSettings;
window.refreshMe = refreshMe;
