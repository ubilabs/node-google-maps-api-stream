/* eslint-disable no-unused-expressions, max-nested-callbacks */
import {expect} from 'chai';
import mapsUtils from '../src/maps-utils';
import helpers from './lib/helpers';
import GoogleMaps from 'googlemaps';

const defaultOptions = {
  googleMaps: {
    key: 'some google API key'
  }
};

describe('api-utils', () => {
  it('should export a `createApi` function', () => {
    expect(mapsUtils.createApi).to.be.a('function');
  });

  describe('createApi', () => {
    it('should return a class given an endpoint', () => {
      const endpoint = helpers.getMockEndpoint().endpoint;

      expect(mapsUtils.createApi(endpoint)).to.be.a('function');
    });

    it('should pass a Maps API object to the endpoint function', () => {
      const stubs = helpers.getMockEndpoint().stubs,
        APIClass = mapsUtils.createApi(mapsApi => {
          expect(mapsApi).to.be.instanceof(GoogleMaps);
          return stubs;
        }),
        instance = new APIClass( // eslint-disable-line no-unused-vars
          defaultOptions);
    });
  });
});
