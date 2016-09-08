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
      constructor(canvas, editorConfig, pluginConfig) {
        this.imageReaderRegistry    = new ImageReaderRegistry();
        this.fileDownloaderRegistry = new FileDownloaderRegistry();
        this.imageContainerId       = pluginConfig.imageContainerId;
        this.canvasContainerId      = pluginConfig.canvasContainerId;
        this.canvas                 = canvas;
        this.images                 = document.querySelectorAll('#'+this.imageContainerId+' img');
      }

      /**
       * Check if the configuration is valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        if (typeof pluginConfig.imageContainerId === 'undefined') {
          return false;
        }

        if (typeof pluginConfig.canvasContainerId === 'undefined') {
          return false;
        }

        return true;
      }

      /**
       * Start the plugin
       */
      start() {
        // drag and drop html5 detection
        if(!('draggable' in document.createElement('span'))) {
          console.error('HTML5 Drag and drop is not supported by your browser');
          return;
        }

        for (let i = 0, len = this.images.length; i < len; i++) {
          this.images[i].addEventListener('dragstart', event => this.handleDragStart(event), false);
          this.images[i].addEventListener('dragend', event => this.handleDragEnd(event), false);
        }

        let canvasContainer = document.getElementById(this.canvasContainerId);
        canvasContainer.addEventListener('dragenter', event => this.handleDragEnter(event), false);
        canvasContainer.addEventListener('dragover', event => this.handleDragOver(event), false);
        canvasContainer.addEventListener('dragleave', event => this.handleDragLeave(event), false);
        canvasContainer.addEventListener('drop', event => this.handleDrop(event), false);
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
          if (event.stopPropagation) {
            event.stopPropagation(); // stops the browser from redirecting.
          }

          let imageUrl = document.querySelector('#'+this.imageContainerId+' img.img_dragging').src;

          // We can't read the file if it's not on the computer of the client
          // We need to download it before so we can use our imageReader
          this.fileDownloaderRegistry.guessFileDownloader('blob').downloadFile(imageUrl, (blob) => {
            let file = new File([blob], getFilename(imageUrl));
            let fileMimeType = MimeTypeGuesser.guess(getExtension(imageUrl));
            let imageReader = this.imageReaderRegistry.guessImageReader(fileMimeType);
            imageReader.getCanvasImage(file, (item) => {
              item.left = event.layerX;
              item.top = event.layerY;
              this.canvas.add(item);
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
      handleDragEnd(event) {
        for (let i = 0, len = this.images.length; i < len; i++) {
          this.images[i].classList.remove('img_dragging');
        }
      }
    }

  }
);
