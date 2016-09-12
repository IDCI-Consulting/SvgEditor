/**
 * Abstract serializer module
 */
define(function () {

  return class AbstractSerializer {

    /**
     * Constructor
     */
    constructor() {

      if (this.constructor === AbstractSerializer) {
        throw new TypeError("Cannot construct AbstractSerializer instances directly");
      }

      if (this.serialize === undefined) {
        throw new TypeError("serialize must be implemented");
      }

      if (this.deserialize === undefined) {
        throw new TypeError("deserialize must be implemented");
      }
    }
  }
});
