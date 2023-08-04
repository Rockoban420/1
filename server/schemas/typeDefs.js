const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Todo {
    _id: ID
    todoText: String
    todoAuthor: String
    todoCompleted: Boolean
}

type Query {
    todos: [Todo]
    todo(_id: ID!): Todo
}

type Mutation {
    addTodo(todoText: String!, todoAuthor: String!): Todo
    updateTodoText(_id: ID!, todoText: String!): Todo
    updateTodoAuthor(_id: ID!, todoAuthor: String!): Todo
    updateTodoCompleted(_id: ID!, todoCompleted: Boolean!): Todo
    removeTodoById(_id: ID!): Todo
}
`;

module.exports = typeDefs;