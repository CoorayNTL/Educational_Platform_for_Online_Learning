const mongoose = require('mongoose');
const { UserModel, AddressModel } = require('../models');

//Dealing with data base operations
class UserRepository {

    async Createuser({ email, password, phone, salt }) {

        const user = new UserModel({
            email,
            password,
            salt,
            phone,
            address: []
        })

        const userResult = await user.save();
        return userResult;
    }

    async CreateAddress({ _id, street, postalCode, city, country }) {

        const profile = await UserModel.findById(_id);

        if (profile) {

            const newAddress = new AddressModel({
                street,
                postalCode,
                city,
                country
            })

            await newAddress.save();

            profile.address.push(newAddress);
        }

        return await profile.save();
    }

    async Finduser({ email }) {
        const existinguser = await UserModel.findOne({ email: email });
        return existinguser;
    }

    async FinduserById({ id }) {

        const existinguser = await UserModel.findById(id).populate('address');
        // existinguser.cart = [];
        // existinguser.orders = [];
        // existinguser.wishlist = [];

        // await existinguser.save();
        return existinguser;
    }

    async Wishlist(userId) {

        const profile = await UserModel.findById(userId).populate('wishlist');

        return profile.wishlist;
    }

    async AddWishlistItem(userId, { _id, name, desc, price, available, banner }) {

        const course = {
            _id, name, desc, price, available, banner
        };

        const profile = await UserModel.findById(userId).populate('wishlist');

        if (profile) {

            let wishlist = profile.wishlist;

            if (wishlist.length > 0) {
                let isExist = false;
                wishlist.map(item => {
                    if (item._id.toString() === course._id.toString()) {
                        const index = wishlist.indexOf(item);
                        wishlist.splice(index, 1);
                        isExist = true;
                    }
                });

                if (!isExist) {
                    wishlist.push(course);
                }

            } else {
                wishlist.push(course);
            }

            profile.wishlist = wishlist;
        }

        const profileResult = await profile.save();

        return profileResult.wishlist;

    }


    async AddCartItem(userId, { _id, name, price, banner }, qty, isRemove) {


        const profile = await UserModel.findById(userId).populate('cart');


        if (profile) {

            const cartItem = {
                course: { _id, name, price, banner },
                unit: qty,
            };

            let cartItems = profile.cart;

            if (cartItems.length > 0) {
                let isExist = false;
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

                if (!isExist) {
                    cartItems.push(cartItem);
                }
            } else {
                cartItems.push(cartItem);
            }

            profile.cart = cartItems;

            return await profile.save();
        }

        throw new Error('Unable to add to cart!');
    }



    async AddOrderToProfile(userId, order) {

        const profile = await UserModel.findById(userId);

        if (profile) {

            if (profile.orders == undefined) {
                profile.orders = []
            }
            profile.orders.push(order);

            profile.cart = [];

            const profileResult = await profile.save();

            return profileResult;
        }

        throw new Error('Unable to add to order!');
    }


    async AddEnrolledCourses(userId, enrolledCourses) {

        const profile = await UserModel.findById(userId);

        if (profile) {

            if (profile.enrolledCourses == undefined) {
                profile.enrolledCourses = []
            }
            profile.enrolledCourses.push(order);

            profile.cart = [];

            const profileResult = await profile.save();

            return profileResult;
        }

        throw new Error('Unable to add to order!');
    }


}

module.exports = UserRepository;
