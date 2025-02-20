import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageData, updateLocalStorage } from "../utils/localStorage";

// Constants
const TASK_LIST_KEY = "taskList";

// Task Interface
interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  dueDate?: string; // ✅ Ensure dueDate is included
}

// State Interface
interface TaskState {
  filterStatus: "all" | "pending" | "completed";
  taskList: Task[];
}

const initialState: TaskState = {
  filterStatus: "all",
  taskList: (getLocalStorageData(TASK_LIST_KEY) as Task[]) || [],
};
console.log("Loaded tasks from localStorage:", initialState.taskList);

// this is slice
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
      updateLocalStorage(TASK_LIST_KEY, state.taskList); // ✅ FIXED KEY
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      updateLocalStorage(TASK_LIST_KEY, state.taskList);
    },
    updateFilterStatus: (
      state,
      action: PayloadAction<"all" | "pending" | "completed">
    ) => {
      state.filterStatus = action.payload;
    },
  },
});

// expoort actions and reducer
export const { addTask, updateTask, deleteTask, updateFilterStatus } =
  taskSlice.actions;
export default taskSlice.reducer;
