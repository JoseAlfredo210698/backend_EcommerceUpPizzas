'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/pizzas', 'PizzaController.getPizzas')
Route.post('/pizza', 'PizzaController.createPizza')
Route.post('/pizza/ingredients', 'PizzaController.createPizzaIngredients')
Route.post('/order', 'OrderController.toOrder')
Route.get('/order', 'OrderController.getOrders')




