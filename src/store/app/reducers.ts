import { Reducer } from 'redux';

import { Actions } from './actions';

import {
  SET_PLATFORM,
} from './constants';

export interface AppState {
  platform: string;
}

export const initialState: AppState = {
  platform: '',
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
    default:
      return state;
  }
};

export default reducer;
