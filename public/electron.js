
const { app, BrowserWindow } = require('electron');
const Main = require('../build/main/Main').default;

Main.main(app, BrowserWindow);
