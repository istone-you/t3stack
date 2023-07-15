import useStore from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTasks = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditTask);

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData([res, ...previousTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
