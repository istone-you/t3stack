import { create } from "zustand";
import { UpdateTaskInput } from "../schema/todo";

type State = {
  editTask: UpdateTaskInput;
  updateEditTask: (payload: UpdateTaskInput) => void;
  resetEditTask: () => void;
};

const useStore = create<State>((set) => ({
  editTask: { taskId: "", title: "", body: "" },
  updateEditTask: (payload) => set({ editTask: payload }),
  resetEditTask: () => set({ editTask: { taskId: "", title: "", body: "" } }),
}));

export default useStore;
