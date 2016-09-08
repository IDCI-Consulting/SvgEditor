/**
 * ImageLoaderPlugin module
 */
define(
  [
    'class/ImageReader/ImageReaderRegistry'
  ],
  function (ImageReaderRegistry) {

    return class ImageLoaderPlugin {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig, pluginConfig) {
        this.imageInput = document.getElementById(pluginConfig.fileInputId);
        this.canvas     = canvas;
      }

      /**
       * Start the plugin
       */
      start() {
        this.canvas.on('after:render', () => {
          this.imageInput.value = ""; // reset the file input to allow to add the same file several times
        });

        this.imageInput.onchange = (e) => {
          let file = e.target.files[0];
          let imageReaderRegistry = new ImageReaderRegistry();
          let imageReader = imageReaderRegistry.guessImageReader(file.type);
          imageReader.getCanvasImage(file, (item) => {
            this.canvas.centerObject(item);
            this.canvas.add(item);
          });
        }
      }
    }

  }
);
