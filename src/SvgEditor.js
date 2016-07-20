class SvgEditor {
  constructor(canvas, outputArea) {
    this.outputArea = outputArea;
    this.canvas = canvas;
  }

  getCanvas() {
    return this.canvas;
  }

  fillOutput() {
    this.outputArea.value = this.canvas.toSVG();
  }

  startOutputAreaListener() {
    if (this.outputArea.addEventListener) {
      this.outputArea.addEventListener('input', (event) => {
        fabric.loadSVGFromString(event.target.value, (objects, options) => {
          this.canvas.off('after:render');
          this.canvas.clear();
          var obj = fabric.util.groupSVGElements(objects, options);
          this.canvas.add(obj);
          /*for (var i = 0, l = objects.length ; i < l ; i++) {
            var obj = fabric.util.groupSVGElements([objects[i]], options);
            this.canvas.add(obj);
          }*/
          this.canvas.renderAll();
          this.canvas.on('after:render', () => { this.fillOutput() });
        });
      }, false);
    } else if (this.outputArea.attachEvent) {
      this.outputArea.attachEvent('onpropertychange', () => {
        // IE-specific event handling code
      });
    }
  }
}
