var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

const privateKey = process.env.JWT_PRIVATE_KEY; 

router.use(function(req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, { algorithms: ['RS256'] })
        } catch (error) {
            return res.status(401).json({"error": error.message})
        }
    } else {
        return res.status(401).json({"error": "Unauthorized"})
    }
    next()
})

router.get('/', async function(req, res, next) {
    const todos = await Todo.find().where('author').equals(req.payload.id).exec()
    return res.status(200).json({"todos": todos})
})

router.get('/:todoId', async function(req, res, next) {
    const todo = await Todo.findOne().where('_id').equals(req.params.todoId).exec()
    return res.status(200).json({"todo": todo})
})

router.patch('/:todoId', async function (req, res, next) {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, {
        "isComplete": req.body.isComplete,
        "dateCompleted": req.body.dateCompleted
    }).exec()
    return res.status(200).json({"todo": todo})
})

router.delete('/:todoId', async function (req, res, next) {
    const todo = await Todo.findByIdAndDelete(req.params.todoId).exec()
    return res.status(200).json({"todo": todo})
})

router.post('/', async function (req, res) {
    const todo = new Todo({
        "title": req.body.title,
        "content": req.body.content,
        "dateCreated": req.body.dateCreated,
        "isComplete": req.body.isComplete,
        "dateCompleted": req.body.dateCompleted,
        "author": req.payload.id
    })

    await todo.save().then( savedTodo => {
        return res.status(201).json({
            "_id": savedTodo._id,
            "title": savedTodo.title,
            "content": savedTodo.content,
            "dateCreated": savedTodo.dateCreated,
            "isComplete": savedTodo.isComplete,
            "dateCompleted": savedTodo.dateCompleted,
            "author": savedTodo.author
        }).catch (error => {
            return res.status(500).json({"error": error.message})
        })
    })
})

module.exports = router