const { Todo } = require('../models');

const resolvers = {
    Query: {
        todos: async () => {
            return await Todo.find({});
        },
        todo: async (parent, { _id }) => {
            return await Todo.findById(_id);
        }, 
    },
    Mutation: {
        addTodo: async (parent, args) => {
            const todo = await Todo.create(args);
            return todo;
        },
        updateTodoCompleted: async (parent, { _id, todoCompleted }) => {
            const updatedTodo = await Todo.findByIdAndUpdate(
                _id,
                { todoCompleted },
                { new: true }
            );
            return updatedTodo;
        }
    }
};

module.exports = resolvers;
