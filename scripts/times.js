var maghribindegrees = true;
var ishaindegrees = true;

var fajrangle = 16;
var dhuhroffset = 0;
var hanafi = false;
var maghribangle = 4;
var maghriboffset = 0;
var ishaangle = 15;
var ishaoffet = 0;

var timezone;
var latitude;
var longitude;
var highlats;

var julianDate;

var times = new Array(7);
var names = new Array("Fajr", "Sunrise", "Dhuhr", "Asr", "Sundown", "Maghrib", "Isha");
var current = -1;

function loadConfiguration(){
	var dt = new Date()
	var tz = dt.getTimezoneOffset();
	timezone = -tz/60.0;
	
	latitude = parseFloat(readCookie("latitude"));
	longitude =  parseFloat(readCookie("longitude"));
	
	var method = parseInt(readCookie("method"));
	
	if(method == 1){ // Karachi
		fajrangle = 18;
		dhuhroffset = 0;
		maghribindegrees = false;
		maghriboffset = 0;
		ishaindegrees = true;
		ishaangle = 18;
	}
	else if(method == 2) { // Jafari
		fajrangle = 16;
		dhuhroffset = 0;
		maghribindegrees = true;
		maghribangle = 4;
		ishaindegrees = true;
		ishaangle = 15;
	}
	else if(method == 3) { // MWL
		fajrangle = 18;
		dhuhroffset = 0;
		maghribindegrees = false;
		maghriboffset = 0;
		ishaindegrees = true;
		ishaangle = 17;
	}
	else if(method == 4) { // ISNA
		fajrangle = 15;
		dhuhroffset = 0;
		maghribindegrees = false;
		maghriboffset = 0;
		ishaindegrees = true;
		ishaangle = 15;
	}
	else if(method == 5) { // Makkah
		fajrangle = 19;
		dhuhroffset = 0;
		maghribindegrees = false;
		maghriboffset = 0;
		ishaindegrees = false;
		ishaoffset = 90;
	}
	else if(method == 6) { // Egypt
		fajrangle = 19.5;
		dhuhroffset = 0;
		maghribindegrees = false;
		maghriboffset = 0;
		ishaindegrees = true;
		ishaangle = 17.5;
	}
	
	hanafi = parseInt(readCookie("hanafi")) == 1;
	
	highlats = parseInt(readCookie("highlats"));	
}

function updateTimes(){
	loadConfiguration();
	calculateTimes();
	
	current = getCurrent();
	setSawm(current < 5);
	
	var arab = parseInt(readCookie("language")) == 1;

	clearTimes();
	for(var i = (arab ? 6 : 0); arab ? (i >= 0) : (i < 7); i += (arab ? -1 : 1)){
		if(i != 4 || times[4] != times[5]){
			addTime((arab ? names_arab[i] : names[i]), showTime(times[i]), (current == i));
		}
	}
	
	var scrollme = document.getElementById('scrollme');
	var pointer = document.getElementById('scrollhere');
		
	if(arab){
		scrollme.scrollLeft = pointer.offsetLeft - scrollme.offsetWidth + pointer.offsetWidth;
	}
	else{
		scrollme.scrollLeft = pointer.offsetLeft;		
	}
}

function calculateTimes(){
	julianDate = getJulianDate() - longitude / (15.0 * 24.0);

	// Clear times
	for(var i = 0; i < 7; i++){
		times[i] = 0;
	}
	
	// Calculate times   
    for(var i = 0; i < 3; i++){
        times[0] = computeTime(180 - fajrangle, times[0], true);
        times[1] = computeTime(180 - 0.833, times[1]);
        times[2] = computeMidday(times[2]);	
        times[3] = computeAsr((hanafi ? 2 : 1), times[3]);
        times[4] = computeTime(0.833, times[4]);
        if(maghribindegrees){
        	times[5] = computeTime(maghribangle, times[5]);
        }
        if(ishaindegrees){
        	times[6] = computeTime(ishaangle, times[6]);
        }
    }
   
   
   	// Add offsets
    times[2] += dhuhroffset / 60.0;
    
    if(!maghribindegrees){
    	times[5] = times[4] + maghriboffset / 60.0;
    }
    
    if(!ishaindegrees){
    	times[6] = times[5] + ishaoffset / 60.0;
    }
    
    // Adjust timezone
    for(var i = 0; i < 7; i++){
        times[i] += timezone - longitude/15.0;
    }
    
    // Adjust for high latitudes
    var nighttime = fixHour(times[1] - times[4]);
    
    var fajrDiff = getNightPortion(fajrangle) * nighttime;
    var ishaDiff = getNightPortion(ishaindegrees ? ishaangle : 18.0) * nighttime;
    var maghribDiff = getNightPortion(maghribindegrees ? maghribangle : 4.0) * nighttime;
    
    if(isNaN(times[0]) || fixHour(times[1] - times[0]) > fajrDiff){
        times[0] = times[1] - fajrDiff;
    }
    if(isNaN(times[5]) || fixHour(times[5] - times[4]) > maghribDiff){
        times[5] = times[4] + maghribDiff;
    }
    if(isNaN(times[6]) || fixHour(times[6] - times[4]) > ishaDiff){
        times[6] = times[4] + ishaDiff;
    }
    
    // Wrap to 24h
    for(var i = 0; i < 7; i++){
        times[i] = fixHour(times[i]);
    }
}

