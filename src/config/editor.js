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
    'border_color': '#000000'
  };
});
