import mapsUtils from '../maps-utils';

const staticMaps = {
  URL: mapsUtils.createApi(mapsApi =>
    (query, done) => done(null, mapsApi.staticMap(query))),
  Image: mapsUtils.createApi(mapsApi =>
    (query, done) => mapsApi.staticMap(query, done))
};

export {staticMaps};
