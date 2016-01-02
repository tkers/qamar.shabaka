"use strict";

const Qamar = require("qamar");
const writeCookie = require("./cookies").write;

const locateMe = cb => {

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

        if (cb) cb();
    };

    navigator.geolocation.getCurrentPosition(foundMe);
};

module.exports = {
    locateMe
};
