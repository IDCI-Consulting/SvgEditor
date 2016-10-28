ManualSave Plugin
=================

This plugin is used to scale the canvas after loading it from the persitence layer. On save, the width of the canvas container is saved.
On load, the ratio between the last save and the current windows is used to transform (translate and resize) the canvas objects.

This plugin listen to the canvas:deserialized fabricjs event. The event contain the ratio.

You just need to configure the plugin by updating your configuration object:

```js
...,
'object_resizer': {
    'enable': true
}
```
