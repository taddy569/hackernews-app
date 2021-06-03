export const asyncRemoveTodoAPI = (todo = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: todo }), 3000);
  });
};
