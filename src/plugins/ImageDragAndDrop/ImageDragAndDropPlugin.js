/**
 * ImageDragAndDropperPlugin module
 *
 * See http://jsfiddle.net/Ahammadalipk/w8kkc/185/
 */
define(
  [
    'class/ImageReader/ImageReaderRegistry',
    'class/FileDownloader/FileDownloaderRegistry',
    'class/MimeTypeGuesser'
  ],
  function (ImageReaderRegistry, FileDownloaderRegistry, MimeTypeGuesser) {

    return class ImageDragAndDropperPlugin {

      /**
       * Constructor
       */
      constructor(canvas, config) {
        this.imageReaderRegistry    = new ImageReaderRegistry();
        this.fileDownloaderRegistry = new FileDownloaderRegistry();
        this.canvas                 = canvas;
        this.config                 = config;
      }

      /**
       * Get the configuration errors
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.image_drag_and_drop === 'undefined') {
          errors.push('image_drag_and_drop must be defined');
        } else {
          if (typeof this.config.image_drag_and_drop.enable !== 'boolean') {
            errors.push('image_drag_and_drop.enable must be defined as a boolean');
          } else {
            if (this.config.image_drag_and_drop.enable === true) {
              if (typeof this.config.image_drag_and_drop.image_container_id !== 'string') {
                errors.push('image_drag_and_drop.image_container_id must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.image_drag_and_drop.image_container_id) === null) {
                  errors.push('No tag with id ' + this.config.image_drag_and_drop.image_container_id + ' found');
                } else {
                  this.images = document.querySelectorAll('#'+this.config.image_drag_and_drop.image_container_id+' img');
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
        if (this.config.image_drag_and_drop.enable === true) {
          // drag and drop html5 detection
          if (!('draggable' in document.createElement('span'))) {
            console.error('HTML5 Drag and drop is not supported by your browser');
            return;
          }

          for (let i = 0, len = this.images.length; i < len; i++) {
            // drag and drop for desktop
            this.images[i].addEventListener('dragstart', event => this.handleDragStart(event), false);
            this.images[i].addEventListener('dragend', event => this.handleDragEnd(event), false);

            // mobile touch support
            this.images[i].addEventListener('touchstart', event => this.handleTouchStart(event), false);
          }

          let canvasContainer = document.getElementById(this.config.canvas_container_id);
          canvasContainer.addEventListener('dragenter', event => this.handleDragEnter(event), false);
          canvasContainer.addEventListener('dragover', event => this.handleDragOver(event), false);
          canvasContainer.addEventListener('dragleave', event => this.handleDragLeave(event), false);
          canvasContainer.addEventListener('drop', event => this.handleDrop(event), false);
        }
      }

      /**
       * Add an image to the canvas
       *
       * @param imageUrl
       * @param callback
       */
      downloadImage(imageUrl, callback) {
        this.fileDownloaderRegistry.guessFileDownloader('blob').downloadFile(imageUrl, (blob) => {
          let filename = getFilename(imageUrl);
          let file = null;

          try {
            file = new File([blob], filename);
          } catch (e) {
            // IE does not support the File constructor
            blob.name = filename;
            file = blob;
          }

          return callback(file);
        });
      }

      /**
       * Function triggered on touch start
       *
       * @param event
       */
      handleTouchStart(event) {
        let imageUrl = event.target.currentSrc;
        let fileMimeType = MimeTypeGuesser.guess(getExtension(imageUrl));
        let imageReader = this.imageReaderRegistry.guessImageReader(fileMimeType);

        // We can't read the file if it's not on the computer of the client
        // We need to download it before so we can use our imageReader
        this.downloadImage(imageUrl, (file) => {
          imageReader.getCanvasImage(file, (item) => {
            this.canvas.centerObject(item);
            this.canvas.add(item);
            this.canvas.fire('object:newly-added', { target: item });
          });
        });
      }

      /**
       * Function triggered on drag over
       */
      handleDragOver(event) {
        if (event.preventDefault) {
          event.preventDefault(); // Necessary. Allows us to drop.
        }

        event.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.

        return false;
      }

      /**
       * Function triggered on drop
       */
      handleDrop(event) {
          if(event.preventDefault) {
            event.preventDefault();
          }
          if (event.stopPropagation) {
            event.stopPropagation(); // stops the browser from redirecting.
          }

          let imageUrl = document.querySelector('#'+this.config.image_drag_and_drop.image_container_id+' img.img_dragging').src;
          let fileMimeType = MimeTypeGuesser.guess(getExtension(imageUrl));
          let imageReader = this.imageReaderRegistry.guessImageReader(fileMimeType);

          // We can't read the file if it's not on the computer of the client
          // We need to download it before so we can use our imageReader
          this.downloadImage(imageUrl, (file) => {
            imageReader.getCanvasImage(file, (item) => {
              item.left = event.layerX;
              item.top = event.layerY;
              this.canvas.add(item);
              this.canvas.fire('object:newly-added', { target: item });
            });
          });

          return false;
      }

      /**
       * Function triggered on drag enter
       */
      handleDragEnter(event) {
        event.target.classList.add('over');
      }

      /**
       * Function triggered on drag leave
       */
      handleDragLeave(event) {
        event.target.classList.remove('over');
      }

      /**
       * Function triggered on drag start
       */
      handleDragStart(event) {
        for (let i = 0, len = this.images.length; i < len; i++) {
          this.images[i].classList.remove('img_dragging');
        }

        event.target.classList.add('img_dragging');
      }

      /**
       * Function triggered on drag end
       */
      handleDragEnd() {
        for (let i = 0, len = this.images.length; i < len; i++) {
          this.images[i].classList.remove('img_dragging');
        }
      }
    }

  }
);
