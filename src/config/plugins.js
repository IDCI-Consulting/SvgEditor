/**
 * Plugins configuration
 */
define(function () {
  return [
    /*{
      "class": "plugins/AutoSave/AutoSavePlugin"
    },*/
    {
      "class": "plugins/ColorPicker/ColorPickerPlugin",
      "inputId": "color-picker"
    },
    {
      "class": "plugins/ImageLoader/ImageLoaderPlugin",
      "fileInputId": "image-loader"
    },
    {
      "class": "plugins/OutputArea/OutputAreaPlugin",
      "texareaId": "svg-output-area"
    },
    {
      "class": "plugins/KeyboardListener/KeyboardListenerPlugin"
    },
    {
      "class": "plugins/ImageDragAndDropper/ImageDragAndDropperPlugin",
      "imageContainerId": "image-container",
      "canvasContainerId": "canvas-container"
    }
    ,{
      "class": "plugins/ManualSave/ManualSavePlugin",
      "loadButtonInputId": "load-modal-button",
      "saveButtonInputId": "save-modal-button"
    }
  ];
});



