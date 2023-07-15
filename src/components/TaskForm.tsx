import { FormEvent } from "react";
import useStore from "../store";
import { useMutateTasks } from "../hooks/useMutateTasks";

export const TaskForm = () => {
  const { createTaskMutation, updateTaskMutation } = useMutateTasks();
  const { editTask } = useStore();
  const update = useStore((state) => state.updateEditTask);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTask.taskId === "") {
      createTaskMutation.mutate({
        title: editTask.title,
        body: editTask.body,
      });
    } else {
      updateTaskMutation.mutate({
        taskId: editTask.taskId,
        title: editTask.title,
        body: editTask.body,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(updateTaskMutation.isLoading || createTaskMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      <input
        type="text"
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="Title"
        value={editTask.title || ""}
        onChange={(e) => update({ ...editTask, title: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.title}
      </p>
      <textarea
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="Body"
        value={editTask.body || ""}
        onChange={(e) => update({ ...editTask, body: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.body}
      </p>
      <button className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700 focus:outline-none">
        {editTask.taskId === "" ? "Create" : "Update"}
      </button>
    </form>
  );
};
