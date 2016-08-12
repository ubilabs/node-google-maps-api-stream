/* eslint-disable no-console */
import {Geocoding} from '../src/index';

const geocoder = new Geocoding({
  googleMaps: {
    key: 'your-key'
  },
  cacheFile: 'geocache.db'
});

geocoder.on('data', data => console.log(JSON.stringify(data, null, '  ')));
geocoder.on('end', () => console.log('end'));

geocoder.write('Juliusstrasse 25, Hamburg, Germany');
geocoder.end();
