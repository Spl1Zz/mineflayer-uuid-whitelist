# mineflayer-uuid-whitelist

A simple whitelist plugin to manage your UUID based whitelist, great for anarchy servers

#### This plugin only works on servers with `"online-mode"` set to `"true"` (Minecraft Premium accounts) 

## Installation

```bash
npm install mineflayer-uuid-whitelist
```

## Usage

Load the plugin with your bot instance:

```js
const mineflayer = require('mineflayer');
const whitelist = require('mineflayer-uuid-whitelist');

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'bot'
});

bot.loadPlugin(whitelist); // Important: only load the plugin after bot initialization

bot.on('chat', async (username, message) => {
  // Whitelist stuff here
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
const isWhitelisted = await bot.whitelist("check", "Notch"); // true or false
if (isWhitelisted) {
  bot.chat("You are whitelisted!")
} else if (!isWhitelisted) {
  bot.chat("You are not whitelisted!")
}
```
## Config
- Add a file named `uuidconfig.json` into your project's directory for some customisability.

### Possible config variables:
Variables | Possible values |logic
-------- | -------- | --------
`"logs"`   | true/false | displays additional infos in the console

### Example uuidconfig.json:
```js
[
  "logs": true
]
```

## Notes

- ~~The player must be online on the server to perform any of the actions.~~           
    The player must own an online account with an valid UUID
- `whitelist.json` will be created automatically if it does not exist. Custom UUID lists are supported. Required format:
```js
[
  "069a79f444e94726a5befca90e38aaf5", //UUID here, split with comma
  "61699b2ed3274a019f1e0ea8c3f06bc6"
]
```
- All added UUIDs are stored in `whitelist.json`.

## License

MIT
