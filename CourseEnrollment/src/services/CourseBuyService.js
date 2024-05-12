const { CourseBuyRepository } = require("../database");
const { FormateData } = require("../utils");

class CourseBuyService {
    constructor() {
        this.repository = new CourseBuyRepository();
    }

    async getCourseBuysByUserId(userId) {
        const courseBuys = await this.repository.getCourseBuysByUserId(userId);
        return FormateData(courseBuys);
    }

    async createCourseBuy(courseBuyData) {
        const createdCourseBuy = await this.repository.createCourseBuy(courseBuyData);
        return FormateData(createdCourseBuy);
    }

    async getOrderPayload(userId, orderData, eventType) {
        
        if(orderData) {
            const payload = {
                event: eventType,
                data: { userId, orderData }
            };
            return FormateData(payload);
        } else {
            return FormateData({ error: 'Order not available' });
        }
    }
    async deleteCourseBuy(courseBuyId) {
        const deletedCourseBuy = await this.repository.deleteCourseBuy(courseBuyId);
        return FormateData(deletedCourseBuy);
    }

    async addCourseToCart(userId, courseId, qty) {
        const updatedCourseBuy = await this.repository.addCourseToCart(userId, courseId, qty);
        return FormateData(updatedCourseBuy);
    }

    async removeCourseFromCart(userId, courseId) {
        const updatedCourseBuy = await this.repository.removeCourseFromCart(userId, courseId);
        return FormateData(updatedCourseBuy);
    }

    async checkoutCourseBuy(userId) {
        const order = await this.repository.checkoutCourseBuy(userId);
        return FormateData(order);
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
