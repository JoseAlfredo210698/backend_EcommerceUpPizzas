'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('phone', 15).notNullable()
      table.string('email', 100).notNullable()
      table.text('address').notNullable()
      table.text('references', 80).notNullable()
      table.text('orders').notNullable()
      table.string('token_card', 254).notNullable()
      table.string('type_card', 10).notNullable()
      table.double('total').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
