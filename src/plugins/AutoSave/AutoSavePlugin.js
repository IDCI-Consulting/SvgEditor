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
      constructor(canvas, config) {
        this.config = config;
        this.canvas = canvas;
        this.serializer = new SerializerRegistry().guessSerializer(config.serializer);
        this.persistenceManager = new PersistenceManagerRegistry(config).guessPersistenceManager(config.persistence_manager);
      }

      /**
       * Get the configuration errors
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.auto_save === 'undefined') {
          errors.push('auto_save must be defined');
        } else {
          if (typeof this.config.auto_save.enable !== 'boolean') {
            errors.push('auto_save.enable must be defined as a boolean');
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.auto_save.enable === true) {
          this.canvas.on('after:render', () => {
            this.saveProject();
          });
          this.loadProject();
        }
      }

      /**
       * Persist the project
       */
      saveProject() {
        // get the canvas container width and height for resizing on load
        let width = parseInt(getComputedStyle(document.getElementById(this.config.canvas_container_id)).width);
        let height = parseInt(getComputedStyle(document.getElementById(this.config.canvas_container_id)).height);

        let project = this.serializer.serialize({
          'container-width': width,
          'container-height': height,
          'canvas': this.canvas
        });

        this.persistenceManager.persist(project, {key: 'autosave'});
      }

      /**
       * Load the project
       */
      loadProject() {
        let autosave = this.persistenceManager.load({key: 'autosave'});
        if (autosave.length > 0) {
          let project = JSON.parse(autosave);
          let serializedCanvas = this.serializer.serialize(project.canvas);

          // get the canvas container width and height for resizinganalytics
          let oldWidth = parseFloat(project["container-width"]);
          let newWidth = parseFloat(getComputedStyle(document.getElementById(this.config.canvas_container_id)).width);

          if (serializedCanvas) {
            this.serializer.deserialize(serializedCanvas, this.canvas, () => {
              let ratio = newWidth / oldWidth;
              this.canvas.trigger("canvas:deserialized", {"ratio": ratio}); // used by the ObjectResizer
              this.canvas.renderAll();
            });
          }
        }
      }
    }
  }
);
