'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IngredientsSchema extends Schema {
  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.integer('pizza_id').unsigned().references('id').inTable('pizzas')
      table.text('ingredients').notNullable()
      table.string('size', 20).notNullable()
      table.double('price').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('ingredients')
  }
}

module.exports = IngredientsSchema
