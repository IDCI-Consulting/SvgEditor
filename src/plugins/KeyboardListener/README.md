KeyboardListener Plugin
=======================

This plugin only add the possibility to delete a selected object by pressing the `del` key, and to move a selected object by pressing the arrow keys.
It may be a good start point to add keyboard related features.

You just need to configure the plugin by updating your configuration object:

```js
...,
'keyboard_listener': {
    'enable_delete_object': true,
    'enable_move_object': true
},
```
