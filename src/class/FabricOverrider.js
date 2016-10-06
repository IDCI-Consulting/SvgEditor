/**
 * FabricOverride module
 */
define(function () {

  return class FabricOverrider {

    /**
     * Override the fabric object
     */
    static override(fabric, config) {
      fabric.Object.prototype.set({
        transparentCorners: config.transparent_corners,
        borderColor: config.border_color,
        cornerColor: config.corner_color,
        cornerSize: config.corner_size,

        /**
         * Draws corners of an object's bounding box.
         * Requires public properties: width, height
         * Requires public options: cornerSize, padding
         * @param {CanvasRenderingContext2D} ctx Context to draw on
         * @return {fabric.Object} thisArg
         * @chainable
         */
        drawControls: function(ctx) {
          let shift;
          switch(config.corner_shift) {
            case 'out':
              shift = -config.corner_size/2;
              break;
            case 'in':
              shift = config.corner_size/2;
              break;
            default:
              shift = 0;
          }

          if (!this.hasControls) {
            return this;
          }
          var wh = this._calculateCurrentDimensions(),
              width = wh.x,
              height = wh.y,
              scaleOffset = this.cornerSize,
              left = -(width + scaleOffset) / 2,
              top = -(height + scaleOffset) / 2,
              methodName = this.transparentCorners ? 'stroke' : 'fill';
          ctx.save();
          ctx.strokeStyle = ctx.fillStyle = this.cornerColor;
          if (!this.transparentCorners) {
            ctx.strokeStyle = this.cornerStrokeColor;
          }
          this._setLineDash(ctx, this.cornerDashArray, null);
          // top-left
          this._drawControl('tl', ctx, methodName,
            left + shift,
            top + shift);
          // top-right
          this._drawControl('tr', ctx, methodName,
            left + width - shift,
            top + shift);
          // bottom-left
          this._drawControl('bl', ctx, methodName,
            left + shift,
            top + height - shift);
          // bottom-right
          this._drawControl('br', ctx, methodName,
            left + width - shift,
            top + height - shift);
          if (!this.get('lockUniScaling')) {
            // middle-top
            this._drawControl('mt', ctx, methodName,
              left + width/2,
              top + shift);
            // middle-bottom
            this._drawControl('mb', ctx, methodName,
              left + width/2,
              top + height - shift);
            // middle-right
            this._drawControl('mr', ctx, methodName,
              left + width - shift,
              top + height/2);
            // middle-left
            this._drawControl('ml', ctx, methodName,
              left + shift,
              top + height/2);
          }
          // middle-top-rotate
          if (this.hasRotatingPoint) {
            this._drawControl('mtr', ctx, methodName,
              left + width / 2,
              top - this.rotatingPointOffset);
          }
          ctx.restore();
          return this;
        }
      });
    }
  }
});
