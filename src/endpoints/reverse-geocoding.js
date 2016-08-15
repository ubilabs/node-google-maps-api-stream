import mapsUtils from '../maps-utils';

const ReverseGeocoding = mapsUtils.createApi(mapsApi =>
  (query, done) => mapsApi.reverseGeocode(query, done));

export {ReverseGeocoding};
