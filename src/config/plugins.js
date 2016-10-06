/**
 * Plugins configuration
 */
define(function () {
  return [
    {
      "class": "plugins/ImageLoader/ImageLoaderPlugin",
      "fileInputId": "image-loader"
    },
    {
      "class": "plugins/OutputArea/OutputAreaPlugin",
      "texareaId": "svg-output-area"
    },
    {
      "class": "plugins/ManualSave/ManualSavePlugin",
      "loadButtonInputId": "load-modal-button",
      "saveButtonInputId": "save-modal-button"
    },
    {
      "class": "plugins/ImageFlipper/ImageFlipperPlugin",
      "horizontalFlipInputId": "horizontalflip-modal-button",
      "verticalFlipInputId": "verticalflip-modal-button"
    },
    {
      "class": "plugins/AutoSave/AutoSavePlugin"
    },
    {
      "class": "plugins/ObjectResizer/ObjectResizerPlugin",
      "priority": 1
    },
    {
      "class": "plugins/ColorPicker/ColorPickerPlugin",
      "inputId": "color-picker"
    },
    {
      "class": "plugins/KeyboardListener/KeyboardListenerPlugin"
    },
    {
      "class": "plugins/ImageDragAndDropper/ImageDragAndDropperPlugin",
      "imageContainerId": "image-container",
      "canvasContainerId": "canvas-container"
    }
  ];
});
