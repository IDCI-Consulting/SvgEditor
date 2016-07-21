/**
 * ImageReader module
 */
define(['./PlainImageReader', './SvgImageReader'], function (PlainImageReader, SvgImageReader) {

  return class ImageReaderRegistry {
 
    /**
     * Constructor
     */
    constructor() {
      this.readerMimeTypeMap = [
        {
          "mimeTypes": ["image/gif", "image/jpeg", "image/png"],
          "reader": new PlainImageReader()
        },
        {
          "mimeTypes": ["image/svg+xml"],
          "reader": new SvgImageReader()
        }
      ];
    }

    /**
     * Guess the image reader for the given mime type
     */
    guessImageReader(mimeType) {
      for (let i = 0, l = this.readerMimeTypeMap.length; i < l; i++) {
        let readerMimeType = this.readerMimeTypeMap[i];
        if (-1 !== readerMimeType.mimeTypes.indexOf(mimeType)) {
          return readerMimeType.reader;
        }
      }

      throw Error(`No reader found for mime type ${mimeType}`);
    }

  }

});
