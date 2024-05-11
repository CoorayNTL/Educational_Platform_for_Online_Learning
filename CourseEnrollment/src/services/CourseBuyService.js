const { CourseBuyRepository } = require("../database");
const { FormatData } = require("../utils");

class CourseBuyService {
    constructor() {
        this.repository = new CourseBuyRepository();
    }

    async getCourseBuysByUserId(userId) {
        const courseBuys = await this.repository.getCourseBuysByUserId(userId);
        return FormatData(courseBuys);
    }

    async createCourseBuy(courseBuyData) {
        const createdCourseBuy = await this.repository.createCourseBuy(courseBuyData);
        return FormatData(createdCourseBuy);
    }

    async getOrderPayload(userId, orderData, eventType) {
        
        if(orderData) {
            const payload = {
                event: eventType,
                data: { userId, orderData }
            };
            return FormatData(payload);
        } else {
            return FormatData({ error: 'Order not available' });
        }
    }
    async deleteCourseBuy(courseBuyId) {
        const deletedCourseBuy = await this.repository.deleteCourseBuy(courseBuyId);
        return FormatData(deletedCourseBuy);
    }

    async addCourseToCart(userId, courseId, qty) {
        const updatedCourseBuy = await this.repository.addCourseToCart(userId, courseId, qty);
        return FormatData(updatedCourseBuy);
    }

    async removeCourseFromCart(userId, courseId) {
        const updatedCourseBuy = await this.repository.removeCourseFromCart(userId, courseId);
        return FormatData(updatedCourseBuy);
    }

    async checkoutCourseBuy(userId) {
        const order = await this.repository.checkoutCourseBuy(userId);
        return FormatData(order);
    }

    async subscribeEvents(payload) {
        payload = JSON.parse(payload);
        const { event, data } = payload;
        const { userId, course, qty } = data;

        switch (event) {
            case 'ADD_TO_CART':
                return this.addCourseToCart(userId, course, qty);
            case 'REMOVE_FROM_CART':
                return this.removeCourseFromCart(userId, course);
            default:
                break;
        }
    }
}

module.exports = CourseBuyService;
