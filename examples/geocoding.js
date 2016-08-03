import {Geocoding} from '../src/index';

const geocoder = new Geocoding({
  googleMaps: {
    key: 'your-key'
  },
  cacheFile: 'geocache.db'
});

geocoder.on('data', data => console.log(data));
geocoder.on('end', () => console.log('end'));

geocoder.write('Hamburg, Germany');
geocoder.write('Las Vegas');
geocoder.end();
