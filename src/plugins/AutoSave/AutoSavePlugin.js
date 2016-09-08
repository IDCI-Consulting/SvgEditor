/**
 * AutoSavePlugin module
 */
define(
  [
    'class/PersistenceManager/PersistenceManagerRegistry',
    'class/Serializer/SerializerRegistry'
  ],
  function (PersistenceManagerRegistry, SerializerRegistry) {
    return class AutoSavePlugin {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig, pluginConfig) {
        this.canvas = canvas;
        this.serializer = new SerializerRegistry().guessSerializer(editorConfig.serializer);
        this.persistenceManager = new PersistenceManagerRegistry().guessPersistenceManager(editorConfig.persistence_manager);
      }

      /**
       * Start the plugin
       */
      start() {
        this.canvas.on('after:render', () => {
          this.persistCanvas();
        });
        this.loadCanvas();
      }

      /**
       * Persist the canvas
       */
      persistCanvas() {
        let serializedCanvas = this.serializer.serialize(this.canvas);
        this.persistenceManager.persist(serializedCanvas, {key: 'autosave'});
      }

      /**
       * Load canvas
       */
      loadCanvas() {
        let serializedCanvas = this.persistenceManager.load({key: 'autosave'});
        if (serializedCanvas) {
          this.serializer.deserialize(serializedCanvas, this.canvas, () => {
            this.canvas.renderAll();
          });
        }
      }
    }
  }
);
