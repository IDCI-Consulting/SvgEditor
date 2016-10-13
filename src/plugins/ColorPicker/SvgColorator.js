/**
 * SvgColorator module
 */
define(function () {

  return class SvgColorator {

    /**
     * Check if a color is white
     *
     * @param color
     * @returns {boolean}
     */
    static isWhite(color) {
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

    /**
     * Color a canvas object (it should be a svg)
     */
    static color(canvasObject, color) {

      if (!canvasObject.paths) {
        canvasObject.setFill(color);
      } else if (canvasObject.paths) {
        for (var i = 0; i < canvasObject.paths.length; i++) {
          let path = canvasObject.paths[i];

          if (!SvgColorator.isWhite(path.fill) || true === path.fillColored) {
            path.fill = color;
            path.fillColored = true;
          }

          if (!SvgColorator.isWhite(path.stroke) || true === path.strokeColored) {
            path.stroke = color;
            path.strokeColored = true;
          }
        }
      }
    }

    /**
     * Format the color in an object with the type of color (ie: hexa or rgb)
     * To be used with jscolor
     *
     * rgb(100,25,33) -> {type: 'rgb', r: 100, g: 25, b:33}
     * #252525 -> {type: 'hexa', value: 252525}
     *
     * @param color
     * @return {}
     */
    static format(color) {
      let hexaRegex = /#([0-9A-F]{6})/;
      let matches = hexaRegex.exec(color);
      if (matches !== null) {
        return {
          'type': 'hexa',
          'value': matches[1]
        }
      }

      let rgbRegex = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
      matches = rgbRegex.exec(color);
      if (matches !== null) {
        return {
          'type': 'rgb',
          'r': matches[1],
          'g': matches[2],
          'b': matches[3]
        }
      }

      console.error('Error formatting color ' + color);

      return null;
    }

    /**
     * Get the color of a canvas object (it should be a svg)
     */
    static getColor(canvasObject) {

      if (!canvasObject.paths) {
        return SvgColorator.format(canvasObject.getFill());
      } else if (canvasObject.paths) {
        for (var i = 0; i < canvasObject.paths.length; i++) {
          let path = canvasObject.paths[i];

          if (!SvgColorator.isWhite(path.fill) || path.fillColored) {
            return SvgColorator.format(path.fill);
          }

          if (!SvgColorator.isWhite(path.stroke) || true === path.strokeColored) {
            return SvgColorator.format(path.stroke);
          }
        }
      }
    }
  }

});
