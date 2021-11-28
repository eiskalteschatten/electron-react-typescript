import { Action } from 'redux';

import {
  SET_PLATFORM,
} from './actionTypes';

interface SetPlatform extends Action<typeof SET_PLATFORM> {
  platform: string;
}

export type Actions =
  SetPlatform;

export const setPlatform = (platform: string): SetPlatform => ({ type: SET_PLATFORM, platform });
