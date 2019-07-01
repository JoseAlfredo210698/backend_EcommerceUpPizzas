'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pizza extends Model {
    ingredients() {
        return this.hasMany('App/Models/Ingredient')
    }
}

module.exports = Pizza
