import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IpcRendererEvent } from 'electron';

import { appSetPlatform } from './store/actions/appActions';

const { ipcRenderer } = window.require('electron');

const EventsFromMain: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('appSetPlatform', (event: IpcRendererEvent, platform: string): any => dispatch(appSetPlatform(platform)));
  }, [dispatch]);

  return null;
};

export default EventsFromMain;
