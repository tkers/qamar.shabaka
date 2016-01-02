"use strict";

const navigation = require("./navigation");
const writeCookie = require("./cookies").write;
const readCookie = require("./cookies").read;

const setMethod = x => {
    writeCookie("method", x, 365);
    document.getElementById("config_method").style.display = "none";
    document.getElementById("config_hanafi").style.display = "block";
};

const setHanafi = x => {
    writeCookie("hanafi", x, 365);
    document.getElementById("config_hanafi").style.display = "none";
    document.getElementById("config_midnight").style.display = "block";
};

const setMidnight = x => {
    writeCookie("midnight", x, 365);
    document.getElementById("config_midnight").style.display = "none";
    document.getElementById("config_highlats").style.display = "block";
};

const setHighlats = x => {
    writeCookie("highlats", x, 365);
    document.getElementById("config_highlats").style.display = "none";
    document.getElementById("config_language").style.display = "block";
};

const setLanguage = x => {
    writeCookie("language", x, 365);
    navigation.toTimes();
};

const checkSettings = () => {
    if (readCookie("method") === null || readCookie("hanafi") === null || readCookie("midnight") === null || readCookie("highlats") === null) {
        navigation.toSettings();
    }
};

module.exports = {
    checkSettings,
    setMethod,
    setHanafi,
    setMidnight,
    setHighlats,
    setLanguage
};
