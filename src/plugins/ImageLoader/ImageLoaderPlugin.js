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
      constructor(canvas, config) {
        this.config = config;
        this.canvas = canvas;
      }

      /**
       * Get the configuration errors
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.image_loader === 'undefined') {
          errors.push('image_loader must be defined');
        } else {
          if (typeof this.config.image_loader.enable !== 'boolean') {
            errors.push('image_loader.enable must be defined as a boolean');
          } else {
            if (this.config.image_loader.enable === true) {
              if (typeof this.config.image_loader.file_input_id !== 'string') {
                errors.push('image_loader.file_input_id must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.image_loader.file_input_id) === null) {
                  errors.push('No tag with id ' + this.config.image_loader.file_input_id + ' found');
                } else {
                  this.imageInput = document.getElementById(this.config.image_loader.file_input_id);
                }
              }

            }
          }
        }

        return errors;
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
