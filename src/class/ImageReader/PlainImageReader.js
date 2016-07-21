/**
 * PlainImageReader module
 */
define(['./AbstractImageReader'], function (AbstractImageReader) {

  return class PlainImageReader extends AbstractImageReader {

    /**
     * Get the canevas image object from the image file
     * 
     * @param file: the file from the input
     * @param callback: the function with the retrieved image
     */
    getCanvasImage(file, callback) {
      var reader = new FileReader();
      reader.onload = (event) => {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = () => {
          let image = new fabric.Image(imgObj);
          image.set({
            angle: 0,
            padding: 10,
            cornersize:10,
            height:110,
            width:110,
          });

          return callback(image);
        }
      }

      reader.readAsDataURL(file);
    }

  }

});
