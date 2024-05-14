const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

// All Business logic will be here
class userService {

    constructor() {
        this.repository = new UserRepository();
    }

    async SignIn(userInputs) {

        const { email, password } = userInputs;

        const existinguser = await this.repository.Finduser({ email });

        if (existinguser) {

            const validPassword = await ValidatePassword(password, existinguser.password, existinguser.salt);
            if (validPassword) {
                const token = await GenerateSignature({ email: existinguser.email, _id: existinguser._id });
                console.log('Token', token);
                console.log('Existing user login', existinguser);
                return FormateData({ id: existinguser._id, token });
            }
        }

        return FormateData(null);
    }

    async Logout(userInputs) {

        const { _id } = userInputs;

        const existinguser = await this.repository.FinduserById({ _id });

        if (existinguser) {
            return FormateData({ msg: 'Logged Out' });
        }

        return FormateData({ msg: 'Error' });
    }


    async SignUp(userInputs) {

        const { email, password, phone } = userInputs;

        // create salt
        let salt = await GenerateSalt();

        let userPassword = await GeneratePassword(password, salt);

        const existinguser = await this.repository.Createuser({ email, password: userPassword, phone, salt });

        const token = await GenerateSignature({ email: email, _id: existinguser._id });
        return FormateData({ id: existinguser._id, token });

    }

    async AddNewAddress(_id, userInputs) {

        const { street, postalCode, city, country } = userInputs;

        const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country })

        return FormateData(addressResult);
    }

    async GetProfile(id) {

        const existinguser = await this.repository.FinduserById({ id });
        return FormateData(existinguser);
    }

    async GetShopingDetails(id) {

        const existinguser = await this.repository.FinduserById({ id });

        if (existinguser) {
            // const orders = await this.shopingRepository.Orders(id);
            return FormateData(existinguser);
        }
        return FormateData({ msg: 'Error' });
    }

    async GetWishList(userId) {
        const wishListItems = await this.repository.Wishlist(
            userId);
        return FormateData(wishListItems);
    }

    async AddToWishlist(userId, course) {
        const wishlistResult = await this.repository.AddWishlistItem(userId, course);
        return FormateData(wishlistResult);
    }

    async ManageCart(userId, course, qty, isRemove) {
        const cartResult = await this.repository.AddCartItem(userId, course, qty, isRemove);
        return FormateData(cartResult);
    }

    async ManageOrder(userId, order) {
        const orderResult = await this.repository.AddOrderToProfile(userId, order);
        return FormateData(orderResult);
    }

    async AddEnrolledCourses(userId, { _id, startDate, endDate }) {
        const enrolledCourses = await this.repository.AddEnrolledCourses(userId, { _id, startDate, endDate });
        return FormateData(enrolledCourses);
    }

    async GetEnrolledCourses(userId) {

        const enrolledCourses = await this.repository.GetEnrolledCourses(userId);
        return FormateData(enrolledCourses);
    }

    async SubscribeEvents(payload) {

        console.log('Triggering.... user Events')

        payload = JSON.parse(payload)

        const { event, data } = payload;

        const { userId, course, order, qty } = data;

        switch (event) {
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId, course)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId, course, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, course, qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            case 'ENROLL_COURSE_SERVICE':
                this.AddEnrolledCourses(userId, course);
                break;
            default:
                break;
        }

    }

}

module.exports = userService;
