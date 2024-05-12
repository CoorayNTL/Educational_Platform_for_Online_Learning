const mongoose = require('mongoose');
const { PaymentModel} = require('../models');

class PaymentRepository {

    async CreatePayment({ user, amount, currency, status, items, receipt }) {

        const payment = new PaymentModel({
            user, amount, currency, status, items, receipt
        })

        const paymentResult = await payment.save();
        return paymentResult;
    }

    async FindPaymentById(id) {

        const payment = await PaymentModel.findById(id);
        return payment;
    }

    async FindPaymentByUserId(userId) {
            
            const payment = await PaymentModel.find({ 'user.userId': userId });
            return payment;
        }

    async FindPaymentByCourseId(courseId) {

        const payment = await PaymentModel.find({ 'items.course.courseId': courseId });
        return payment;
    }

    async FindpaymentByUserIdAndCourseId(userId, courseId) {

        const payment = await PaymentModel.find({ 'user.userId': userId, 'items.course.courseId': courseId });
        return payment;
    }

    async getAllPayments(){
        return await PaymentModel.find();
    }

}

module.exports = PaymentRepository;
