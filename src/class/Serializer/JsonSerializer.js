/**
 * JsonSerializer module
 */
define(['./AbstractSerializer'], function (AbstractSerializer) {

  return class JsonSerializer extends AbstractSerializer {

    /**
     * Serialize the canvas
     * 
     * @param canvas: the canvas to be serialized
     * @return string: the serialize canvas
     */
    serialize(canvas) {
      return JSON.stringify(canvas);
    }

    /**
     * Deserialize
     * 
     * @param serializedCanvas: the serialized canvas
     * @param canvas: the canvas object
     * @param callback : a callback function
     */
    deserialize(serializedCanvas, canvas, callback) {
      canvas.loadFromJSON(serializedCanvas);
      callback();
    }
 
  }

});
