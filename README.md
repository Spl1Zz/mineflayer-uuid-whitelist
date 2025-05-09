# mineflayer-uuid-whitelist

A simple whitelist plugin to manage your UUID based whitelist, great for anarchy servers

## Installation

```bash
npm install mineflayer-uuid-whitelist
```

## Usage

Load the plugin with your bot instance:

```js
const mineflayer = require('mineflayer');
const whitelistPlugin = require('mineflayer-uuid-whitelist');

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'bot'
});

bot.loadPlugin(whitelistPlugin);

bot.once('spawn', async () => {
  // Examples
});
```

## Methods

### bot.whitelist("add", username)
Adds the UUID of an online player to `whitelist.json`.

```js
bot.whitelist("add", "Notch");
```

### bot.whitelist("remove", username)
Removes the UUID of an online player from `whitelist.json`.

```js
bot.whitelist("remove", "Notch");
```

### bot.whitelist("check", username)
Checks if the UUID of an online player is in the whitelist. Returns `true` or `false`.

```js
const isWhitelisted = await bot.whitelist("check", "Notch");
console.log(isWhitelisted); // true or false
```

## Notes

- The player must be online on the server to perform any of the actions.
- The file `whitelist.json` will be created automatically if it does not exist.
- All UUIDs are stored in a local JSON file named `whitelist.json`.

## License

MIT
