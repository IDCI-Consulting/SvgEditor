/**
 * LocalStoragePersistanceManager module
 */
define(['./AbstractPersistenceManager'], function (AbstractPersistenceManager) {

  return class LocalStoragePersistenceManager extends AbstractPersistenceManager {

    /**
     * Constructor
     */
    constructor(prefix) {
      super();
      this.prefix = prefix;
    }

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
        localStorage.setItem(this.prefix + options.key, serializedCanvas);
      }
    }

    /**
     * Load the canvas
     * 
     * @param options
     *
     * @return []: an array of the items which start by the key
     */
    load(options) {
      if (typeof options.key === 'undefined') {
        console.error('Load function missing argument: options.key');
      } else {
        // get all items with
        let items = [];
        for (let i = 0, len = localStorage.length; i < len; ++i) {
          if (localStorage.key(i).indexOf(this.prefix + options.key) === 0) {
            items.push(localStorage.getItem(localStorage.key(i)));
          }
        }

        return items;
      }
    }

    /**
     * Remove the from local storage
     *
     * @param options
     */
    remove(options) {
      if (typeof options.key === 'undefined') {
        console.error('Remove function missing argument: options.key');
      } else {
        // get all items with
        let items = [];
        for (let i = 0, len = localStorage.length; i < len; ++i) {
          if (localStorage.key(i).indexOf(this.prefix + options.key) === 0) {
            localStorage.removeItem(localStorage.key(i));
          }
        }

        return items;
      }
    }

  }

});
