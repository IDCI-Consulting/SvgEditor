/**
 * LocalStoragePersistanceManager module
 */
define(['./AbstractPersistenceManager'], function (AbstractPersistenceManager) {

  return class LocalStoragePersistenceManager extends AbstractPersistenceManager {

    /**
     * Persist the canvas
     * 
     * @param canvas: the canvas to be persisted
     */
    persist(serializedCanvas) {
      localStorage.setItem("canvas", serializedCanvas);
    }

    /**
     * Load the canvas
     * 
     * @return string: the serialized canvas
     */
    load() {
      return localStorage.getItem("canvas");
    }
 
  }

});
