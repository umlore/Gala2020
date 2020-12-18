autowatch = 1;

inlets = 1;
outlets = 1;

//var count = 0;

var checksums = new Array();
var latesttime = 0;

function includes(l, val) {
	var inc = false;
	for (var j = 0; j < l.length; j++) {
		if (l[j] == val) {
			inc = true;
			break;
		}
	}
	return inc;	
}

function body() {
	var msgs = JSON.parse(arguments[0]);
	
	//post("GOT HERE " + count + "\n");
	//count = count + 1;
	
	for (var i = 0; i < msgs.length; i++) {
		//post(JSON.stringify(msgs[i], null, 4) + "\n");
		//post(JSON.stringify(msgs[i]) + "\n");
		var timestamp = msgs[i].timestamp;
		var username = msgs[i].username;
		var command = msgs[i].command;
		var checksum = msgs[i].UUID;
		var linestring = msgs[i].linestring;
		
		//post(username + " " + command + " " + timestamp + "\n");
		
		//if this is an earlier message, we've already processed it.
		if (timestamp < latesttime) { continue; }
			
		if (timestamp == latesttime) {
			if (includes(checksums, checksum)) { continue; }
			
			checksums.push(checksum);
			outlet(0, command, timestamp, username, command);
		} else {
			checksums = [checksum];
			latesttime = timestamp;
			
			outlet(0, command, timestamp, username, command);
		}
	}
}