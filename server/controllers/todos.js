const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        console.log(req.body);
        return Todo
            .create({
                title: req.body.title
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    //zwraca tylko listę Todo
    // list(req, res) {
    //     return Todo
    //         .all()
    //         .then(todos => res.status(200).send(todos))
    //         .catch(error => res.status(400).send(error))
    // }

    //zwraca listę Todo z Itemami
    list(req, res) {
        return Todo
            .findAll({
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error.toString()))
    },

    retrieve(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }]
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: 'Todo not found'
                    });
                }
                return res.status(200).send(todo);
            })
            .catch(error => res.status(400).send(error.toString()))
    },

    update(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }]
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo nod found"
                    })
                }
                return todo
                    .update({
                        title: req.body.title || todo.title
                    })
                    .then(() => res.status(200).send(todo))
                    .catch(error => res.status(400).send(error.toString()))
            })
            .catch(error => res.status(400).send(error.toString()))
    },

    delete(req, res) {
        return Todo
            .findById(req.params.todoId)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo nod found"
                    })
                }
                return todo
                    .destroy()
                    .then(() => res.status(200).send(todo))
                    .catch(error => res.status(400).send(error.toString()))
            })
            .catch(error => res.status(400).send(error.toString()))
            .catch(error => res.status(400).send(error.toString()))
    }
}