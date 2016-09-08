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
      constructor(canvas, editorConfig, pluginConfig) {
        this.canvas = canvas;
        this.serializer = new SerializerRegistry().guessSerializer(editorConfig.serializer);
        this.persistenceManager = new PersistenceManagerRegistry().guessPersistenceManager(editorConfig.persistence_manager);
        this.loadButtonInputId = pluginConfig.loadButtonInputId;
        this.saveButtonInputId = pluginConfig.saveButtonInputId;
      }

      /**
       * Start the plugin
       */
      start() {
        // add the modal to the dom on page ready
        $(document).ready(() => {
          $('body').append(this.getLoadModalHtmlContent());
          $('body').append(this.getSaveModalHtmlContent());
        })
      
        // open the load modal
        document.getElementById(this.loadButtonInputId).onclick = (e) => {
          $('#load-modal').replaceWith(this.getLoadModalHtmlContent());
          $('#load-modal').modal('show');
        }

        // open the save modal
        document.getElementById(this.saveButtonInputId).onclick = (e) => {
          $('#save-modal').replaceWith(this.getSaveModalHtmlContent());
          $('#save-modal').modal('show');
        }

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

      /**
       * Check errors on the title before a new save
       */
      getError(title) {
        title = title.trim();
        if (title.length === 0) {
          return 'The title must not be filled';
        }

        let projects = this.persistenceManager.load({});
        for (let i = 0, len = projects.length; i < len; i++) {
          let project = JSON.parse(projects[i]);
          if (project.title === title) {
            return 'This title is already used';
          }
        }

        return null;
      }

      /**
       * Print errors on the modal
       */
      printError(error) {
        $('span.error').replaceWith('<span class="error">'+error+'</span>');
      }

      /**
       * Load a project from his title
       */
      loadProject(title) {
        let project = this.persistenceManager.load({key: title});
        let serializedCanvas = this.serializer.serialize(JSON.parse(project).canvas);
        this.serializer.deserialize(serializedCanvas, this.canvas, () => {
          this.canvas.renderAll();
          $('#load-modal').modal('hide');
        });
      }

      /**
       * Save a project by title
       */
      saveProject(title) {
        let project = this.serializer.serialize({
          'title': title,
          'canvas': this.canvas,
          'date': getCurrentDate()
        });
        this.persistenceManager.persist(project, {key: title});
      }

      /**
       * Get the html content of the save modal
       */
      getSaveModalHtmlContent() {
      
        // get an array with all stringified projects
        let projects = this.persistenceManager.load({});

        /**
         * Template string for the save modal (ES6 feature)
         *
         * This function add the list of projects to override a save
         */
        function saveModalHTML(templateData) {
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
                  '<td><button type="button" class="override-save-button btn btn-default" data-project="' + project.title + '">Save</button></td>' +
                '</tr>'
              ;
            }
            html += '</table>';
            string = string.replace('No project already saved', html);

            return string;
          } else {
            return string;
          }
        }

        return saveModalHTML`
          <div class="modal fade" id="save-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Save your project</h4>
                </div>
                <div class="modal-body">
                    <div class="save-list">
                      <strong>Override a save</strong></br>
                      No project already saved
                    </div>
                    </br>
                    <div class="new-save-block">
                      <strong>New save</strong></br>
                      <input id="new-project-title" type="text" placeholder="Your title goes here.."/>
                      <button id="new-save-button" type="button" class="btn btn-primary">Save</button>
                      <span class="error"></span>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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

        // get an array with all stringified projects
        let projects = this.persistenceManager.load({});

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
                  '<td><button type="button" class="load-button btn btn-default" data-project="' + project.title + '">Open</button></td>' +
                '</tr>'
              ;
            }
            html += '</table>';
            string = string.replace('No projects to load', html);

            return string;
          } else {
            return string;
          }
        }

        return loadModalHTML`
          <div class="modal fade" id="load-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Load a project</h4>
                </div>
                <div class="modal-body">
                  No projects to load
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
);
