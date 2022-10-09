import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setPlatform } from '../store/entities/app';

window.api.on('setPlatform', (e: IpcRendererEvent, platform: string) => {
  dispatch(setPlatform(platform));
});

