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
            const filteredState = state.todos.filter(todo => todo.id !== action.payload);
            state.todos = filteredState;
        },
        completeTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            todo.completed = !todo.completed;
        },
    }
});

export const { 
    addTodo,
    deleteTodo,
    completeTodo,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;