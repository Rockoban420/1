import React, { useEffect, useState } from 'react';
import { 
    useSelector,
    useDispatch
 } from "react-redux";
import { 
    addTodo,
    deleteTodo,
    completeTodo,
    clearTodos
} from "../reducers/todosSlice";
import { 
    useQuery,
    useMutation
} from '@apollo/client';
import { GET_TODOS } from '../utils/queries';
import { 
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO_COMPLETED,
} from '../utils/mutations';

export const TodoApp = () => {

    const [todo, setTodo] = useState('');

    const { loading, error, data } = useQuery(GET_TODOS);

    const [mutAddTodo] = useMutation(ADD_TODO, {
        refetchQueries: [{ query: GET_TODOS }]
    });

    const [deleteTodoDatabase, ddata ] = useMutation(DELETE_TODO);

    const [updateTodoCompleted, udata ] = useMutation(UPDATE_TODO_COMPLETED);

    const dispatch = useDispatch();

    const { todos } = useSelector(({ todos }) => todos);

    useEffect(() => {
        if (loading) return;
        dispatch(clearTodos());
        for (const todo in data.todos) {
        console.log(data.todos[todo]);
        dispatch(addTodo({todo: data.todos[todo].todoText, todoCompleted: data.todos[todo].todoCompleted, _id: data.todos[todo]._id}));
        }
    }
    , [data]);

    const handleChange = e => setTodo(e.target.value);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    console.log(todos);
    return (
        <div>
        <h1>Todo App</h1>
        <ul>
            {
                todos.map((todo, i) => (
                    <div>
                    <li key={todo._id} id={todo._id}>{todo.todo}</li>
                    <li>
                        {todo.todoCompleted ? 'Completed' : 'Not Completed'}
                    </li>
                    <button
                        onClick={() => {
                        dispatch(deleteTodo(todo._id));
                        deleteTodoDatabase({
                            variables: {
                                id: todo._id
                            }
                        });
                    }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => {
                            dispatch(completeTodo(todo._id));
                            updateTodoCompleted({
                                variables: {
                                    id: todo._id,
                                    todoCompleted: true
                                }
                            });
                        }}
                    >
                        Complete
                    </button>
                    </div>
                ))
            }
        </ul>
            <input 
            type="text" 
            value={todo} 
            onChange={handleChange} 
            />
            <button 
            onClick={() => {
                mutAddTodo({
                    variables: {
                        todoText: todo,
                        todoAuthor: 'me'
                    }
                });
                dispatch(addTodo({todo: todo, todoCompleted: false}));
                setTodo('');
            }}
            >
                Add Todo
            </button>
        </div>
    );
    }