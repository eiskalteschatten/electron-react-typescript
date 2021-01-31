
const { app, BrowserWindow } = require('electron');
const main = require('../build/main').default;

main(app, BrowserWindow);
