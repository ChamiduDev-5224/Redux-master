export const AddTask = (task) => {
  return { type: "ADD", payload: { task: task } };
};
export const RemoveTask = (id) => {
  return { type: "REMOVE", payload: { id } };
};

export const UpdateTask = (id, completed) => {
  return { type: "UPDATE", payload: { id: id, completed: completed } };
};
