/**
 * SvgEditor module
 */
define(
  function () {

    return class SvgEditor {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig, pluginsConfig) {

        this.init(canvas);
        this.loadPlugins(canvas, pluginsConfig, editorConfig);
      }

      /**
       * Initialize the editor
       *
       * @param config: the configuration
       */
      init(canvas) {
        canvas.on('object:moving', (e) => { e.target.bringToFront(); });
      }

      /**
       * Load the plugins from the configuration
       */
      loadPlugins(canvas, pluginsConfig, editorConfig) {
        for (let i=0; i < pluginsConfig.length; i++) {
          let pluginConfig = pluginsConfig[i];
          require([pluginConfig['class']], function(Plugin) {
            let plugin = new Plugin(canvas, editorConfig, pluginConfig);
            plugin.start();
          });
        }
      }
    }
  }
);
