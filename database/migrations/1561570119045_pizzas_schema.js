'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PizzasSchema extends Schema {
  up () {
    this.create('pizzas', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('image', 254).notNullable()
      table.text('about').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pizzas')
  }
}

module.exports = PizzasSchema
