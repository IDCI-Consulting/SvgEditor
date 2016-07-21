/**
 * ImageReader module
 */
define(function () {

  return class ImageReader {

    /**
     * Constructor
     */
    constructor(file) {
      this.file = file;

      var allowedFileTypes = ["image/gif", "image/jpeg", "image/png"];
      var fileType = allowedFileTypes.indexOf(file.type);
      if (fileType == -1) {
        throw Error('bad file type: '+file.type);
      }
    }

    /**
     * Get the image object from the file name
     */
    getImageObject(callback) {
      var reader = new FileReader();
      reader.onload = (event) => {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = () => callback(imgObj);
      }
      reader.readAsDataURL(this.file);
    }

  }

});
