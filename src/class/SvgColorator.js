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
          color === '#FFF'
        );
      }

      if (canvasObject.isSameColor && canvasObject.isSameColor() || !canvasObject.paths) {
        canvasObject.setFill(color);
      } else if (canvasObject.paths) {
        for (var i = 0; i < canvasObject.paths.length; i++) {
          let path = canvasObject.paths[i];
          let filledColor = canvasObject.paths[i].fill;
          if (!isWhite(filledColor) || true === path.colored) {
            path.setFill(color);
            path.colored = true;
          }
        }
      }
    }

  }

});
