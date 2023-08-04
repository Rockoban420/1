import { gql } from '@apollo/client';

export const GET_TODOS = gql`
query Query {
    todos {
      _id
      todoCompleted
      todoAuthor
      todoText
    }
  }
`;
