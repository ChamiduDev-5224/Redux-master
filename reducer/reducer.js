let id = 0;

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: ++id,
          task: action.payload.task,
          completed: false,
        },
      ];
    case "REMOVE":
      return state.filter((data) => {
        data.id !== action.payload.id;
      });
    default:
      return state;
  }
};

export default reducer;
