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
        // open the load modal
        document.getElementById(this.loadButtonInputId).onclick = (e) => {
          $("body").append(this.getLoadModalHtmlContent());
          $('#load-modal').modal('show');
        }

        // open the save modal
        document.getElementById(this.saveButtonInputId).onclick = (e) => {
          $("body").append(this.getSaveModalHtmlContent());
          $('#save-modal').modal('show');
        }

        // save as a new project
        $(document).on('click', "#new-save-button", event => {
          let title = document.getElementById('new-project-title').value;
          if (title.length > 0) {
            let project = this.serializer.serialize({
              'title': title,
              'canvas': this.canvas,
              'date': this.getCurrentDate()
            });
            this.persistenceManager.persist(project, {key: title});
            $('#save-modal').modal('hide');
          }
        });

        // override a saved project
      }

      /**
       * Get the html content of the save modal
       */
      getSaveModalHtmlContent() {
        return `
          <!-- modal to save projects -->
          <div class="modal fade" id="save-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Save your project</h4>
                </div>
                <div class="modal-body">
                    <strong>New save</strong>
                    <input id="new-project-title" type="text" placeholder="Your title goes here.."/>
                    <button id="new-save-button" type="button" class="btn btn-primary">Save</button>
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

        let projects = this.persistenceManager.load({});
        function loadModalHTML(templateData) {
          let string = templateData[0];
          let len = projects.length;
          if (len > 0) {
            let html = '<ul>'
            for (let i = 0; i < len; i++) {
              let project = JSON.parse(projects[i]);
              html += '<li>' + project.title + ' - ' + project.date + '</li>';
            }
            html += '</ul>';
            return string.replace("No projects to load", html);
          } else {
            return string;
          }
        }

        return loadModalHTML`
          <!-- modal to load saved projects -->
          <div class="modal fade" id="load-modal" tabindex="-1" role="dialog" aria-labelledby="modalLoad">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                  No projects to load
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      

      getCurrentDate() {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        return day + "/" + month + "/" + year + ' ' + hours + 'h' + minutes;
      }
      

    }
  }
);
