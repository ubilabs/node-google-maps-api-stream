import mapsUtils from '../maps-utils';

const StaticMapsImage = mapsUtils.createApi(mapsApi =>
  (query, done) => mapsApi.staticMap(query, done));

export {StaticMapsImage};
