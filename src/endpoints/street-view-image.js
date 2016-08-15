import mapsUtils from '../maps-utils';

const StreetViewImage = mapsUtils.createApi(mapsApi =>
  (query, done) => mapsApi.streetView(query, done));

export {StreetViewImage};
