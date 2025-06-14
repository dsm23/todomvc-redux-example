import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

interface TodoState {
  value: Todo[];
}

const initialState = {
  value: [
    {
      text: "Use Redux",
      completed: false,
      id: 0,
    },
  ],
} satisfies TodoState as TodoState;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Pick<Todo, "text">>) {
      state.value.push({
        id:
          state.value.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.payload.text,
      });
    },
    deleteTodo(state, action: PayloadAction<Pick<Todo, "id">>) {
      state.value.splice(
        state.value.findIndex((todo) => todo.id === action.payload.id),
        1,
      );
    },
    editTodo(state, action: PayloadAction<Pick<Todo, "id" | "text">>) {
      for (const todo of state.value) {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.text;
        }
      }
    },
    completeTodo(state, action: PayloadAction<Pick<Todo, "id">>) {
      for (const todo of state.value) {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
        }
      }
    },
    completeAllTodos(state) {
      const areAllMarked = state.value.every((todo) => todo.completed);

      for (const todo of state.value) {
        todo.completed = !areAllMarked;
      }
    },
    clearCompleted(state) {
      state.value = state.value.filter((todo) => todo.completed === false);
    },
  },
  selectors: {
    getTodos: (state) => state.value,
  },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAllTodos,
  clearCompleted,
} = todosSlice.actions;

export const { getTodos } = todosSlice.selectors;

export default todosSlice.reducer;
