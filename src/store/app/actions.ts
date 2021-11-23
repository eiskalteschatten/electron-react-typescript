import { Action } from 'redux';

import {
  SET_PLATFORM,
} from './constants';

export interface AppSetPlatform extends Action<typeof SET_PLATFORM> {
  platform: string;
}

export type Actions = AppSetPlatform;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: SET_PLATFORM, platform });
