import { Reducer } from 'redux';

import { Actions } from './actions';
import { State, initialState } from './state';

import {
  SET_PLATFORM,
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
    default:
      return state;
  }
};

export default reducer;
