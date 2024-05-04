const mongoose = require('mongoose');
const { OrderModel, CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');

//Dealing with data base operations
class ShoppingRepository {

    async Orders(userId) {

        const orders = await OrderModel.find({ userId });

        return orders;

    }

    async Cart(userId) {

        const cartItems = await CartModel.find({ userId: userId });


        if (cartItems) {
            return cartItems;
        }

        throw new Error('Data Not found!');
    }

    async AddCartItem(userId, item, qty, isRemove) {

        // return await CartModel.deleteMany();

        const cart = await CartModel.findOne({ userId: userId })

        const { _id } = item;

        if (cart) {

            let isExist = false;

            let cartItems = cart.items;


            if (cartItems.length > 0) {

                cartItems.map(item => {

                    if (item.course._id.toString() === _id.toString()) {
                        if (isRemove) {
                            cartItems.splice(cartItems.indexOf(item), 1);
                        } else {
                            item.unit = qty;
                        }
                        isExist = true;
                    }
                });
            }

            if (!isExist && !isRemove) {
                cartItems.push({ course: { ...item }, unit: qty });
            }

            cart.items = cartItems;

            return await cart.save()

        } else {

            return await CartModel.create({
                userId,
                items: [{ course: { ...item }, unit: qty }]
            })
        }


    }

    async CreateNewOrder(userId, txnId) {

        //required to verify payment through TxnId

        const cart = await CartModel.findOne({ userId: userId })

        if (cart) {

            let amount = 0;

            let cartItems = cart.items;

            if (cartItems.length > 0) {
                //process Order

                cartItems.map(item => {
                    amount += parseInt(item.course.price) * parseInt(item.unit);
                });

                const orderId = uuidv4();

                const order = new OrderModel({
                    orderId,
                    userId,
                    amount,
                    status: 'received',
                    items: cartItems
                })

                cart.items = [];

                const orderResult = await order.save();
                await cart.save();
                return orderResult;


            }



        }

        return {}
    }

}

module.exports = ShoppingRepository;
