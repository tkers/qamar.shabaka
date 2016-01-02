"use strict";

const hideAddressBar = () => {
    const ua = navigator.userAgent;
    const and = ~ua.indexOf("Android");
    /*const ios = ~ua.indexOf("iPhone") || ~ua.indexOf("iPod");
    const full = window.navigator.standalone;*/

    if (and) {
        document.body.style.height = (window.innerHeight + 56) + "px";
        setTimeout(() => window.scrollTo(0, 1), 1);
    }
    /*else if (ios && !full) {
        document.body.style.height = (document.documentElement.clientHeight + 60) + "px";
        setTimeout(() => window.scrollTo(0, 1), 1);
    }*/
};

module.exports = hideAddressBar;
