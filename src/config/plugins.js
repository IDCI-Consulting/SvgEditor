/*
 * Plugins configuration
 */
define(function () {
  return [
    {
      "class":     "plugins/AutoSave/AutoSavePlugin"
    },
    {
      "class":     "plugins/ColorPicker/ColorPickerPlugin",
      "elementId": "color-picker"
    },
    {
      "class":     "plugins/ImageLoader/ImageLoaderPlugin",
      "elementId": "image-loader"
    },
    {
      "class":     "plugins/OutputArea/OutputAreaPlugin",
      "elementId": "svg-output-area"
    },
    {
      "class":     "plugins/KeyboardListener/KeyboardListenerPlugin"
    }
  ];
});



