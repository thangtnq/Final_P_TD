const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TodoSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        dateCreated: {type: Date, required: true}, 
        isComplete: {type: Boolean, required: true},
        dateCompleted: {type: Date, required: false},
        author: {type: Schema.Types.ObjectId, ref: 'User'}
    }
)

module.exports = mongoose.model('Todo', TodoSchema) 