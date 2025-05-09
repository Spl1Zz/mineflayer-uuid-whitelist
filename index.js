// made by SpliZz
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = function(bot, config) {
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

    if (action === "add" && username) {
      const player = bot.players[username];
      if (!player) {
        console.error("Couldn't add that player. They're not online.");
        return;
      }

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

    else if (action === "remove" && username) {
      const player = bot.players[username];
      if (!player) {
        console.error("Couldn't remove that player. They're not online.");
        return;
      }

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

    else if (action === "check" && username) {
      const player = bot.players[username];
      if (!player) {
        console.error("Couldn't check that player. They're not online.");
        return false;
      }

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

    else {
      console.error("\x1b[31m There was a problem with your Bot. (Probably not initialized) \x1b[0m");
    }
  }

  bot.whitelist = whitelist;
};
