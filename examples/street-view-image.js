/* eslint-disable no-console */
import fs from 'fs';
import {StreetViewImage} from '../src/index';

const streetView = new StreetViewImage({
  googleMaps: {
    key: 'your-key'
  },
  queriesPerSecond: 5,
  cacheFile: null // flat-file-db really wasn't built for caching images
});

streetView.on('data', data => {
  if (data.error) {
    console.error('ERROR:', data.error);
    return;
  }

  fs.writeFileSync(`${data.stats.current}.jpg`, data.response, 'binary');
});
streetView.on('end', () => console.log('end'));

streetView.write({
  location: '51.507868,-0.087689',
  size: '1200x1600',
  heading: 108.4,
  pitch: 7,
  fov: 40,
  format: 'jpg'
});
streetView.end();
