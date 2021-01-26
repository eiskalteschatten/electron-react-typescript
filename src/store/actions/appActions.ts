import {  Action } from 'redux';

export interface AppSetPlatform extends Action<'APP_PLATFORM'> {
  platform: string;
}

export type AppActions = AppSetPlatform;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: 'APP_PLATFORM', platform });
