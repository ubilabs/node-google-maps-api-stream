import mapsUtils from '../maps-utils';

const Geocoding = mapsUtils.createApi(mapsApi =>
  (query, done) => mapsApi.geocode(
    typeof query === 'object' ? query : {address: query},
    done));

export {Geocoding};
