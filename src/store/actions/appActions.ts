import { Action } from 'redux';

import {
  APP_PLATFORM,
} from '../constants';

export interface AppSetPlatform extends Action<typeof APP_PLATFORM> {
  platform: string;
}

export type AppActions = AppSetPlatform;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: APP_PLATFORM, platform });
