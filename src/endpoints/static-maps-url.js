import mapsUtils from '../maps-utils';

const StaticMapsURL = mapsUtils.createApi(mapsApi =>
  (query, done) => done(null, mapsApi.staticMap(query)));

export {StaticMapsURL};
