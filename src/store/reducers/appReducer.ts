import { Reducer } from 'redux';

import { AppActions } from '../actions/appActions';

export interface AppState {
  platform: string;
}

export const initialState: AppState = {
  platform: ''
};

const appReducer: Reducer<AppState, AppActions> = (
  state: AppState = initialState,
  action: AppActions
): any => {
  switch (action.type) {
    case 'APP_PLATFORM':
      return {
        ...state,
        platform: action.platform
      };
    default:
      return state;
  }
};

export default appReducer;
