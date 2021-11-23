import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { appSetPlatform } from '../store/app/actions';

window.api.on('appSetPlatform', (e: IpcRendererEvent, platform: string): any =>
  dispatch(appSetPlatform(platform)));

