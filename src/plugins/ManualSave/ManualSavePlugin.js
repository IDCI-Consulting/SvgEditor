/**
 * ManualSavePlugin module
 */
define(
  [
    'class/PersistenceManager/PersistenceManagerRegistry',
    'class/Serializer/SerializerRegistry'
  ],
  function (PersistenceManagerRegistry, SerializerRegistry) {
    return class ManualSavePlugin {

      /**
       * Constructor
       */
      constructor(canvas, config) {
        this.prefix = 'manual_save_';
        this.canvas = canvas;
        this.config = config;
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

        if (typeof this.config.manual_save === 'undefined') {
          errors.push('manual_save must be defined');
        } else {
          if (typeof this.config.manual_save.enable !== 'boolean') {
            errors.push('manual_save.enable must be defined as a boolean');
          } else {
            if (this.config.manual_save.enable === true) {

              if (typeof this.config.manual_save.load_button_input_id !== 'string') {
                errors.push('manual_save.load_button_input_id must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.manual_save.load_button_input_id) === null) {
                  errors.push('No tag with id ' + this.config.manual_save.load_button_input_id + ' found');
                }
              }

              if (typeof this.config.manual_save.save_button_input_d !== 'string') {
                errors.push('manual_save.save_button_input_d must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.manual_save.save_button_input_d) === null) {
                  errors.push('No tag with id ' + this.config.manual_save.save_button_input_d + ' found');
                }
              }
            }
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.manual_save.enable === true) {
          // add the modal to the dom on page ready
          $(document).ready(() => {
            $('body').append(this.getLoadModalHtmlContent());
            $('body').append(this.getSaveModalHtmlContent());
          });

          // open the load modal
          document.getElementById(this.config.manual_save.load_button_input_id).onclick = (e) => {
            $('#load-modal').replaceWith(this.getLoadModalHtmlContent());
            $('#load-modal').modal('show');
          };

          // open the save modal
          document.getElementById(this.config.manual_save.save_button_input_d).onclick = (e) => {
            $('#save-modal').replaceWith(this.getSaveModalHtmlContent());
            $('#save-modal').modal('show');
          };

          // save as a new project
          $(document).on('click', '#new-save-button', event => {
            let title = document.getElementById('new-project-title').value;
            let error = this.getError(title);
            if (!error) {
              this.saveProject(title);
              $('#save-modal').modal('hide');
            } else {
              this.printError(error);
            }
          });

          // override a saved project
          $(document).on('click', '.override-save-button', event => {
            let title = $(event.target).data('project');
            this.saveProject(title);
            $('#save-modal').modal('hide');
          });

          // load a project
          $(document).on('click', '.load-button', event => {
            let title = $(event.target).data('project');
            this.loadProject(title);
          });
        }
      }

      /**
       * Check errors on the title before a new save
       */
      getError(title) {
        title = title.trim();
        if (title.length === 0) {
          return this.config.manual_save.labels.title_not_blank;
        }

        let projects = this.persistenceManager.load({'key': this.prefix});
        for (let i = 0, len = projects.length; i < len; i++) {
          let project = JSON.parse(projects[i]);
          if (project.title === title) {
            return this.config.manual_save.labels.title_already_used;
          }
        }

        return null;
      }

      /**
       * Print errors on the modal
       */
      printError(error) {
        $('span.error').replaceWith('<span class="error">' + error + '</span>');
      }

      /**
       * Load a project from his title
       */
      loadProject(title) {
        let project = JSON.parse(this.persistenceManager.load({key: this.prefix + title})[0]);
        let serializedCanvas = this.serializer.serialize(project.canvas);
        let oldWidth = parseFloat(project["container-width"]);
        let newWidth = parseFloat(getComputedStyle(document.getElementById(this.config.canvas_container_id)).width);

        this.serializer.deserialize(serializedCanvas, this.canvas, () => {
          let ratio = newWidth / oldWidth;
          this.canvas.trigger("canvas:deserialized", {"ratio": ratio}); // used by the ObjectResizer
          this.canvas.renderAll();
          $('#load-modal').modal('hide');
        });
      }

      /**
       * Save a project by title
       */
      saveProject(title) {
        // get the canvas container width and height for resizing on load
        let width = parseInt(getComputedStyle(document.getElementById(this.config.canvas_container_id)).width);
        let height = parseInt(getComputedStyle(document.getElementById(this.config.canvas_container_id)).height);

        let project = this.serializer.serialize({
          'title': title,
          'canvas': this.canvas,
          'container-width': width,
          'container-height': height,
          'date': getCurrentDate()
        });

        this.persistenceManager.persist(project, {key: this.prefix + title});
      }

      /**
       * Get the html content of the save modal
       */
      getSaveModalHtmlContent() {
        let config = this.config;
        // get an array with all stringified projects
        let projects = this.persistenceManager.load({'key': this.prefix});
        /**
         * Template string for the save modal (ES6 feature)
         *
         * This function add the list of projects to override a save
         */
        function saveModalHTML(templateData) {
          let string = templateData[0];
          let labels = config.manual_save.labels;
          let len = projects.length;
          if (len > 0) {
            let html = '<table>';
            for (let i = 0; i < len; i++) {
              let project = JSON.parse(projects[i]);
              html +=
                '<tr>' +
                '<td>' + project.title + '</td>' +
                '<td>' + project.date + '</td>' +
                '<td><button type="button" class="override-save-button btn btn-default" data-project="' + project.title + '">' +
                  config.manual_save.labels.save +
                '</button></td>' +
                '</tr>'
              ;
            }
            html += '</table>';
            string = string.replace('{{ no_save_already }}', html);
          }

          for (let label in labels) {
            if (labels.hasOwnProperty(label)) {
              string = string.replace('{{ ' + label + ' }}', labels[label]);
            }
          }

          return string;
        }

        return saveModalHTML`
          <div class="modal fade" id="save-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">{{ save_this_project }}</h4>
                </div>
                <div class="modal-body">
                    <div class="save-list">
                      <strong>{{ override_save }}</strong></br>
                      {{ no_save_already }}
                    </div>
                    </br>
                    <div class="new-save-block">
                      <strong>{{ new_save }}</strong></br>
                      <input id="new-project-title" type="text" placeholder="{{ new_save_placeholder }}"/>
                      <button id="new-save-button" type="button" class="btn btn-primary">{{ save }}</button>
                      <span class="error"></span>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">{{ close }}</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      /**
       * Get the html content of the load modal
       */
      getLoadModalHtmlContent() {
        let config = this.config;
        // get an array with all stringified projects
        let projects = this.persistenceManager.load({'key': this.prefix});
        let labels = config.manual_save.labels;

        /**
         * Template string for the load modal (ES6 feature)
         *
         * This function replace the "no projects to load" text
         * by the list of projects if there are any already saved
         */
        function loadModalHTML(templateData) {
          let string = templateData[0];
          let len = projects.length;
          if (len > 0) {
            let html = '<table>'
            for (let i = 0; i < len; i++) {
              let project = JSON.parse(projects[i]);
              html +=
                '<tr>' +
                '<td>' + project.title + '</td>' +
                '<td>' + project.date + '</td>' +
                '<td><button type="button" class="load-button btn btn-default" data-project="' + project.title + '">' +
                config.manual_save.labels.load +
                '</button></td>' +
                '</tr>'
              ;
            }
            html += '</table>';
            string = string.replace('{{ nothing_to_load }}', html);
          }

          for (let label in labels) {
            if (labels.hasOwnProperty(label)) {
              string = string.replace('{{ ' + label + ' }}', labels[label]);
            }
          }

          return string;
        }

        return loadModalHTML`
          <div class="modal fade" id="load-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">{{ load_project }}</h4>
                </div>
                <div class="modal-body">
                  {{ nothing_to_load }}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">{{ close }}</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
);
