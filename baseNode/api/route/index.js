const userController = require('../controller/index');


const Routes = (app) =>{
    app.route("/item/deleteOne")
    .delete(userController.deleteOneItem)
    app.route("/item")
    .get(userController.getItem)
    .post(userController.addItem)
    app.route("/item/:id")
    .delete(userController.deleteItem)
    .put(userController.updateItem)
    app.route("/item/paginate")
    .get(userController.paginateItem)
    app.route("/item/search")
    .get(userController.searchItem)
}

module.exports = Routes