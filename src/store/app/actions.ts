import { Action } from 'redux';

import {
  SET_PLATFORM,
  SET_PREFERS_DARK_MODE,
} from './actionTypes';

interface SetPlatform extends Action<typeof SET_PLATFORM> {
  platform: string;
}

interface SetPrefersDarkMode extends Action<typeof SET_PREFERS_DARK_MODE> {
  prefersDarkMode: boolean;
}

export type Actions =
  SetPlatform |
  SetPrefersDarkMode;

export const setPlatform = (platform: string): SetPlatform => ({ type: SET_PLATFORM, platform });
export const setPrefersDarkMode = (prefersDarkMode: boolean): SetPrefersDarkMode => ({ type: SET_PREFERS_DARK_MODE, prefersDarkMode });
