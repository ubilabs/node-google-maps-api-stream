import {Directions} from '../src/index';

const directions = new Directions({
  googleMaps: {
    key: 'your-key'
  },
  cacheFile: 'directionscache.db'
});

directions.on('data', data => console.log(JSON.stringify(data, null, '  ')));
directions.on('end', () => console.log('end'));

directions.write({
  origin: '53.5610739,9.9591032',
  destination: 'ABC-Straße 19, 20354 Hamburg'
});
directions.write({
  origin: 'Juliusstrasse 25, Hamburg, Germany',
  destination: 'ABC-Straße 19, 20354 Hamburg'
});
directions.end();
