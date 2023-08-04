const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
    todoText: {
        type: String,
        required: true,
        trim: true
    },
    todoAuthor: {
        type: String,
        required: true,
        trim: true
    },
    todoCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;