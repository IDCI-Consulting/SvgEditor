/**
 * SvgEditor module
 */
define(
  [
    './ImageReader/ImageReaderRegistry',
    './PersistenceManager/PersistenceManagerRegistry',
    './Serializer/SerializerRegistry',
    './SvgColorator'
  ],
  function (ImageReaderRegistry, PersistenceManagerRegistry, SerializerRegistry, SvgColorator) {

  return class SvgEditor {

    /**
     * Constructor
     */
    constructor(canvas, outputArea, imageInput, colorPicker, config) {

      this.outputArea = outputArea;
      this.canvas = canvas;
      this.imageInput = imageInput;
      this.colorPicker = colorPicker;
      this.serializer = new SerializerRegistry().guessSerializer(config.serializer);
      this.persistenceManager = new PersistenceManagerRegistry().guessPersistenceManager(config.persistence_manager);

      this.init(config);
    }

    /**
     * Initialize the editor
     *
     * @param config: the configuration
     */
    init(config) {

      this.canvas.on('after:render', () => {
        this.fillOutput();
        this.persistCanvas();
        this.imageInput.value = ""; // reset the file input to allow to add the same file several times
      });

      this.canvas.on('object:moving', (e) => { e.target.bringToFront(); });
      
      this.startOutputAreaListener();
      this.startKeyboardListener();
      this.startImageLoader();
      this.startColorPicker();
      this.loadCanvas();

      if (true !== config.display_textarea) {
        this.outputArea.style.display = "none";
      }

      if (true !== config.enable_textarea_edition) {
        this.outputArea.readOnly = true;
      }

    }

    /**
     * Persist the canvas
     */
    persistCanvas() {
      let serializedCanvas = this.serializer.serialize(this.canvas);
      this.persistenceManager.persist(serializedCanvas);
    }

    /**
     * Load canvas
     */
    loadCanvas() {
      let serializedCanvas = this.persistenceManager.load();
      if (serializedCanvas) {
        this.serializer.deserialize(serializedCanvas, this.canvas, () => {
          this.canvas.renderAll();
        });
      }
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
            let object = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(object);
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
        let file = e.target.files[0];
        let imageReaderRegistry = new ImageReaderRegistry();
        let imageReader = imageReaderRegistry.guessImageReader(file.type);
        let item = imageReader.getCanvasImage(file, (item) => {
          this.canvas.centerObject(item);
          this.canvas.add(item);
        });
      }
    }

    /**
     * Start a keyboard listener
     */
    startKeyboardListener() {
      document.addEventListener("keydown", (e) => {
         var keyId = event.keyCode;
         // backspace -> 8
         // delete    -> 46
         if (keyId === 46) {
           let element = this.canvas.getActiveObject();
           if (element) {
             element.remove();
           }
         }
      });
    }

    /**
     * Start color picker
     */
    startColorPicker() {
      this.colorPicker.onchange = (e) => {
        let element = this.canvas.getActiveObject();
        if (element) {
          let color = '#' + e.target.value;
          SvgColorator.color(element, color);
          this.canvas.renderAll();
        }
      }
    }
  }

});
