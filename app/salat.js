var updateTimes = require("./lib/times").updateTimes;
var checkSettings = require("./lib/settings").checkSettings;
var hideAddressBar = require("./lib/hideAddressBar");
var locateMe = require("./lib/geo").locateMe;
var navigation = require("./lib/navigation");

function refreshMe() {
    locateMe(updateTimes);
};

function startUp(){
	checkSettings();
	updateTimes();
	hideAddressBar();
    refreshMe();
	window.setInterval(refreshMe, 30*1000);
}

window.addEventListener("load", startUp, false);

window.toCompass = navigation.toCompass;
window.toSettings = navigation.toSettings;
window.refreshMe = refreshMe;
