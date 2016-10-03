ManualSave Plugin
=================

This plugin is used to scale the canvas after loading it from the persitance layer. On save, the width of the canvas container is saved.
On load, the ratio between the last save and the current windows is used to transform (translate and resize) the canvas objects.

This plugin listen to the canvas:deserialized fabricjs event. The event contain the ratio.

You need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/ObjectResizer/ObjectResizerPlugin",
  "priority": 1
}
```

Beware to adjust plugins priority (This plugin must be launched before the plugins with save features)