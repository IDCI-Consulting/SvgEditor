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
       * Check if the configuration is valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        // no additional configuration required
        return true;
      }

      /**
       * Start the plugin
       */
      start() {
        this.canvas.on('after:render', () => {
          this.saveProject();
        });
        this.loadProject();
      }

      /**
       * Persist the project
       */
      saveProject() {

        // get the canvas container width and height for resizing on load
        var width = parseInt(getComputedStyle(document.getElementById('canvas-container')).width);
        var height = parseInt(getComputedStyle(document.getElementById('canvas-container')).height);

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

        let project = JSON.parse(this.persistenceManager.load({key: 'autosave'}));

        if(project) {

          let serializedCanvas = this.serializer.serialize(project.canvas);

          // get the canvas container width and height for resizinganalytics
          let oldWidth = parseFloat(project["container-width"]);
          let newWidth = parseFloat(getComputedStyle(document.getElementById('canvas-container')).width);

          if (serializedCanvas) {
            this.serializer.deserialize(serializedCanvas, this.canvas, () => {
              var ratio = newWidth / oldWidth;
              this.canvas.trigger("canvas:deserialized", { "ratio": ratio }); // used by the ObjectResizer
              this.canvas.renderAll();
            });
          }
        }
      }
    }
  }
);
