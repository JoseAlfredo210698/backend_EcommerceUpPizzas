'use strict'

const Pizza = use('App/Models/Pizza')
const Ingredient = use('App/Models/Ingredient')
const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pizzas
 */
class PizzaController {

  async getPizzas({ response }) {
    const pizzas = await Pizza.query().with('ingredients').fetch()
    response.send(pizzas)
  }


  async createPizza({ request, response }) {
    const dataPizza = request.only(['name', 'image', 'about'])
    const rules = {
      name: 'required',
      image: 'required',
      about: 'required',
    }

    const validation = await validate(dataPizza, rules)
    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        result: validation.messages() || []
      })
    }


    const pizza = await Pizza.create(dataPizza)
    return response.status(201).json({
      status: 201,
      result: pizza || []
    })
  }

  async createPizzaIngredients({ request, response }) {
    const ingredients = request.only(['pizza_id', 'ingredients', 'size', 'price'])
    const rules = {
      pizza_id: 'required|exists:pizzas,id',
      ingredients: 'required',
      size: 'required',
      price: 'required',
    }

    const validation = await validate(ingredients, rules)
    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        result: validation.messages() || []
      })
    }

    const ingredient = await Ingredient.create(ingredients)
    return response.status(201).json({
      status: 201,
      result: ingredient || []
    })
  }


}

module.exports = PizzaController
