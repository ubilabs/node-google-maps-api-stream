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
        }, GoogleMaps),
        instance = new APIClass( // eslint-disable-line no-unused-vars
          defaultOptions);
    });

    it('should return the return value of `createGenericAPI`', () => {
      const endpoint = helpers.getMockEndpoint().endpoint,
        returnValue = 'create API return value',
        createApi = () => returnValue,
        APIClass = mapsUtils.createApi(endpoint, GoogleMaps, createApi);

      expect(APIClass).to.equal(returnValue);
    });

    describe('The created class', () => {
      it('should throw an error if no login details are provided', () => {
        const endpoint = helpers.getMockEndpoint().endpoint,
          APIClass = mapsUtils.createApi(endpoint);

        expect(() => {
          new APIClass(); // eslint-disable-line no-new
        }).to.throw('Must either provide credentials or API key');
      });

      it('should throw an error if private key but no client ID is provided',
        () => {
          const endpoint = helpers.getMockEndpoint().endpoint,
            APIClass = mapsUtils.createApi(endpoint);

          expect(() => {
            new APIClass({ // eslint-disable-line no-new
              googleMaps: {
                google_client_id: 'some id' // eslint-disable-line camelcase
              }
            });
          }).to.throw('Missing google_private_key');
        }
      );

      it('should throw an error if client ID but no private key is provided',
        () => {
          const endpoint = helpers.getMockEndpoint().endpoint,
            APIClass = mapsUtils.createApi(endpoint);

          expect(() => {
            new APIClass({ // eslint-disable-line no-new
              googleMaps: {
                google_private_key: 'some key' // eslint-disable-line camelcase
              }
            });
          }).to.throw('Missing google_client_id');
        }
      );

      it('should throw an error if both credentials & API key are provided',
        () => {
          const endpoint = helpers.getMockEndpoint().endpoint,
            APIClass = mapsUtils.createApi(endpoint);

          expect(() => {
            new APIClass({ // eslint-disable-line no-new
              googleMaps: {
                google_private_key: 'some key', // eslint-disable-line camelcase
                google_client_id: 'some id', // eslint-disable-line camelcase
                key: 'some key'
              }
            });
          }).to.throw('Can only specify credentials or API key');
        }
      );
    });
  });
});
