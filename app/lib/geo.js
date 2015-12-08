var writeCookie = require("./cookies").write;

function locateMe(cb){

    function foundMe(position){
    	if(position.coords.accuracy > 1000){
    		return;
    	}

    	var lat = Math.round(position.coords.latitude * 100000) / 100000;
    	var lng = Math.round(position.coords.longitude * 100000) / 100000;
    	var qib = locateQibla(lat, lng);
    	var wind = locateWind(qib);

    	writeCookie("latitude", lat, 365);
    	writeCookie("longitude", lng, 365);
    	writeCookie("qibla", qib, 365);
    	writeCookie("wind", wind, 365);

    	if (cb) cb();
    }

	navigator.geolocation.getCurrentPosition(foundMe);
}


function locateQibla(lat, lng){
	var mlat = lat * Math.PI / 180;
	var mlng = lng * Math.PI / 180;
	var qlat = 21.422 * Math.PI / 180;
	var qlng = 39.826 * Math.PI / 180;
	var a = Math.sin(qlng - mlng);
	var b = Math.cos(mlat) * Math.tan(qlat) - Math.sin(mlat) * Math.cos(qlng - mlng);
	var ang = Math.round(Math.atan2(a, b) * 180 / Math.PI) % 360;
	return (ang < 0) ? (360 + ang) : ang;
}

function locateWind(ang){
	var nesw = new Array("N", "NE", "E", "SE", "S", "SW", "W", "NW");
	var n = (Math.floor(ang + 22.5) % 360) / 45;
	return nesw[Math.floor(n)];
}

module.exports = {
    locateMe: locateMe,
    locateQibla: locateQibla,
    locateWind: locateWind
};
