// Declare variables
var fs = require('fs');
var tmi = require('tmi.js');

var obj;
var channel = ["leffen", "EEvisu"];

// Read the file and send to the callback
fs.readFile('characters.min.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
}

// TMI options fill in your bot
var options = {
  options: {
      debug: true
  },
  connection: {
      port: 443,
      reconnect: true
  },
  identity: {
      username: "UltimateFrameBot",
      password: "oauth:keffz3tyzvrnawfy9oenvv6y5lf94c"
  },
  channels: [channel]
};

var client = new tmi.client(options);
var canRequest = true;
var faf = false;

client.connect().then(function(){
    client.action(channel, "Never fear, all of your frame needs will be answered now UltimateFrameBot is here!");
});

client.on('chat', function (channel, user, message, self){

    if (self) return;

    if ((user.mod || user.username == "honchohd")) {
        if (message == "!ufb") {
            canRequest = false;
            msg = "UltimateFrameBot is a bot created by HonchoHD to deliver frame data. To use UltimateFrameBot, type !ufb [character] [move]. For more commands type !ufb commands";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
    
        if (message == "!ufb moves") {
            canRequest = false;
            msg = "Available moves: Jab, DashAttack, Ftilt, Utilt, Dtilt, Fsmash, Usmash, Dsmash, Nair, Fair, Bair, Uair, Dair, Grab, Fthrow, Bthrow, Dthrow, Uthrow, NeutralB, SideB, UpB, DownB.";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
        
        if (message == "!ufb commands") {
            canRequest = false;
            msg = "Commands: !ufb moves, !ufb [character] [move], !ufb [character] [move] faf.";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
    
        if (message.startsWith("!ufb")){
            var query = message.split(" ");
            switch (query[1]) {
                case "yink":
                        query[1] = "younglink";
                        break;
                case "icies":
                        query[1] = "iceclimbers";
                        break;
                case "r.o.b":
                        query[1] = "rob";
                        break;
                case "r.o.b.":
                        query[1] = "rob";
                        break;
            }
    
            if (query.length == 4) {
                if (query[3] == "faf") {
                    faf = true;
                }
                else{
                    faf = false;
                }
            }
    
            switch (query[2].toLowerCase()) {
                case "jab":
                    getData(query[1], "Jab", faf);
                    break;
                case "dash":
                    getData(query[1], "Dash Attack", faf);
                    break;
                case "dashattack":
                    getData(query[1], "Dash Attack", faf);
                    break;
                case "ftilt":
                    getData(query[1], "F-Tilt", faf);
                    break;
                case "utilt":
                    getData(query[1], "U-Tilt", faf);
                    break;
                case "dtilt":
                    getData(query[1], "D-Tilt", faf);
                    break;
                case "fsmash":
                    getData(query[1], "F-Smash", faf);
                    break;
                case "usmash":
                    getData(query[1], "U-Smash", faf);
                    break;
                case "dsmash":
                    getData(query[1], "D-Smash", faf);
                    break;
                case "nair":
                    landing = true;
                    getData(query[1], "N-Air", faf);
                    break;
                case "fair":
                    landing = true;
                    getData(query[1], "F-Air", faf);
                    break;
                case "bair":
                    landing = true;
                    getData(query[1], "B-Air", faf);
                    break;
                case "uair":
                    landing = true;
                    getData(query[1], "U-Air", faf);
                    break;
                case "dair":
                    landing = true;
                    getData(query[1], "D-Air", faf);
                    break;
                case "grab":
                    getData(query[1], "Grab", faf);
                    break;
                case "fthrow":
                    getData(query[1], "Forward Throw", faf);
                    break;
                case "bthrow":
                    getData(query[1], "Back Throw", faf);
                    break;
                case "uthrow":
                    getData(query[1], "Up Throw", faf);
                    break;
                case "dthrow":
                    getData(query[1], "Down Throw", faf);
                    break;
                case "neutralb":
                    landing = true;
                    getData(query[1], "Neutral-B", faf);
                    break;
                case "sideb":
                    landing = true;
                    getData(query[1], "Side-B", faf);
                    break;
                case "upb":
                    landing = true;
                    getData(query[1], "Up-B", faf);
                    break;
                case "downb":
                    getData(query[1], "Down-B", faf);
                    break;
                default:
                    break;
            }
        }
    } else if (user.subscriber && canRequest) {
        if (message == "!ufb") {
            canRequest = false;
            msg = "UltimateFrameBot is a bot created by HonchoHD to deliver frame data. To use UltimateFrameBot, type !ufb [character] [move]. For more commands type !ufb commands";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
    
        if (message == "!ufb moves") {
            canRequest = false;
            msg = "Available moves: Jab, DashAttack, Ftilt, Utilt, Dtilt, Fsmash, Usmash, Dsmash, Nair, Fair, Bair, Uair, Dair, Grab, Fthrow, Bthrow, Dthrow, Uthrow.";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
        
        if (message == "!ufb commands") {
            canRequest = false;
            msg = "Commands: !ufb moves, !ufb [character] [move], !ufb [character] [move] faf.";
            client.action(channel, msg);
            setTimeout(function(){ canRequest = true }, 20000);
            return;
        }
    
        if (message.startsWith("!ufb")){
            var query = message.split(" ");
            switch (query[1]) {
                case "yink":
                        query[1] = "younglink";
                        break;
                case "icies":
                        query[1] = "iceclimbers";
                        break;
                case "r.o.b":
                        query[1] = "rob";
                        break;
                case "r.o.b.":
                        query[1] = "rob";
                        break;
            }
    
            if (query.length == 4) {
                if (query[3] == "faf") {
                    faf = true;
                }
                else{
                    faf = false;
                }
            }
    
            switch (query[2].toLowerCase()) {
                case "jab":
                    getData(query[1], "Jab", faf);
                    break;
                case "dash":
                    getData(query[1], "Dash Attack", faf);
                    break;
                case "dashattack":
                    getData(query[1], "Dash Attack", faf);
                    break;
                case "ftilt":
                    getData(query[1], "F-Tilt", faf);
                    break;
                case "utilt":
                    getData(query[1], "U-Tilt", faf);
                    break;
                case "dtilt":
                    getData(query[1], "D-Tilt", faf);
                    break;
                case "fsmash":
                    getData(query[1], "F-Smash", faf);
                    break;
                case "usmash":
                    getData(query[1], "U-Smash", faf);
                    break;
                case "dsmash":
                    getData(query[1], "D-Smash", faf);
                    break;
                case "nair":
                    landing = true;
                    getData(query[1], "N-Air", faf);
                    break;
                case "fair":
                    landing = true;
                    getData(query[1], "F-Air", faf);
                    break;
                case "bair":
                    landing = true;
                    getData(query[1], "B-Air", faf);
                    break;
                case "uair":
                    landing = true;
                    getData(query[1], "U-Air", faf);
                    break;
                case "dair":
                    landing = true;
                    getData(query[1], "D-Air", faf);
                    break;
                case "grab":
                    getData(query[1], "Grab", faf);
                    break;
                case "fthrow":
                    getData(query[1], "Forward Throw", faf);
                    break;
                case "bthrow":
                    getData(query[1], "Back Throw", faf);
                    break;
                case "uthrow":
                    getData(query[1], "Up Throw", faf);
                    break;
                case "dthrow":
                    getData(query[1], "Down Throw", faf);
                    break;
                case "neutralb":
                    landing = true;
                    getData(query[1], "Neutral-B", faf);
                    break;
                case "sideb":
                    landing = true;
                    getData(query[1], "Side-B", faf);
                    break;
                case "upb":
                    landing = true;
                    getData(query[1], "Up-B", faf);
                    break;
                case "downb":
                    getData(query[1], "Down-B", faf);
                    break;
                default:
                    break;
            }
        }
    }
});

function getData(char, move, frame, adv){

    // * Local checking - FAST *
    data = obj[char];

    if (frame) {
        faf = false;
        var msg = "";
        for (var element in data) {
            if (element.includes(move)) {
                msg += `The first actionable frame after ${data[element].owner}'s ${data[element].move} is ${data[element].totalFrames}. `;
            }
        }
        client.action(channel, msg);
        setTimeout(function(){ canRequest = true }, 20000);
        return;
    } else if (adv) {
        advantage = false;
        var msg = "";
        for (var element in data) {
            if (element.includes(move)) {
                msg += `${data[element].owner}'s ${data[element].move} has ${data[element].advantage} ${data[element].totalFrames}. `;
            }
        }
        client.action(channel, msg);
        setTimeout(function(){ canRequest = true }, 20000);
        return;
    }else {
        var msg = "";
        for (var element in data) {
            if (element.includes(move) && ("landingLag" in data[element])) {
                msg += `${data[element].owner}'s ${data[element].move} is active frame ${data[element].startup} and has ${data[element].landingLag} frames of landing lag. `;
            } else if (element.includes(move) && !("landingLag" in data[element])){
                msg += `${data[element].owner}'s ${data[element].move} is active frame ${data[element].startup}. `;
            } 
        }
        client.action(channel, msg);
        setTimeout(function(){ canRequest = true }, 20000);
        return;
    } 
    // else {
    //     var msg = "";
    //     for (var element in data) {
    //         if (element.includes(move)) {
    //             msg += `${data[element].owner}'s ${data[element].move} is active frame ${data[element].startup}. `;
    //         }
    //     }
    //     client.action(channel, msg);
    //     setTimeout(function(){ canRequest = true }, 3000);
    //     return;
    // }

    // * External checking - SLOW *
    // gsjson({
    //     spreadsheetId: '1dHAsaG4uob8nEOH1jDQ5lsDOtqdqBkd3XTW-lvucTGw',
    //     worksheet: char,
    //     hash: 'move'
    // }).then(function(result){
    //     if (frame) {
    //         faf = false;
    //         var msg = "";
    //         for (var element in result) {
    //             if (element.includes(move)) {
    //                 msg += `The first actionable frame after ${result[element].owner}'s ${result[element].move} is ${result[element].totalFrames}. `;
    //             }
    //         }
    //         client.action("honchohd", msg);
    //         setTimeout(function(){ canRequest = true }, 3000);
    //         return;
    //     }else if(lag){
    //         landing = false;
    //         var msg = "";
    //         for (var element in result) {
    //             if (element.includes(move)) {
    //                 msg += `${result[element].owner}'s ${result[element].move} is active frame ${result[element].startup} and has ${result[element].landingLag} frames of landing lag. `;
    //             }
    //         }
    //         client.action("honchohd", msg);
    //         setTimeout(function(){ canRequest = true }, 3000);
    //         return;
    //     } else{
    //         var msg = "";
    //         for (var element in result) {
    //             if (element.includes(move)) {
    //                 msg += `${result[element].owner}'s ${result[element].move} is active frame ${result[element].startup}. `;
    //             }
    //         }
    //         client.action("honchohd", msg);
    //         setTimeout(function(){ canRequest = true }, 3000);
    //         return;
    //     }
    // });
}