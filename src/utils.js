
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
  let day         = currentDate.getDate();
  let month       = currentDate.getMonth() + 1;
  let year        = currentDate.getFullYear();
  let hours       = currentDate.getHours();
  let minutes     = currentDate.getMinutes();

  return day + "/" + month + "/" + year + ' ' + hours + 'h' + minutes;
}

