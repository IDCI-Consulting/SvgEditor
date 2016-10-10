/**
 * ObjectResizerPlugin module
 */
define(
  function () {
    return class ObjectResizerPlugin {

      /**
       * Constructor
       */
      constructor(canvas) {
        this.canvas = canvas;
      }

      /**
       * Check if the configuration is valid
       *
       * @return array
       */
      getConfigurationErrors() {
        return [];
      }

      /**
       * Start the plugin
       */
      start() {
        this.canvas.on('canvas:deserialized', (event) => {
          if (event.ratio) {
            let objects = this.canvas.getObjects();
            for (var i = 0; i < objects.length; i++) {
              let object = objects[i];
              object.scaleX = event.ratio * object.scaleX;
              object.scaleY = event.ratio * object.scaleY;
              object.top    = event.ratio * object.top;
              object.left   = event.ratio * object.left;
            }
          }
        });
      }
    }
  }
);
