import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo } from "../reducers/todosSlice";
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../utils/queries';
import { ADD_TODO } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export const TodoApp = () => {

    const [todo, setTodo] = useState('');

    const { loading, error, data } = useQuery(GET_TODOS);

    const [mutAddTodo, { mdata }] = useMutation(ADD_TODO);

    const dispatch = useDispatch();

    const { todos } = useSelector(({ todos }) => todos);

    useEffect(() => {
        if (loading) return;
        for (const todo in data.todos) {
        dispatch(addTodo(data.todos[todo].todoText));
        }
    }
    , [data]);

    const handleChange = e => setTodo(e.target.value);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
        <h1>Todo App</h1>
        <ul>
            {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
            ))}
        </ul>
            <input 
            type="text" 
            value={todo} 
            onChange={handleChange} 
            />
            <button 
            onClick={() => {
                dispatch(addTodo(todo));
                mutAddTodo({
                    variables: {
                        todoText: todo,
                        todoAuthor: 'me'
                    }
                });
                setTodo('');
            }}
            >
                Add Todo
            </button>
        </div>
    );
    }