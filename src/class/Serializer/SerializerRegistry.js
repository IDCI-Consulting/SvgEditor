/**
 * ImageReader module
 */
define(['./JsonSerializer', './SvgSerializer'], function (JsonSerializer, SvgSerializer) {

  return class SerializerRegistry {
 
    /**
     * Constructor
     */
    constructor() {
      this.keySerializerMap = [
        {
          "key": "json",
          "serializer": new JsonSerializer()
        },
        {
          "key": "svg",
          "serializer": new SvgSerializer()
        }
      ];
    }

    /**
     * Guess the serializer for the given key
     */
    guessSerializer(key) {
      for (let i = 0, l = this.keySerializerMap.length; i < l; i++) {
        let keySerializer = this.keySerializerMap[i];
        if (key === keySerializer.key) {
          return keySerializer.serializer;
        }
      }

      throw Error(`No serializer found for key ${key}`);
    }

  }

});
