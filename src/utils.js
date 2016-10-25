
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

/**
 * Merge a new object with a default one
 *
 * @param defaultObject
 * @param newObject
 * @returns {{}}
 */
function mergeObjects(defaultObject, newObject) {

    for (var property in newObject) {
      try {
        // Property in destination object set; update its value.
        if (typeof newObject[property] == 'object' ) {
          defaultObject[property] = mergeObjects(defaultObject[property], newObject[property]);
        } else {
          defaultObject[property] = newObject[property];
        }

      } catch(e) {
        // Property in destination object not set; create it and set its value.
        defaultObject[property] = newObject[property];
      }
    }

    return defaultObject;
}

