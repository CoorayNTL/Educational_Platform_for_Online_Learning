const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    userId: { type: String },
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
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            },
        }
    ],
    receipt: { type: String },

},
{
    timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);
