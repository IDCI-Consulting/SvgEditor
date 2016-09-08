/**
 * BlobFileDownloader module
 */
define(['./AbstractFileDownloader', 'class/MimeTypeGuesser'], function (AbstractFileDownloader, MimeTypeGuesser) {

  return class BlobFileDownloader extends AbstractFileDownloader{

    /**
     * download a file
     *
     * @param imageUrl
     *
     * @return callback
     */
    downloadFile(imageUrl, callback) {
      let extension = getExtension(imageUrl);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', imageUrl, true);
      xhr.responseType = 'blob';

      xhr.onload = (event) => {
        if (event.target.status == 200) {
          var blob = new Blob(
            [ event.target.response ],
            { type: MimeTypeGuesser.guess(extension) }
          );

          return callback(blob);
        }
      };

      xhr.send();
    }
  }
});
