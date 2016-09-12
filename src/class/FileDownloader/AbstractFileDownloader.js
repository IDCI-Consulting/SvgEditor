/**
 * Abstract File Downloader module
 */
define(function () {

  return class AbstractFileDownloader {

    /**
     * Constructor
     */
    constructor() {

      if (this.constructor === AbstractFileDownloader) {
        throw new TypeError("Cannot construct AbstractFileDownloader instances directly");
      }

      if (this.downloadFile === undefined) {
        throw new TypeError("downloadFile must be implemented");
      }
    }
  }
});
