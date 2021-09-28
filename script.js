


var trailLength = 8 // The length of trail (8 by default; put more for longer "tail")
var path = "Untitled_design-removebg-preview.png"

// do NOT modify anything beyond this point
var isIE = false,isNav = false,range = "all.",style = ".style",i,d = 0
var topPix = ".pixelTop",leftPix = ".pixelLeft",images,storage
if (document.layers) { // browser sniffer
	isNav = true,range = "layers.",style = "",topPix = ".top",leftPix = ".left"
} else if (document.all) {
	isIE = true
}
function initTrail() { // prepares the script
	images = new Array() // prepare the image array
	for (i = 0; i < parseInt(trailLength); i++) {
		images[i] = new Image()
		images[i].src = path
	}
	storage = new Array() // prepare the storage for the coordinates
	for (i = 0; i < images.length*3; i++) {
		storage[i] = 0
	}
	for (i = 0; i < images.length; i++) { // make divs for IE and layers for Navigator
		(isIE) ? document.write('<div id="obj' + i + '" style="position: absolute; z-Index: 100; height: 0; width: 0"><img src="' + images[i].src + '"></div>') : document.write('<layer name="obj' + i + '" width="0" height="0" z-index="100"><img src="' + images[i].src + '"></layer>')
	}
	trail()
}
function trail() { // trailing function
	for (i = 0; i < images.length; i++) { // for every div/layer
		eval("document." + range + "obj" + i + style + topPix + "=" + storage[d]) // the Y-coordinate
		eval("document." + range + "obj" + i + style + leftPix + "=" + storage[d+1]) // the X-coordinate
		d = d+2
	}
	for (i = storage.length; i >= 2; i--) { // save the coordinate for the div/layer that's behind
		storage[i] = storage[i-2]
	}
	d = 0 // reset for future use
	var timer = setTimeout("trail()",10) // call recursively
}
function processEvent(e) { // catches and processes the mousemove event
	if (isIE) { // for IE
		storage[0] = window.event.y+document.body.scrollTop+10
		storage[1] = window.event.x+document.body.scrollLeft+10
	} else { // for Navigator
		storage[0] = e.pageY+12
		storage[1] = e.pageX+12
	}
}
if (isNav) {
	document.captureEvents(Event.MOUSEMOVE) // Defines what events to capture for Navigator
}
if (isIE || isNav) { // initiates the script
	initTrail()
	document.onmousemove = processEvent // start capturing
}
