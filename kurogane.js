var tmi = require('tmi.js');
var request = require('request');

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
    channels: ["honchohd"]
  };
  
  var client = new tmi.client(options);
  var canRequest = true;
  var faf = false;
  client.connect();
  
  client.on('chat', function (channel, user, message, self){
      if (self) return;
  
      if (user.mod || user.username == "honchohd") {
          if (message == "!ufb" && canRequest) {
              canRequest = false;
              msg = "To use ultimate frame bot, type !ufb [character] [move]. For more commands type !ufb commands";
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          }
      
          if (message == "!ufb characters" && canRequest) {
              canRequest = false;
              msg = "Available characters: Bowser, Chrom, Daisy, Dark Pit, Fox, Ganondorf, Ike, Incineroar, Inkling, Ken, Meta Knight, Palutena, Peach" +
                    ", Pichu, Piranha Plant, Pit, Richter, Roy, Ryu, Shulk, Simon, Snake, Squirtle and Wolf. More coming soon!";
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          }
      
          if (message == "!ufb moves"&& canRequest) {
              canRequest = false;
              msg = "Available moves: Jab, Dash Attack, Ftilt, Utilt, Dtilt, Fsmash, Usmash, Dsmash, Nair, Fair, Bair, Uair, Dair . More coming soon!";
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          }
          
          if (message == "!ufb commands" && canRequest) {
              canRequest = false;
              msg = "Commands: !ufb characters, !ufb moves, !ufb [character] [move], !ufb [character] [move] faf.";
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          }
      
          if (message.startsWith("!ufb")  && canRequest){
              var query = message.split(" ");
              switch (query[1]) {
                  case "r.o.b":
                          query[1] = "rob";
                          break;
                  case "r.o.b.":
                          query[1] = "rob";
                          break;
                  case "mrgameandwatch":
                          query[1] = "MrGameWatch";
                      break;
                  case "pacman":
                          query[1] = "PAC-MAN";
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
      
              var url = 'https://test-khapi.frannsoft.com/api/characters/name/' + query[1] + '/moves?game=ultimate';
      
              switch (query[2].toLowerCase()) {
                  case "jab":
                      getData(url, query[1], "Jab", faf);
                      break;
                  case "dash":
                      getData(url, query[1], "Dash Attack", faf);
                      break;
                  case "dashattack":
                      getData(url, query[1], "Dash Attack", faf);
                      break;
                  case "ftilt":
                      getData(url, query[1], "Ftilt", faf);
                      break;
                  case "utilt":
                      getData(url, query[1], "Utilt", faf);
                      break;
                  case "dtilt":
                      getData(url, query[1], "Dtilt", faf);
                      break;
                  case "fsmash":
                      getData(url, query[1], "Fsmash", faf);
                      break;
                  case "usmash":
                      getData(url, query[1], "Usmash", faf);
                      break;
                  case "dsmash":
                      getData(url, query[1], "Dsmash", faf);
                      break;
                  case "nair":
                      getData(url, query[1], "Nair", faf);
                      break;
                  case "fair":
                      getData(url, query[1], "Fair", faf);
                      break;
                  case "bair":
                      getData(url, query[1], "Bair", faf);
                      break;
                  case "uair":
                      getData(url, query[1], "Uair", faf);
                      break;
                  case "dair":
                      getData(url, query[1], "Dair", faf);
                      break;        
                  default:
                      break;
              }
          }
      }
  });
  
  function getData(url, char, move, frame){
      request.get({
          url: url,
          json: true,
          headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
          if (err) {
          console.log('Error:', err);
          } else if (res.statusCode === 404) {
              console.log('Status:', res.statusCode);
              var msg = `Kurogane does not have updated stats for ${char}, check back later!`;
              client.action("leffen", msg);
          } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
          } else if (frame){
              canRequest = false;
              faf = false;
              var msg = "";
              data.forEach(element => {
                  if (element.Name.includes(move)) {
                      msg += `The first actionable frame after ${element.Owner}'s ${element.Name} is ${element.FirstActionableFrame}.`;
                  }
              });
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          } else {
              canRequest = false;
              var msg = "";
              data.forEach(element => {
                  if (element.Name.includes(move)) {
                      msg += `${element.Owner}'s ${element.Name} is active frame ${element.HitboxActive}. `;
                  }
              });
              client.action("leffen", msg);
              setTimeout(function(){ canRequest = true }, 3000);
              return;
          }
      });
  }