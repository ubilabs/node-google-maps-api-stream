import GoogleMaps from 'googlemaps';
import {createApi} from 'api-stream';

export default {
  /**
   * Generate a streaming Google Maps API class
   * @param {Function} initialiseEndpoint Endpoint initialisation function
   * @param {Class} GoogleMapsAPI Non-Streaming API interface
   * @param {Function} createGenericAPI Throttled API generator
   * @returns {Class} Streaming Google Maps API class
   **/
  createApi: (initialiseEndpoint,
    GoogleMapsAPI = GoogleMaps,
    createGenericAPI = createApi
  ) => createGenericAPI(options => {
    options = options.googleMaps || {};
    validateOptions(options);

    const queryEndpoint = initialiseEndpoint(new GoogleMapsAPI(options));

    // return an API endpoint for api-stream.createApi
    return (query, done) =>
      queryEndpoint(query, (error, response) => {
        const errorMessage = getError(error, response);
        done(errorMessage, response);
      });
  })
};

/**
 * Validate a Maps API options object
 * This function throws an exception if the options are invalid
 * @param {Object} options The options object to be validated
 **/
function validateOptions(options) {
  if ((options.google_client_id || options.google_private_key) && options.key) {
    throw new Error('Can only specify credentials or API key');
  }

  if (options.google_client_id && !options.google_private_key) {
    throw new Error('Missing google_private_key');
  }

  if (!options.google_client_id && options.google_private_key) {
    throw new Error('Missing google_client_id');
  }

  if (!options.key &&
    !(options.google_client_id && options.google_private_key)
  ) {
    throw new Error('Must either provide credentials or API key');
  }
}

/**
 * Parse error and response to retrieve an error object
 * @param {Object} error Error object returned by the Google Maps API
 * @param {Object} response Response returned by the Google Maps API
 * @returns {Object} an error object if appropriate, or `null`
 **/
function getError(error, response) {
  if (!error && (response.status === 'OK' || !response.status)) {
    return null;
  }

  if (response) {
    return {
      code: response.status,
      message: response.error_message
    };
  }

  // googlemaps seems to return google maps API errors as JSON
  try {
    const parsedMessage = JSON.parse(error.message);
    if (parsedMessage.status) {
      return {
        code: parsedMessage.status,
        message: parsedMessage.error_message
      };
    }
  } catch (e) { // eslint-disable-line no-empty
  }

  // but other errors as normal Error object
  return {
    code: error.code,
    message: error.toString()
  };
}
