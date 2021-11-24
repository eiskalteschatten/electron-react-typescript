import { Reducer } from 'redux';

import { Actions } from './actions';

import {
  SET_PLATFORM,
  SET_PREFERS_DARK_MODE,
} from './constants';

export interface AppState {
  platform: string;
  prefersDarkMode: boolean;
}

export const initialState: AppState = {
  platform: '',
  prefersDarkMode: false,
};

const reducer: Reducer<AppState, Actions> = (
  state = initialState,
  action: Actions
): any => {
  switch (action.type) {
    case SET_PLATFORM:
      return {
        ...state,
        platform: action.platform,
      };
    case SET_PREFERS_DARK_MODE:
      return {
        ...state,
        prefersDarkMode: action.prefersDarkMode,
      };
    default:
      return state;
  }
};

export default reducer;
