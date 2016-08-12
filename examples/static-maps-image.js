/* eslint-disable no-console */
import fs from 'fs';
import {StaticMapsImage} from '../src/index';

const staticMaps = new StaticMapsImage({
  googleMaps: {
    key: 'your-key'
  },
  queriesPerSecond: 5,
  cacheFile: null // flat-file-db really wasn't built for caching images
});

staticMaps.on('data', data => {
  if (data.error) {
    console.error('ERROR:', data.error);
    return;
  }

  fs.writeFileSync(`${data.stats.current}.jpg`, data.response, 'binary');
});
staticMaps.on('end', () => console.log('end'));

staticMaps.write({
  center: '53.5610771,9.9569145',
  format: 'jpg',
  zoom: 15,
  size: '640x640'
});
staticMaps.end();
