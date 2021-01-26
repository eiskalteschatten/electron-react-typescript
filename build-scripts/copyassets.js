const path = require('path');
const copyfiles = require('copyfiles');


// These are assets that are used by Electron's main process and are therefore not packed by WebPack.
const assets = [
  ['src/assets/images/icon128.png', 'build/assets/images']
];

for (const asset of assets) {
  const src = path.resolve(__dirname, '../', asset[0]);
  const dest = path.resolve(__dirname, '../', asset[1]);

  copyfiles([src, dest], true, error => {
    if (error) {
      throw error;
    }

    console.log(`${src} was copied to ${dest}`);
  });
}