function getCurrent(){
	var dt = new Date();
	var currentSecond = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());

    // Round because floats are terrible when fajr = isha
    // Although I assume there are neater solutions for this...
	timeswitch = new Array(7);	
    for(var i = 0; i < 7; i++)
        timeswitch[i] = Math.round(times[i] * 3600);
    
    var min = 86401;
    var m = -1;
    for(var i = 0; i < 7; i++){
        if(timeswitch[i] <= min){
            min = timeswitch[i];
            m = i;
        }
    }

    var j;
    for(var i = 0; i < 7; i++){
        j = (i + m) % 7;
        if(currentSecond < timeswitch[j]){
            return (j + 6) % 7;
        }
    }
    return (m + 6) % 7;
}

/* Calculation functions */

function getJulianDate(){
	var dt = new Date();
	var d = dt.getDate();
	var m = dt.getMonth() + 1;
	var y = dt.getFullYear();
	
	if(m <= 2){
		y -= 1;
		m += 12;
	}
	var a = Math.floor(y / 100);
	var b = 2 - a + Math.floor(a / 4);
	
	var jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1))+ d + b - 1524.5;
	
	return jd;
}

function getSunPosition(t){
    var D = julianDate + t - 2451545.0;    
    
    var g = fixAngle(357.529 + 0.98560028 * D);
    var q = fixAngle(280.459 + 0.98564736 * D);
    var L = fixAngle(q + 1.915 * Math.sin(deg2rad(g)) + 0.020 * Math.sin(deg2rad(2 * g)));

    //var R = 1.00014 - 0.01671 * cos(deg2rad($g)) - 0.00014 * cos(deg2rad(2 * $g));
    
    var e = 23.439 - 0.00000036 * D;
    var d = rad2deg(Math.asin(Math.sin(deg2rad(e))* Math.sin(deg2rad(L))));    
    var RA = fixHour(rad2deg(Math.atan2(Math.cos(deg2rad(e))* Math.sin(deg2rad(L)), Math.cos(deg2rad(L)))) / 15);
    
    var EqT = q/15 - RA;
    
    return new Array(d, EqT);
}

function computeMidday(t){
	var sp = getSunPosition(t/24);
	return fixHour(12 - sp[1]);
}

function computeTime(ang, t){
	var sp = getSunPosition(t/24);
	var v = (1/15) * rad2deg(Math.acos((-Math.sin(deg2rad(ang))- Math.sin(deg2rad(sp[0]))* Math.sin(deg2rad(latitude))) / (Math.cos(deg2rad(sp[0]))* Math.cos(deg2rad(latitude)))));
	return computeMidday(t) + (ang>90 ? -v : v);
}

function computeAsr(t){ // Step = 1 (Standard) or 2 (Hanafi)
	var sp = getSunPosition(t/24);
	var asrangle = -rad2deg(Math.atan(1 / ((hanafi ? 2 : 1) + Math.tan(deg2rad(Math.abs(latitude - sp[0]))))));
	return computeTime(asrangle, t);
}

function getNightPortion(a){
	if(highlats == 1)
		return a / 60; // Angle based
	if(highlats == 2)
		return 1 / 2; //Midnight rule
	if(highlats == 3)
		return 1 / 7; //One-Seventh rule
}

/* Helper functions */

function deg2rad(x){
	return x * Math.PI / 180;
}

function rad2deg(x){
	return x * 180 / Math.PI;
}

function fixAngle(a){
    a = a - 360.0 * Math.floor(a / 360.0);
    a = a < 0 ? a + 360.0 : a;
    return a;
}

function fixHour(a){
    a = a - 24.0 * Math.floor(a / 24.0);
    a = a < 0 ? a + 24.0 : a;
    return a;
}

function showTime(t){
	var t = fixHour(t);
	var h = Math.floor(t);
	var m = Math.floor((t - h) * 60);
	if(m < 10){
		m = '0' + m;
	}
	return h + ':' + m;
}

/* Update interface */

function setSawm(day){
	document.getElementById("sawmimg").src = day ? "/img/sun2x.png" : "/img/moon2x.png";
}

function clearTimes(){
	document.getElementById("timesdata").innerHTML = "";
}

function addTime(name, time, active){
	var data = document.getElementById("timesdata");

	var col = document.createElement("div");
	col.className = "col";
	if(active)
		col.id = "scrollhere";
		
	data.appendChild(col);
	
	var b = document.createElement("b");
	if(active)
		b.className = "highlighted";
	b.innerText = name;
	
	col.appendChild(b);
	
	var br = document.createElement("br");
	
	col.appendChild(br);
	
	var time = document.createTextNode(time);
	
	col.appendChild(time);
	
	if(active){
		var arrow = document.createElement("div");
		arrow.className = "arrow";
		col.appendChild(arrow);	
	}
}

/* Initialise */

function startUp(){
	checkSettings();
	updateTimes();
	hideAddressBar();
	locateMe();
	window.setInterval(updateTimes, 30*1000);
}

window.addEventListener('load', startUp, false);