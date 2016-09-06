/**
 * LocalStoragePersistanceManager module
 */
define(['./AbstractPersistenceManager'], function (AbstractPersistenceManager) {

  return class LocalStoragePersistenceManager extends AbstractPersistenceManager {

    /**
     * Persist the canvas
     * 
     * @param canvas: the canvas to be persisted
     * @param options
     */
    persist(serializedCanvas, options) {
      if (typeof serializedCanvas !== 'string') {
        console.error('Only strings should be stored in local storage')
      } else {
        localStorage.setItem(options.key, serializedCanvas);
      }
    }

    /**
     * Load the canvas
     * 
     * @param options
     *
     * @return string: the serialized canvas
     */
    load(options) {
      if (typeof options.key !== 'undefined') {
        return localStorage.getItem(options.key);
      } else {
        // get all items
        let items = [];
        for (let i = 0, len = localStorage.length; i < len; ++i) {
          items.push(localStorage.getItem(localStorage.key(i)));
        }

        return items;
      }
    }

  }

});
