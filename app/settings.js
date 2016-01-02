"use strict";

const readCookie = require("./lib/cookies").read;
const settings = require("./lib/settings");

window.readCookie = readCookie;
window.setMethod = settings.setMethod;
window.setHanafi = settings.setHanafi;
window.setMidnight = settings.setMidnight;
window.setHighlats = settings.setHighlats;
window.setLanguage = settings.setLanguage;
