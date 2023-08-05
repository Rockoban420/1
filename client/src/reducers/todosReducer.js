import { ADD_TODO, DELETE_TODO, COMPLETE_TODO, CLEAR_TODOS } from '../actions/todoActionTypes';

const INITIAL_STATE = {
    todos: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            };
        case COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo._id === action.payload) {
                        todo.todoCompleted = !todo.todoCompleted;
                    }
                    return todo;
                }
                )
            };
        case CLEAR_TODOS:
            return {
                INITIAL_STATE
            };
        default:
            return state;
        }
}
