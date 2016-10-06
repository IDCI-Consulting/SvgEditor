/**
 * SvgEditor module
 */
define(['./FabricOverrider'], function (FabricOverrider) {

    return class SvgEditor {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig, pluginsConfig) {
        FabricOverrider.override(fabric, editorConfig);

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

        this.sortPluginsByPriority(pluginsConfig);

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

      /**
       * Sort the plugins in the config by priority
       * The plugins wil be loaded according to their priority
       *
       * @param config
       * @return config
       */
      sortPluginsByPriority(config) {
        config.sort(function(a, b){
          if (typeof a.priority !== 'number') {
            a.priority = 9999;
          }

          if (typeof b.priority !== 'number') {
            b.priority = 9999;
          }

          if(a.priority >  b.priority) return 1;
          if(a.priority <  b.priority) return -1;

          return 0;
        });
      }
    }
  }
);
