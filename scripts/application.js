/* Cookie storage */

function writeCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function clearCookie(name) {
	createCookie(name,"",-1);
}

/* Address Bar hiding */

function hideAddressBar(){
	var ua = navigator.userAgent;
	var and = ~ua.indexOf('Android');
	/*var ios = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod');
	var full = window.navigator.standalone;*/

	if(and){
		document.body.style.height = (window.innerHeight + 56) + 'px';
		setTimeout(function() { window.scrollTo(0, 1); }, 1);
	}
	/*else if(ios && !full){
		document.body.style.height = (document.documentElement.clientHeight + 60) + 'px';
		setTimeout(function() { window.scrollTo(0, 1); }, 1);
	}*/
}

/* Geolocation finding */
function locateMe(){
	if (customLon && customLat) {
		window.alert("Custom Lon/Lat");
		foundMe({
			coords: {
				longitude: customLon,
				latitude: customLat,
				accuracy: 0
			}
		});
	}
	else {
		navigator.geolocation.getCurrentPosition(foundMe);
	}
}

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

	updateApplication();
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

function toTimes(){
	window.location = "/";
}

function updateApplication(){
	if(typeof updateCompass == 'function')
		updateCompass();
	if(typeof updateTimes == 'function')
		updateTimes();
}
