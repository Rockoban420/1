import { gql } from '@apollo/client';

export const ADD_TODO = gql`
mutation Mutation($todoText: String!, $todoAuthor: String!) {
    addTodo(todoText: $todoText, todoAuthor: $todoAuthor) {
      todoAuthor
      todoText
    }
  }
`;

export const UPDATE_TODO_COMPLETED = gql`
mutation Mutation($id: ID!, $todoCompleted: Boolean!) {
    updateTodoCompleted(_id: $id, todoCompleted: $todoCompleted) {
      _id
      todoCompleted
    }
  }
`;