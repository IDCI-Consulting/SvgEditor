/**
 * SvgColorator module
 */
define(function () {

  return class SvgColorator {

    /**
     * Color a canvas object (it should be a svg)
     */
    static color(canvasObject, color) {

      function isWhite(color) {
        return (
          color === 'rgb(255,255,255)' ||
          color === '#fff' ||
          color === '#ffffff' ||
          color === '#FFFFFF' ||
          color === '#FFF' ||
          color === null ||
          color === ''
        );
      }

      if (!canvasObject.paths) {
        canvasObject.setFill(color);
      } else if (canvasObject.paths) {
        for (var i = 0; i < canvasObject.paths.length; i++) {
          let path = canvasObject.paths[i];

          if (!isWhite(path.fill) || true === path.fillColored) {
            path.fill = color;
            path.fillColored = true;
          }

          if (!isWhite(path.stroke) || true === path.strokeColored) {
            path.stroke = color;
            path.strokeColored = true;
          }
        }
      }
    }
  }

});
