function setMethod(n){
	writeCookie("method", n, 365);
	document.getElementById("config_method").style.display = "none";
	document.getElementById("config_hanafi").style.display = "block";
}

function setHanafi(n){
	writeCookie("hanafi", n, 365);
	document.getElementById("config_hanafi").style.display = "none";
	document.getElementById("config_highlats").style.display = "block";
}

function setHighlats(n){
	writeCookie("highlats", n, 365);
	document.getElementById("config_highlats").style.display = "none";
	document.getElementById("config_language").style.display = "block";
}

function setLanguage(n){
	writeCookie("language", n, 365);
	window.location = "/times";
}

function checkSettings(){
	if(readCookie("method") == null || readCookie("hanafi") == null || readCookie("highlats") == null){
		toSettings();
	}
}

function toSettings(){
	window.location = "/settings";
}