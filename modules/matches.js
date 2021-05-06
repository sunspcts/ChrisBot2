const matches = require("../matches.json") 
exports.checkmatches = (message) => {
  var i;
  for (i = 0; i < matches.exactmatches.length; i++) {
    if (message.content == matches.exactmatches[i]) {
        message.channel.send(matches.exactmatchesresponses[i]);
        return;
  	}
  }  
  for (i = 0; i < matches.othermatches.length; i++) {
    if (message.content.includes(matches.othermatches[i])) {
        message.channel.send(matches.othermatchesresponses[i]);
        return;
  	}
	}
}
 