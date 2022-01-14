import { Reducer } from 'redux';

import { Actions } from './actions';
import { State, initialState } from './state';

import {
  SET_PLATFORM,
  SET_PREFERS_DARK_MODE,
} from './actionTypes';

const reducer: Reducer<State, Actions> = (
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
