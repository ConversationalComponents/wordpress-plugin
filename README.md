## CoCo WordPress ChatWindow Plugin

##### Quickstart

```bash
./build.sh
```

This will create cocohub.zip file. This is the built plugin, upload it to a wordpress installation.

Use with the shortcode [cocobot]

##### ChatWindow API:

Chat window is added to a DOM element called "erw-root"

It accepts the following parameters:

```js
{
    name: string; // name to appear in header
    human_id_or_url: string; // full url for exchange or ID of bot
    bot_greeting?: string; // what the bot should say before chat begins, defaults to "Type anything to get started!"
    is_fabless?: "false" | "true"; // when false/undefined, window is attached to a button, fixed in lower right corner. Otherwise it'll be placed under the root component
    is_rtl?: "false" | "true"; // when false/undefined, direction of chat window is left-to-right. When true, direction is right to left
    is_open_on_start?: "false" | "true"; // on desktop start open
    height?: number; // desired height, defaults to 500
    width?: number; // desired width, defaults to 300
}
```

Parameters are taken from attributes of "cocobot". Example:

```html
<div id="cocobot" name="Namer" humanIdOrUrl="namer_vp3"></div>
```
