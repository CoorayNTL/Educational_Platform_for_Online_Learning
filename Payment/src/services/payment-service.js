const  { PaymentRepository }= require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const stripe = require('./Stripe');

class PaymentService {

    constructor() {
        this.repository = new PaymentRepository();
    }

    async makePayment(userInputs) {

      const { user, amount, currency, items } = userInputs;

      const charge = await stripe.charges.create({ amount, currency, source: 'tok_visa' });


      const payment = await this.repository.CreatePayment({ user, amount, currency, items });

      return FormateData({payment, charge});
      }

    async FindPaymentById(id) {
        return await FormateData(this.repository.FindPaymentById(id));
    }

    async FindPaymentByUserId(userId) {
        return await FormateData(this.repository.FindPaymentByUserId(userId));
    }

    async FindPaymentByCourseId(courseId) {
        return await FormateData(this.repository.FindPaymentByCourseId(courseId));
    }

    async FindPaymentByUserIdAndCourseId(userId, courseId) {
        return await FormateData(this.repository.FindPaymentByUserIdAndCourseId(userId, courseId));
    }

    async getAllPayments() {
        return await FormateData(this.repository.getAllPayments());
    }
}

module.exports = PaymentService;
