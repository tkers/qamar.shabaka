var Qamar = require("qamar");
var readCookie = require("./cookies").read;
var names_arab = require("./arabicNames");
var names_eng = require("./englishNames");

var latitude, longitude;
var angles, asr, hlc, mid;

function loadConfiguration(){

	latitude = parseFloat(readCookie("latitude"));
	longitude =  parseFloat(readCookie("longitude"));

	var method = parseInt(readCookie("method"));
	if(method == 1) { // Karachi
		angles = Qamar.Methods.Angles.KARACHI;
	}
	else if(method == 2) { // Jafari
        angles = Qamar.Methods.Angles.JAFARI;
	}
	else if(method == 3) { // MWL
        angles = Qamar.Methods.Angles.MWL;
	}
	else if(method == 4) { // ISNA
        angles = Qamar.Methods.Angles.ISNA;
	}
	else if(method == 5) { // Makkah
        angles = Qamar.Methods.Angles.MAKKAH;
	}
	else if(method == 6) { // Egypt
        angles = Qamar.Methods.Angles.EGYPT;
	}

    mid = parseInt(readCookie("midnight")) == 1 ? Qamar.Methods.Midnight.SHIA : Qamar.Methods.Midnight.STANDARD;

	asr = parseInt(readCookie("hanafi")) == 1 ? Qamar.Methods.Asr.HANAFI : Qamar.Methods.Asr.STANDARD;

	var highlats = parseInt(readCookie("highlats"));
    if (highlats == 1) {
        hlc = Qamar.Methods.HighLatitudes.ANGLE_BASED;
    }
    else if (highlats == 2) {
        hlc = Qamar.Methods.HighLatitudes.MIDNIGHT;
    }
    else if (highlats == 3) {
        hlc = Qamar.Methods.HighLatitudes.ONE_SEVENTH;
    }
}

function updateTimes(){
	loadConfiguration();

    var qInfo = Qamar.getInfo({
        angles: angles,
        asr: asr,
        highLatitudes: hlc,
        midnight: mid,
        latitude: latitude,
        longitude: longitude
    });

    var times = qInfo.times;
    var current = qInfo.current[0];
	setSawm(qInfo.sawm);

	var arab = parseInt(readCookie("language")) == 1;

	clearTimes();

    if (arab) {
        for (var i = 7; i >= 0; i--) {
    		if (i != 4 || times[4] != times[5]) {
    			addTime(names_arab[i], times[i], current == i);
    		}
    	}
    }
    else {
        for(var i = 0; i <= 7; i++){
    		if(i != 4 || times[4] != times[5]){
    			addTime(names_eng[i], times[i], current == i);
    		}
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

/* Update interface */

var isSawm;
function setSawm(day){

    // no change
    if (day === isSawm)
        return;

    var sawmimg = document.getElementById("sawmimg");
    var rise = function () {
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

module.exports = {
    updateTimes: updateTimes
};
