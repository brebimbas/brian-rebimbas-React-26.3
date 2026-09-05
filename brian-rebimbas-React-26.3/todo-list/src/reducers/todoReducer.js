export const TODO_ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",

  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FILTERS: "RESET_FILTER",
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdAt",
  sortDirection: "asc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: "",
      };
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {};
    case TODO_ACTIONS.FETCH_ERROR:
      return {};

    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        id: Date.now(),
        title: title,
        isCompleted: false,
      };
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {};
    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {};

    case TODO_ACTIONS.SET_SORT:
      return {};
    case TODO_ACTIONS.SET_FILTER:
      return {};
    case TODO_ACTIONS.CLEAR_ERROR:
      return {};
    case TODO_ACTIONS.RESET_FILTERS:
      return {};

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
