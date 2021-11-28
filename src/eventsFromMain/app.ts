import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setPlatform } from '../store/app/actions';

window.api.on('setPlatform', (e: IpcRendererEvent, platform: string): any =>
  dispatch(setPlatform(platform)));

