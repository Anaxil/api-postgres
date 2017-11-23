const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return TodoItem
            .create({
                content: req.body.content,
                todoId: req.params.todoId
            })
            .then(todoItem => res.status(200).send(todoItem))
            .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return TodoItem
            .find({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                }
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message: "todoItem nod found"
                    })
                }
                return todoItem
                    //dobram etoda jak mało pól, ale mało wydajna jak jest więcej, można zastąpić przekazaniem obiektu
                    // .update({
                    //     content: req.body.content || todoItem.content,
                    //     complete: req.body.complete || todoItem.complete
                    // })
                    .update(req.body, { fields: Object.keys(req.body)})
                    .then((updatedTodoItem) => res.status(200).send(updatedTodoItem))
                    .catch(error => res.status(400).send(error.toString()))
            })
            .catch(error => res.status(400).send(error.toString()))            
    },

    destroy(req, res) {
        return TodoItem
            .find({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                }
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message: "todoItem nod found"
                    })
                }
                return todoItem
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch(error => res.status(400).send(error.toString()))
            })
            .catch(error => res.status(400).send(error.toString()))            
    }
}