import { SET_VISIBILITY_FILTER } from "../constants/ActionTypes";
import { SHOW_ALL } from "../constants/TodoFilters";

type Action = Record<string, unknown>;

const visibilityFilter = (state = SHOW_ALL, action: Action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
