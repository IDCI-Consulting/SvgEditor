/**
 * Plugins configuration
 */
define(function () {
  return [
    {
      "class": "plugins/ImageLoader/ImageLoaderPlugin"
    },
    {
      "class": "plugins/OutputArea/OutputAreaPlugin"
    },
    {
      "class": "plugins/ManualSave/ManualSavePlugin"
    },
    {
      "class": "plugins/ImageFlipper/ImageFlipperPlugin"
    },
    {
      "class": "plugins/AutoImageResizer/AutoImageResizerPlugin"
    },
    {
      "class": "plugins/RemoveObject/RemoveObjectPlugin"
    },
    {
      "class": "plugins/AutoSave/AutoSavePlugin"
    },
    {
      "class": "plugins/ObjectResizer/ObjectResizerPlugin",
      "priority": 1
    },
    {
      "class": "plugins/ColorPicker/ColorPickerPlugin"
    },
    {
      "class": "plugins/KeyboardListener/KeyboardListenerPlugin"
    },
    {
      "class": "plugins/ImageDragAndDrop/ImageDragAndDropPlugin"
    }
  ];
});
