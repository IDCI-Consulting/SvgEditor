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
        FabricOverrider.override(fabric, this.editorConfig);
        this.canvas = new fabric.Canvas(this.editorConfig.canvas_id);
        this.pluginsConfig = plugins;
    }

    /**
     * Start the svg editor
     */
    init() {
      this.canvas.on('object:moving', (e) => { e.target.bringToFront(); });
      this.loadPlugins();
    }

    /**
     * Trigger the ready function
     */
    triggerReadyFunction() {
      let script = document.querySelector('script[data-editor-ready-function]');
      if (script !== null) {
        let readyFunctionName = script.getAttribute('data-editor-ready-function');

        if (readyFunctionName !== null) {
          let readyFunction = window[readyFunctionName];
          if (typeof readyFunction === "function") {
            readyFunction(this.canvas);
          } else {
            throw new Error('The function ' + readyFunctionName + ' declared with the data-editor-ready-function attribute is not defined');
          }
        }
      }
    }

    /**
     * Load the plugins from the configuration (check the parameters then start the plugins)
     */
    loadPlugins() {

      SvgEditor.sortPluginsByPriority(this.pluginsConfig);

      for (let i=0; i < this.pluginsConfig.length; i++) {
        let pluginConfig = this.pluginsConfig[i];
        if (typeof pluginConfig['class'] === 'undefined') {
          throw new Error('Could not load the plugin at position '+i+' in the plugins.js file. The \'class\' parameter must be defined');
        } else {
          require([pluginConfig['class']], (Plugin) => {
            let plugin = new Plugin(this.canvas, this.editorConfig);
            if (typeof plugin.start !== 'function' || typeof plugin.getConfigurationErrors !== 'function') {
              throw new Error('start() and getConfigurationErrors() functions must be implemented for the plugin ' + pluginConfig['class']);
            } else {
              let errors = plugin.getConfigurationErrors();
              if (errors.length === 0) {
                plugin.start();
              } else {
                let message = 'The plugin ' + pluginConfig['class'] +' does not have a valid configuration';
                for (let i = 0; i < errors.length; i++) {
                  message += '\n - '+errors[i];
                }

                throw new Error(message);
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
        throw new Error('The data-configuration-variable is missing on the require.js script tag');
      }

      let configurationVariableName = script.getAttribute('data-configuration-variable');
      let editorConfig = window[configurationVariableName];
      if (typeof editorConfig === 'undefined') {
        throw new Error('The variable ' + configurationVariableName + ' is not accessible');
      }

      if (typeof editorConfig.canvas_id === 'undefined') {
        throw new Error('The canvasId must be present in the configuration');
      } else {
        if (document.getElementById(editorConfig.canvas_id) === null) {
          throw new Error('No canvas with id '+ editorConfig.canvas_id +' found');
        }
      }

      if (typeof editorConfig.canvas_container_id === 'undefined') {
        throw new Error('The canvas_container_id must be present in the configuration (the canvas must be wrapped in a div with an id)');
      } else {
        if (document.getElementById(editorConfig.canvas_container_id) === null) {
          throw new Error('No canvas container with id '+ editorConfig.canvas_container_id +' found');
        }
      }

      return mergeObjects(defaultConfiguration, editorConfig);
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
