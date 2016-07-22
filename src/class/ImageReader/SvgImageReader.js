/**
 * SvgImageReader module
 */
define(['./AbstractImageReader'], function (AbstractImageReader) {

  return class SvgImageReader extends AbstractImageReader {
    
    getCanvasImage(file, callback) {
      let reader = new FileReader();
      reader.onload = (event) => {
          let content = event.target.result;
          fabric.loadSVGFromString(content, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);

            return callback(obj);
          });
      }

      reader.readAsText(file);
    }
  
  }

});
