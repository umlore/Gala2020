inlets = 1;
outlets = 1;

var lines = [];

function line() {
	var a = arrayfromargs(arguments);
	var instring = a[0] + " " + a[1] + " " + a[2];
	
	lines.push(instring);
	
	if (lines.length > 20) {
		lines.shift();
	}
	
	var outstring = lines[0];
	for (var i = 1; i < lines.length; i++) {
		outstring += "\n" + lines[i];
	}
	
	outlet(0, outstring);
}