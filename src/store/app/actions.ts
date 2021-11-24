import { Action } from 'redux';

import {
  SET_PLATFORM,
  SET_PREFERS_DARK_MODE,
} from './constants';

export interface AppSetPlatform extends Action<typeof SET_PLATFORM> {
  platform: string;
}

export interface AppSetPrefersDarkMode extends Action<typeof SET_PREFERS_DARK_MODE> {
  prefersDarkMode: boolean;
}

export type Actions =
  AppSetPlatform |
  AppSetPrefersDarkMode;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: SET_PLATFORM, platform });
export const appSetPrefersDarkMode = (prefersDarkMode: boolean): AppSetPrefersDarkMode => ({ type: SET_PREFERS_DARK_MODE, prefersDarkMode });
