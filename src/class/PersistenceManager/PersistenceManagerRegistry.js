/**
 * ImageReader module
 */
define(['./LocalStoragePersistenceManager'], function (LocalStoragePersistenceManager) {

  return class PersistenceManagerRegistry {
 
    /**
     * Constructor
     */
    constructor(config) {
      this.keyPersistenceManagerMap = [
        {
          "key": "local_storage",
          "persistenceManager": new LocalStoragePersistenceManager(config.local_storage_prefix)
        }
      ];
    }

    /**
     * Guess the persistence manager for the given key
     */
    guessPersistenceManager(key) {
      for (let i = 0, l = this.keyPersistenceManagerMap.length; i < l; i++) {
        let keyPersistenceManager = this.keyPersistenceManagerMap[i];
        if (key === keyPersistenceManager.key) {
          return keyPersistenceManager.persistenceManager;
        }
      }

      throw Error(`No persistenceManager found for key ${key}`);
    }

  }

});
