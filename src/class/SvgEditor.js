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
       * Load the plugins from the configuration (check the parameters then start the plugins)
       */
      loadPlugins(canvas, pluginsConfig, editorConfig) {
        for (let i=0; i < pluginsConfig.length; i++) {
          let pluginConfig = pluginsConfig[i];
          if (typeof pluginConfig['class'] === 'undefined') {
            console.error('Could not load the plugin at position '+i+' in the plugins.js file. The \'class\' parameter must be defined');
          } else {
            require([pluginConfig['class']], function(Plugin) {
              let plugin = new Plugin(canvas, editorConfig, pluginConfig);
              if (typeof plugin.start !== 'function' || typeof plugin.configurationIsValid !== 'function') {
                console.error('start() and configurationIsValid() functions must be implemented for the plugin ' + pluginConfig['class']);
              } else {
                if (plugin.configurationIsValid(pluginConfig)) {
                  plugin.start();
                } else {
                  console.error('The plugin ' + pluginConfig['class'] +' does not have a valid configuration');
                }
              }
            });
          }
        }
      }
    }
  }
);
