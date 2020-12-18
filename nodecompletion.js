autowatch = 1;

inlets = 5;
outlets = 2;



var pollinterval = 1;  //ms
var targets = [];	//ms by node index
var completepers = []; 

var activeroom = -1;
var targetroom = -10;

function msg_int(v) {
	if (inlet == 2) {
		pollinterval = v;
	} else if (inlet == 3) {
		activeroom = v;
	} else if (inlet == 4) {
		targetroom = v;
	}
}

function list() {
	var list = arrayfromargs(arguments);
	
	//inlet 0: increase completepers by specified amount 
	if (inlet == 0) {
		
		if (activeroom != targetroom) {
			return;
		}
		
		for (i = 0; i < Math.min(targets.length, list.length); i++) {
			if (list[i] !== 0) {
				completepers[i] += pollinterval / targets[i];
			}
		}
		
		outlet(0, completepers);
		
		
		//if all the values are > 1, bang the last outlet
		var allcomplete = true;
		
		if (targets.length == 0) {
			allcomplete = false;
		}
		
		for (i = 0; i < completepers.length; i++) {
			if (completepers[i] < 1) {
				allcomplete = false;
				break;
			}
		}
		
		if (allcomplete) {
			outlet(1, "bang");
		}
		
	} else if (inlet == 1) {
		targets = arrayfromargs(arguments);
		
		completepers = Array(targets.length);
		for (i = 0; i < targets.length; i++) {
			completepers[i] = 0;
		}
	}
}