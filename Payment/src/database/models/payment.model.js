const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user: {
        userId: {
            type: String,
            required: true
        },
        email: {
            type: String,
        }
    },
    amount: { type: Number },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'completed' },
    items: [
        {
            course: {
                courseId: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            },
        }
    ],
    credit_card_details: {
        cardNumber: { type: String },
        cardHolderName: { type: String },
        expiryDate: { type: String },
        cvv: { type: String }
    },
    receipt: { type: String },

},
{
    timestamps: true
});

module.exports = mongoose.model('payment', PaymentSchema);
