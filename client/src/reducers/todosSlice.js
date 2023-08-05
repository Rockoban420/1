import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'todosSlice',
    initialState: INITIAL_STATE,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            const filteredState = state.todos.filter(todo => todo._id !== action.payload);
            state.todos = filteredState;
        },
        completeTodo: (state, action) => {
            const todo = state.todos.find(todo => todo._id === action.payload);
            todo.todoCompleted = !todo.todoCompleted;
        },
        clearTodos: (state) => {
            state.todos = [];
        }
    }
});

export const { 
    addTodo,
    deleteTodo,
    completeTodo,
    clearTodos
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;