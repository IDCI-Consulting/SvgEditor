/**
 * SvgEditor module
 */
define(['./FabricOverrider', '../config/plugins', '../config/editor'], function (FabricOverrider, plugins, editorDefaultConfiguration) {

  return class SvgEditor {

    /**
     * Constructor
     */
    constructor() {
      this.editorConfig = SvgEditor.getConfiguration(editorDefaultConfiguration);
      this.canvas = new fabric.Canvas(this.editorConfig.canvas_id);
      this.pluginsConfig = plugins;
      FabricOverrider.override(fabric, this.editorConfig);
    }

    /**
     * Start the svg editor
     */
    init() {
      this.canvas.on('object:moving', (e) => { e.target.bringToFront(); });
      this.loadPlugins();
    }


    /**
     * Load the plugins from the configuration (check the parameters then start the plugins)
     */
    loadPlugins() {

      SvgEditor.sortPluginsByPriority(this.pluginsConfig);

      for (let i=0; i < this.pluginsConfig.length; i++) {
        let pluginConfig = this.pluginsConfig[i];
        if (typeof pluginConfig['class'] === 'undefined') {
          console.error('Could not load the plugin at position '+i+' in the plugins.js file. The \'class\' parameter must be defined');
        } else {
          require([pluginConfig['class']], (Plugin) => {
            let plugin = new Plugin(this.canvas, this.editorConfig);
            if (typeof plugin.start !== 'function' || typeof plugin.getConfigurationErrors !== 'function') {
              console.error('start() and getConfigurationErrors() functions must be implemented for the plugin ' + pluginConfig['class']);
            } else {
              let errors = plugin.getConfigurationErrors();
              if (errors.length === 0) {
                plugin.start();
              } else {
                let message = 'The plugin ' + pluginConfig['class'] +' does not have a valid configuration';
                for (let i = 0; i < errors.length; i++) {
                  message += '\n - '+errors[i];
                }

                console.error(message);
              }
            }
          });
        }
      }
    }

    /**
     * Get the user configuration
     *
     * @return {}
     */
    static getConfiguration(defaultConfiguration) {
      let script = document.querySelector('script[data-configuration-variable]');
      if (script === null) {
        console.error('The data-configuration-variable is missing on the require.js script tag');
        return null;
      }

      let configurationVariableName = script.getAttribute('data-configuration-variable');
      let editorConfig = window[configurationVariableName];
      if (typeof editorConfig === 'undefined') {
        console.error('The variable ' + configurationVariableName + ' is not accessible');
        return null;
      }

      if (typeof editorConfig.canvas_id === 'undefined') {
        console.error('The canvasId must be present in the configuration');
        return null;
      } else {
        if (document.getElementById(editorConfig.canvas_id) === null) {
          console.error('No canvas with id '+ editorConfig.canvas_id +' found');
          return null;
        }
      }

      if (typeof editorConfig.canvas_container_id === 'undefined') {
        console.error('The canvas_container_id must be present in the configuration (the canvas must be wrapped in a div with an id)');
        return null;
      } else {
        if (document.getElementById(editorConfig.canvas_container_id) === null) {
          console.error('No canvas container with id '+ editorConfig.canvas_container_id +' found');
          return null;
        }
      }

      //merge the default with the new configuration
      var mergedConfiguration = {};
      for (var defaultAttribute in defaultConfiguration) {
        if (defaultConfiguration.hasOwnProperty(defaultAttribute)) {
          mergedConfiguration[defaultAttribute] = defaultConfiguration[defaultAttribute];
        }
      }
      for (var attribute in editorConfig) {
        if (editorConfig.hasOwnProperty(attribute)) {
          mergedConfiguration[attribute] = editorConfig[attribute];
        }
      }

      return mergedConfiguration;
    }

    /**
     * Sort the plugins in the config by priority
     * The plugins wil be loaded according to their priority
     *
     * @param config
     * @return config
     */
    static sortPluginsByPriority(config) {
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
});
