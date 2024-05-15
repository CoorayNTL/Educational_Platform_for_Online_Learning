
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: String },
    amount: { type: Number },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
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
            quantity: { type: Number, default: 1 }
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
