/**
 * SvgImageReader module
 */
define(['./AbstractImageReader'], function (AbstractImageReader) {

  return class SvgImageReader extends AbstractImageReader {

    /**
     * Get the canevas image object from the svg file
     *
     * @param file: the svg from the input
     * @param callback: the function with the retrieved image
     */
    getCanvasImage(file, callback) {
      var reader = new FileReader();
      reader.onload = (event) => {
        fabric.loadSVGFromString(event.target.result, function(objects, options) {
          var obj = fabric.util.groupSVGElements(objects, options);

          return callback(obj);
        });
      }

      reader.readAsText(file);
    }
  }

});
