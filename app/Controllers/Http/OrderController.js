'use strict'

const Stripe = require('stripe')('sk_test_4QSg1JYxYB7aSY0T1M0dtJFL00GlXhSQ3o')
const Order = use('App/Models/Order')
const { validate } = use('Validator')


class OrderController {


    async getOrders({ response }) {
        const orders = await Order.all()

        return response.status(201).json({
            status: 201,
            orders: orders || []
        })
    }


    async toOrder({ request, response }) {
        const requestPizza = { ...request.only(['userData']).userData, ...request.only(['total']), ...request.only(['orders']) }

        const rules = {
            name: 'required',
            phone: 'required',
            email: 'required|email',
            address: 'required',
            references: 'required',
            orders: 'required',
            token_card: 'required',
            type_card: 'required',
            total: 'required',
        }


        const validation = await validate(requestPizza, rules)

        if (validation.fails()) {
            return response.status(201).json({
                status: 400,
                result: validation.messages() || []
            })
        }

        let namePizzas = ': '
        requestPizza.orders.forEach(element => {
            namePizzas += element.pizza + ', '
        });


        let stripeResponse = await Stripe.customers
            .create({
                email: requestPizza.email,
                description: 'Cliente para ' + requestPizza.email,
                // source: order.userData.tokenCard
            })
            .then((customer) => {
                return Stripe.customers.createSource(customer.id, {
                    source: requestPizza.token_card // obtained with Stripe.js
                });
            })
            .then((source) => {
                return Stripe.charges.create({
                    amount: requestPizza.total * 100,
                    currency: 'usd',
                    customer: source.customer,
                    description: "Compra de pizza" + namePizzas + " en Alfredito's Pizzas."
                });
            })
            .then((charge) => {

                return charge.status
            })
            .catch((err) => {
                console.log(err)

                return response.status(201).json({
                    status: 400,
                    result: err.Error || []
                })
            });

        if (stripeResponse == 'succeeded') {
            requestPizza.orders = JSON.stringify(requestPizza.orders)
            const order = await Order.create(requestPizza)
            return response.status(201).json({
                status: 201,
                result: order || []
            })
        }

        return response.status(400).json({
            status: 400,
            result: 'Error en el pago' || []
        })

    }
}

module.exports = OrderController
