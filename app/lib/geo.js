"use strict";

const Qamar = require("qamar");
const writeCookie = require("./cookies").write;

const locateMe = callback => {

    const foundMe = position => {

        if (position.coords.accuracy > 1000)
            return;

        const latitude = Math.round(position.coords.latitude * 100000) / 100000;
        const longitude = Math.round(position.coords.longitude * 100000) / 100000;

        const qib = Qamar.getQibla({ latitude, longitude });

        writeCookie("latitude", latitude, 365);
        writeCookie("longitude", longitude, 365);
        writeCookie("qibla", qib[0], 365);
        writeCookie("wind", qib[1], 365);

        callback();
    };

    const errorMe = err => alert(err.message);

    const opts = {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 60000
    };

    navigator.geolocation.getCurrentPosition(foundMe, errorMe, opts);
};

module.exports = { locateMe };
