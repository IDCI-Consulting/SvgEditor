/**
 * Abstract Image Reader module
 */
define(function () {

  return class AbstractImageReader {

    /**
     * Constructor
     */
    constructor() {

      if (this.constructor === AbstractImageReader) {
        throw new TypeError("Cannot construct AbstractImageReader instances directly");
      }

      if (this.getCanvasImage === undefined) {
        throw new TypeError("getCanvasImage must be implemented");
      }
    }
  }
});

