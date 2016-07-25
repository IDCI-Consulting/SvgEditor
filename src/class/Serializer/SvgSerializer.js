/**
 * SvgSerializer module
 */
define(['./AbstractSerializer'], function (AbstractSerializer) {

  return class SvgSerializer extends AbstractSerializer {

    /**
     * Serialize the canvas
     * 
     * @param canvas: the canvas to be serialized
     */
    serialize(canvas) {
      return canvas.toSVG();
    }

    /**
     * Deserialize
     * 
     * @param serializedCanvas: the serialized canvas
     * @param canvas: the canvas object
     * @param callback : a callback function
     */
    deserialize(serializedCanvas, canvas, callback) {
      fabric.loadSVGFromString(serializedCanvas, function(objects, options) {
          var obj = fabric.util.groupSVGElements(objects, options);
          canvas.add(obj);
          callback();
      });
    }
 
  }

});
