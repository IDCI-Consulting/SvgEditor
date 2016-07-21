/**
 * SvgEditor module
 */
define(['./ImageReader'], function (ImageReader) {

  return class SvgEditor {

    /**
     * Constructor
     */
    constructor(canvas, outputArea, imageInput, config) {
      this.outputArea = outputArea;
      this.canvas = canvas;
      this.imageInput = imageInput;

      if (true !== config.enable_textarea_edition) {
        outputArea.readOnly = true;
      }
    }

    /**
     * Initialize the editor
     */
    init() {
      this.canvas.on('after:render', () => { this.fillOutput() });
      this.startOutputAreaListener();
      this.startImageLoader();
    }

    /**
     * Fill the output area with the canvas exported in svg
     */
    fillOutput() {
      this.outputArea.value = this.canvas.toSVG();
    }



    /**
     * Start a listener to fill the output area when the canvas is edited
     */
    startOutputAreaListener() {
      if (this.outputArea.addEventListener) {
        this.outputArea.addEventListener('input', (event) => {
          fabric.loadSVGFromString(event.target.value, (objects, options) => {
            this.canvas.off('after:render');
            this.canvas.clear();
            var object = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(object);
            this.canvas.renderAll();
            this.canvas.on('after:render', () => { this.fillOutput() });
          });
        }, false);
      } else if (this.outputArea.attachEvent) {
        this.outputArea.attachEvent('onpropertychange', () => {
          // IE-specific event handling code
        });
      }
    }

    /**
     * Start an image loader
     */
    startImageLoader() {
      this.imageInput.onchange = (e) => {
        let imageReader = new ImageReader(e.target.files[0]);
        imageReader.getImageObject((object) => {
          let image = new fabric.Image(object);
          image.set({
            angle: 0,
            padding: 10,
            cornersize:10,
            height:110,
            width:110,
          });
          this.canvas.centerObject(image);
          this.canvas.add(image);
          this.canvas.renderAll();
        });
      };
    }

  }

});
