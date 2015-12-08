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

module.exports = hideAddressBar;
