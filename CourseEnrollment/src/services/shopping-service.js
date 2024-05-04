const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {

    constructor() {
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }) {

        const cartItems = await this.repository.Cart(_id);
        return FormateData(cartItems);
    }


    async PlaceOrder(userInput) {

        const { _id, txnNumber } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);

        return FormateData(orderResult);
    }

    async GetOrders(userId) {

        const orders = await this.repository.Orders(userId);
        return FormateData(orders)
    }

    async GetOrderDetails({ _id, orderId }) {
        const orders = await this.repository.Orders(productId);
        return FormateData(orders)
    }

    async ManageCart(userId, item, qty, isRemove) {

        const cartResult = await this.repository.AddCartItem(userId, item, qty, isRemove);
        return FormateData(cartResult);
    }


    async SubscribeEvents(payload) {

        payload = JSON.parse(payload);
        const { event, data } = payload;
        const { userId, course, qty } = data;

        switch (event) {
            case 'ADD_TO_CART':
                this.ManageCart(userId, course, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, course, qty, true);
                break;
            default:
                break;
        }

    }


    async GetOrderPayload(userId, order, event) {

        if (order) {
            const payload = {
                event: event,
                data: { userId, order }
            };

            return payload
        } else {
            return FormateData({ error: 'No Order Available' });
        }

    }



}

module.exports = ShoppingService;
