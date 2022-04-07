import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setPlatform } from '../store/appSlice';

window.api.on('setPlatform', (e: IpcRendererEvent, platform: string): any =>
  dispatch(setPlatform(platform)));

