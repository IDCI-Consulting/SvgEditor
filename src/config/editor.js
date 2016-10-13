/**
 * Editor configuration
 */
define(function () {
  return {
    'persistence_manager': 'local_storage',
    'local_storage_prefix': 'svg_editor_',
    'serializer': 'json',

    // handles settings
    'corner_shift': 'middle', // middle, in or out
    'corner_size': 15,
    'transparent_corners': true,
    'corner_color': '#000000',
    'border_color': '#000000',

    // manual save labels default
    'manual_save': {
      'labels': {
        'save': 'Save',
        'save_this_project': 'Save this project',
        'new_save': 'New save',
        'override_save': 'Override',
        'no_save_already': 'No save already',
        'new_save_placeholder': 'Your title here...',
        'load_project': 'Load a project',
        'nothing_to_load': 'No projects to load',
        'load': 'Load',
        'close': 'Close',
        'title_already_used': 'This title is already used',
        'title_not_blank': 'The title cannot be blank'
      }
    }
  };
});
