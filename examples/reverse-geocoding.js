/* eslint-disable no-console */
import {ReverseGeocoding} from '../src/index';

const reverseGeocoder = new ReverseGeocoding({
  googleMaps: {
    key: 'AIzaSyBIOxXQoOFsqN14Eucr-EcABjhSauQg2YI'
  },
  cacheFile: 'reverse-geocache.db'
});

reverseGeocoder.on('data',
  data => console.log(JSON.stringify(data, null, ' ')));
reverseGeocoder.on('end', () => console.log('end'));

reverseGeocoder.write({latlng: '53.5610771,9.9569145'});
reverseGeocoder.end();
