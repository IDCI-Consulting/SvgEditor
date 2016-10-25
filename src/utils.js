
/**
 * Get the filename
 */
function getFilename(url) {
  return url.split('/').pop();
}

/**
 * Get the extension of the filename, path or url
 */
function getExtension(string) {
  return string.split('.').pop();
}

/**
 * Get the current date
 */
function getCurrentDate() {
  let currentDate = new Date();
  let day         = ('0' + currentDate.getDate()).slice(-2);
  let month       = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let year        = currentDate.getFullYear();
  let hours       = currentDate.getHours();
  let minutes     = ('0' + currentDate.getMinutes()).slice(-2);

  return day + "/" + month + "/" + year + ' ' + hours + 'h' + minutes;
}

