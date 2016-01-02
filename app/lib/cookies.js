"use strict";

const getExpiry = days => {

    if (!days) return "";

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    return "; expires=" + date.toGMTString();
};

const writeCookie = (name, value, days) => {

    const expires = getExpiry(days);
    document.cookie = name + "=" + value + expires + "; path=/";
};

const readCookie = name => {

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) === " ")
            c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
};

const clearCookie = name => writeCookie(name, "", -1);

module.exports = {
    write: writeCookie,
    read: readCookie,
    clear: clearCookie
};
