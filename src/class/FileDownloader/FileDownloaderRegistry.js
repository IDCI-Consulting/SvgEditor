/**
 * FileDownloaderRegistry module
 */
define(['./BlobFileDownloader'], function (BlobFileDownloader) {

  return class FileDownloaderRegistry {

    /**
     * Constructor
     */
    constructor() {
      this.downloaderFileTypeMap = [
        {
          "fileType": "blob",
          "downloader": new BlobFileDownloader()
        }
      ];
    }

    /**
     * Guess the file downloader for the given mime type
     */
    guessFileDownloader(fileType) {
      for (let i = 0, l = this.downloaderFileTypeMap.length; i < l; i++) {
        let downloaderFileType = this.downloaderFileTypeMap[i];
        if (downloaderFileType.fileType === fileType) {
          return downloaderFileType.downloader;
        }
      }

      throw Error(`No file downloader found for type ${fileType}`);
    }
  }

});
