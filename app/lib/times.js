"use strict";

const Qamar = require("qamar");
const readCookie = require("./cookies").read;
const names_arab = require("./arabicNames");
const names_eng = require("./englishNames");

let latitude, longitude;
let angles, asr, hlc, mid;

const loadConfiguration = () => {

    latitude = parseFloat(readCookie("latitude"));
    longitude =  parseFloat(readCookie("longitude"));

    const method = parseInt(readCookie("method"));

    if (method === 1) // Karachi
        angles = Qamar.Methods.Angles.KARACHI;
    else if (method === 2) // Jafari
        angles = Qamar.Methods.Angles.JAFARI;
    else if (method === 3) // MWL
        angles = Qamar.Methods.Angles.MWL;
    else if (method === 4) // ISNA
        angles = Qamar.Methods.Angles.ISNA;
    else if (method === 5) // Makkah
        angles = Qamar.Methods.Angles.MAKKAH;
    else if (method === 6) // Egypt
        angles = Qamar.Methods.Angles.EGYPT;

    mid = parseInt(readCookie("midnight")) === 1 ? Qamar.Methods.Midnight.SHIA : Qamar.Methods.Midnight.STANDARD;
    asr = parseInt(readCookie("hanafi")) === 1 ? Qamar.Methods.Asr.HANAFI : Qamar.Methods.Asr.STANDARD;

    const highlats = parseInt(readCookie("highlats"));

    if (highlats === 1)
        hlc = Qamar.Methods.HighLatitudes.ANGLE_BASED;
    else if (highlats === 2)
        hlc = Qamar.Methods.HighLatitudes.MIDNIGHT;
    else if (highlats === 3)
        hlc = Qamar.Methods.HighLatitudes.ONE_SEVENTH;
};

const updateTimes = () => {
    loadConfiguration();

    const qInfo = Qamar.getInfo({
        angles: angles,
        asr: asr,
        highLatitudes: hlc,
        midnight: mid,
        latitude: latitude,
        longitude: longitude
    });

    const times = qInfo.times;
    const current = qInfo.current[0];
    setSawm(qInfo.sawm);

    const arab = parseInt(readCookie("language")) === 1;

    clearTimes();

    if (arab) {
        for (let i = 7; i >= 0; i--) {
            if (i !== 4 || times[4] !== times[5]) {
                addTime(names_arab[i], times[i], current === i);
            }
        }
    }
    else {
        for (let i = 0; i <= 7; i++) {
            if (i !== 4 || times[4] !== times[5]) {
                addTime(names_eng[i], times[i], current === i);
            }
        }
    }

    const scrollme = document.getElementById("scrollme");
    const pointer = document.getElementById("scrollhere");

    if (arab)
        scrollme.scrollLeft = pointer.offsetLeft - scrollme.offsetWidth + pointer.offsetWidth;
    else
        scrollme.scrollLeft = pointer.offsetLeft;
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

const addTime = (name, time, active) => {
    const data = document.getElementById("timesdata");

    const col = document.createElement("div");
    col.className = "col";
    if (active) col.id = "scrollhere";

    data.appendChild(col);

    const b = document.createElement("b");
    if (active) b.className = "highlighted";
    b.textContent = name;

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

module.exports = { updateTimes };
