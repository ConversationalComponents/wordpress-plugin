## CoCo WordPress ChatWindow Plugin

##### Quickstart
```bash
./build.sh
```
This will create coco-bot.zip file. This is the built plugin, upload it to a wordpress installation.

Use with the shortcode [erw-widget]

##### ChatWindow API:

Chat window is added to a DOM element called "erw-root"

It accepts the following parameters:

```js
{
    name: string; // name to appear in header
    humanIdOrUrl: string; // full url for exchange or ID of bot
    botGreeting?: string; // what the bot should say before chat begins, defaults to "Type anything to get started!"
    isFabless?: boolean; // when false/undefined, window is attached to a button, fixed in lower right corner. Otherwise it'll be placed under the root component
    height?: number; // desired height, defaults to 500
    width?: number; // desired width, defaults to 300
}
```

Parameters are taken from attributes of "erw-root". Example:

```html
<div id="erw-root" name="Namer" humanIdOrUrl="namer_vp3"></div>
```
