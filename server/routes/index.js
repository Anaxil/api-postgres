const todosController = require('../controllers').todos;
const todosItemsController = require('../controllers').todosItems;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!'
    }));

    app.get('/api/todos', todosController.list);
    app.post('/api/todos', todosController.create);

    app.post('/api/todos/:todoId/items', todosItemsController.create)
}