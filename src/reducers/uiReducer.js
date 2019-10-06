import { TOGGLE_SIDEBAR } from '../actions/types';

const initialState = {
  isSidebarOpened: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened
      };
    default:
      return state;
  }
}
