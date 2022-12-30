import * as ActionTypes from "../ActionType";
import { createSlice } from "@reduxjs/toolkit";
let id = 0;

const Reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.add:
      return [
        ...state,
        {
          id: ++id,
          task: action.payload.task,
          completed: true,
        },
      ];
    case ActionTypes.remove:
      return state.filter((data) => data.id !== action.payload.id);

    case ActionTypes.update:
      return state.map((data) =>
        data.id === action.payload.id
          ? { ...data, completed: action.payload.completed }
          : data
      );
    default:
      return state;
  }
};

export default Reducer;
