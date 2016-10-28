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

    // cursor settings
    'hoverCursor': 'move',
    'moveCursor': 'move',
    'defaultCursor': 'default',
    'freeDrawingCursor': 'crosshair',
    'rotationCursor': 'crosshair',

    // manual save default labels
    'auto_save': {
      'enable': false
    },
    'auto_image_resizer': {
      'enable': false
    },
    'remove_object': {
      'enable': false
    },
    'color_picker': {
      'enable': false
    },
    'image_drag_and_drop': {
      'enable': false
    },
    'image_loader': {
      'enable': false
    },
    'image_flipper': {
      'enable_horizontal_flip': false,
      'enable_vertical_flip': false
    },
    'keyboard_listener': {
      'enable_delete_object': false,
      'enable_move_object': false
    },
    'output_area': {
      'enable': false
    },
    'object_resizer': {
      'enable': true
    },
    'manual_save': {
      'enable': false,
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
        'title_not_blank': 'The title cannot be blank',
        'delete': 'Delete'
      }
    }
  };
});
