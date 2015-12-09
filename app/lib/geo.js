var Qamar = require("qamar");
var writeCookie = require("./cookies").write;

function locateMe(cb){

    function foundMe(position){
    	if(position.coords.accuracy > 1000){
    		return;
    	}

    	var lat = Math.round(position.coords.latitude * 100000) / 100000;
    	var lng = Math.round(position.coords.longitude * 100000) / 100000;

    	var qib = Qamar.getQibla({latitude: lat, longitude: lng});

    	writeCookie("latitude", lat, 365);
    	writeCookie("longitude", lng, 365);
    	writeCookie("qibla", qib[0], 365);
    	writeCookie("wind", qib[1], 365);

    	if (cb) cb();
    }

	navigator.geolocation.getCurrentPosition(foundMe);
}

module.exports = {
    locateMe: locateMe
};
