import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageData, updateLocalStorage } from "../utils/localStorage";


const TASK_LIST_KEY = "taskList";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "complete";
  dueDate?: string; 
}

interface TaskState {
  filterStatus: "all" | "pending" | "complete";
  taskList: Task[];
}

const initialState: TaskState = {
  filterStatus: "all",
  taskList: (getLocalStorageData(TASK_LIST_KEY) as Task[]) || [],
};
// console.log("localSte:", initialState.taskList);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = { ...action.payload };
      state.taskList.push(newTask);
      updateLocalStorage(TASK_LIST_KEY, state.taskList);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      updateLocalStorage(TASK_LIST_KEY, state.taskList); 
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      updateLocalStorage(TASK_LIST_KEY, state.taskList);
    },
    updateFilterStatus: (
      state,
      action: PayloadAction<"all" | "pending" | "complete">
    ) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, updateFilterStatus } =
  taskSlice.actions;
export default taskSlice.reducer;
