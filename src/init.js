requirejs(['./class/SvgEditor'], function(SvgEditor) {
  try {
    let editor = new SvgEditor();
    editor.init();
    editor.triggerReadyFunction();
  } catch(e) {
    console.error('The editor failed to start: ' + e.message);
  }
});
