"use strict";

const Qamar = require("qamar");
const readCookie = require("./cookies").read;
const arabicNames = require("./arabicNames");
const englishNames = require("./englishNames");

let latitude, longitude;
let angles, asr, highLatitudes, midnight, arab;

const methodToAngle = x => {

    const angleEnums = {
        1: Qamar.Methods.Angles.KARACHI,
        2: Qamar.Methods.Angles.JAFARI,
        3: Qamar.Methods.Angles.MWL,
        4: Qamar.Methods.Angles.ISNA,
        5: Qamar.Methods.Angles.MAKKAH,
        6: Qamar.Methods.Angles.EGYPT
    };

    return angleEnums[x];
};

const methodToHighLats = x => {

    const highLatEnums = {
        1: Qamar.Methods.HighLatitudes.ANGLE_BASED,
        2: Qamar.Methods.HighLatitudes.MIDNIGHT,
        3: Qamar.Methods.HighLatitudes.ONE_SEVENTH
    };

    return highLatEnums[x];
};

const loadConfiguration = () => {

    latitude = parseFloat(readCookie("latitude"));
    longitude =  parseFloat(readCookie("longitude"));

    const method = parseInt(readCookie("method"), 10);
    angles = methodToAngle(method);

    midnight = parseInt(readCookie("midnight"), 10) === 1 ? Qamar.Methods.Midnight.SHIA : Qamar.Methods.Midnight.STANDARD;
    asr = parseInt(readCookie("hanafi"), 10) === 1 ? Qamar.Methods.Asr.HANAFI : Qamar.Methods.Asr.STANDARD;

    const highlats = parseInt(readCookie("highlats"), 10);
    highLatitudes = methodToHighLats(highlats);

    arab = parseInt(readCookie("language"), 10) === 1;
};

const updateTimes = () => {
    loadConfiguration();

    const qInfo = Qamar.getInfo({ angles, asr, highLatitudes, midnight, latitude, longitude });

    const times = qInfo.times;
    const current = qInfo.current[0];

    clearTimes();
    displayTimes(times, current);
    scrollTimes();

    setSawm(qInfo.sawm);
};

/* Update interface */

let isSawm;
const setSawm = day => {

    // no change
    if (day === isSawm)
        return;

    const sawmimg = document.getElementById("sawmimg");
    const rise = () => {
        sawmimg.src = isSawm ? "/imgs/sun2x.png" : "/imgs/moon2x.png";
        sawmimg.classList.remove("down");
    };

    // first rise
    if (typeof isSawm === "undefined")
        setTimeout(rise, 100);

    // update state
    isSawm = day;

    // already animating
    if (sawmimg.classList.contains("down"))
        return;

    // start animation
    sawmimg.classList.add("down");
    setTimeout(rise, 1100);
};

const clearTimes = () => {
    document.getElementById("timesdata").innerHTML = "";
};

const displayTimes = (times, current) => {

    if (arab) {
        for (let i = 7; i >= 0; i--) {
            if (i !== 4 || times[4] !== times[5])
                addTime(arabicNames[i], times[i], current === i);
        }
    }
    else {
        for (let i = 0; i <= 7; i++) {
            if (i !== 4 || times[4] !== times[5])
                addTime(englishNames[i], times[i], current === i);
        }
    }
};

const addTime = (label, time, active) => {
    const data = document.getElementById("timesdata");

    const col = document.createElement("div");
    col.className = "col";
    if (active) col.id = "scrollhere";

    data.appendChild(col);

    const b = document.createElement("b");
    if (active) b.className = "highlighted";
    b.textContent = label;

    col.appendChild(b);

    const br = document.createElement("br");

    col.appendChild(br);

    const timeLabel = document.createTextNode(time);

    col.appendChild(timeLabel);

    if (active) {
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        col.appendChild(arrow);
    }
};

const scrollTimes = () => {
    const scrollme = document.getElementById("scrollme");
    const pointer = document.getElementById("scrollhere");

    if (arab)
        scrollme.scrollLeft = pointer.offsetLeft - scrollme.offsetWidth + pointer.offsetWidth;
    else
        scrollme.scrollLeft = pointer.offsetLeft;
};

module.exports = { updateTimes };
