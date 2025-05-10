// made by SpliZz
const fetch = require('node-fetch');
const fs = require('fs');
 const configfile = "./uuidconfig.json";
  if (!fs.existsSync(configfile)) {
    fs.writeFileSync(configfile, JSON.stringify([], null, 2));
    if (config.logs) {
      console.log("uuidconfig.json was created.");
    }
  }
const config = './uuidconfig.json'

module.exports = function(bot) {
  const whitelistFile = "./whitelist.json";
  if (!fs.existsSync(whitelistFile)) {
    fs.writeFileSync(whitelistFile, JSON.stringify([], null, 2));
    if (config.logs) {
      console.log("whitelist.json was created.");
    }
  }
 

  async function whitelist(action, username) {
    if (!bot) {
      console.error("\x1b[31mBot is not initialized.\x1b[0m");
      return;
    }

    let uuid;
    let uuids = [];


    //add
    if (action === "add" && username) {
      const player = bot.players[username];
      if (!player) {
        if (config.logs) {
          console.log(`This player is currently offline. Offline-adding...`);
        }
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if (res.ok) {
          const data = await res.json();
          uuid = data.id;
          if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }
          uuids.push(uuid);
          fs.writeFileSync(whitelistFile, JSON.stringify(uuids, null, 2));
          if (config.logs) {
            console.log(`Successfully added player ${username} with the UUID ${uuid}. Total whitelisted: ${uuids.length}.`);
          }
        } else {
          if  (config.logs) {
            console.log(`Player ${username} not found. You either entered a wrong username or the player is cracked`);
          }
        }
      }
if (player) {
      const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player.username}`);
      if (!res.ok) {
        console.error("Error fetching UUID");
        return;
      }

      const data = await res.json();
      uuid = data.id;

      if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }

      if (!uuids.includes(uuid)) {
        uuids.push(uuid);
        fs.writeFileSync(whitelistFile, JSON.stringify(uuids, null, 2));
        if (config.logs) {
          console.log(`Successfully added player ${data.name} with the UUID ${uuid}. Total whitelisted: ${uuids.length}.`);
        }
      }
    }
  }


  //remove
    else if (action === "remove" && username) {
      const player = bot.players[username];
      if (!player) {
        
        if (config.logs) {
          console.log(`This player is currently offline. Offline-removing...`);
        }
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
         if (res.ok) {
          const data = await res.json();
          uuid = data.id;
          if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }

      if (uuids.includes(uuid)) {
        const index = uuids.indexOf(uuid);
        if (index > -1) {
          uuids.splice(index, 1);
          fs.writeFileSync(whitelistFile, JSON.stringify(uuids, null, 2));
          if (config.logs) {
            console.log(`Successfully removed player ${data.name} with the UUID ${uuid}. Total whitelisted: ${uuids.length}.`);
          }
        }}
      } else {
          if  (config.logs) {
            console.log(`Player ${username} not found. You either entered a wrong username or the player is cracked`);
          }
        }
    }
if (player) {
      const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player.username}`);
      if (!res.ok) {
        console.error("Error fetching UUID");
        return;
      }

      const data = await res.json();
      uuid = data.id;

      if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }

      if (uuids.includes(uuid)) {
        const index = uuids.indexOf(uuid);
        if (index > -1) {
          uuids.splice(index, 1);
          fs.writeFileSync(whitelistFile, JSON.stringify(uuids, null, 2));
          if (config.logs) {
            console.log(`Successfully removed player ${data.name} with the UUID ${uuid}. Total whitelisted: ${uuids.length}.`);
          }
        }
      }
    }
  }
  

  //check
    else if (action === "check" && username) {
      const player = bot.players[username];
      if (!player) {
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if (res.ok) {
          const data = await res.json();
          uuid = data.id;
          if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }

      if (uuids.includes(uuid)) {
        return true;
      } else {
        return false;
      }
      } else {
        if  (config.logs) {
           console.log("Couldn't check that player. Either they're cracked or some other error occurred.");
      }
        return false;
      }
      }
      if (player) {
      const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player.username}`);
      if (!res.ok) {
        console.error("Error fetching UUID");
        return false;
      }

      const data = await res.json();
      uuid = data.id;

      if (fs.existsSync(whitelistFile)) {
        uuids = JSON.parse(fs.readFileSync(whitelistFile));
      }

      if (uuids.includes(uuid)) {
        return true;
      } else {
        return false;
      }
    }
  }

   //error when bot is not initialized
    else {
      console.error("\x1b[31m There was a problem with your Bot. (Probably not initialized) \x1b[0m");
    }
  }

  bot.whitelist = whitelist;
};
