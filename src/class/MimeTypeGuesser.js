/**
 * Mime Type Guesser module
 */
define(function () {

  return class MimeTypeGuesser {

    /**
     * Get the map of extension - mime type
     */
    static getExtensionMimeType() {
      return [
        {
          "extension": "svg",
          "mimeType": "image/svg+xml"
        },
        {
          "extension": "gif",
          "mimeType": "image/gif"
        },
        {
          "extension": "jpeg",
          "mimeType": "image/jpeg"
        },
        {
          "extension": "png",
          "mimeType": "image/png"
        },
      ]
    }

    

    /**
     * Guess the mime-type from the extension or filename
     */
    static guess(extension) {
      let extensionMimeTypeMap = MimeTypeGuesser.getExtensionMimeType();
      for (let i = 0, l = extensionMimeTypeMap.length; i < l; i++) {
        let extensionMimeType = extensionMimeTypeMap[i];
        if (extensionMimeType.extension === extension) {
          return extensionMimeType.mimeType;
        }
      }

      throw Error(`No mime type found for extension ${extension}`);
    }
  }
});
