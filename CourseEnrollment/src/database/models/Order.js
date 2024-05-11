// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const OrderSchema = new Schema({
//     orderId: { type: String },
//     userId: { type: String },
//     amount: { type: Number },status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },status: { type: String },
//     items: [
//         {
//             course: {
//                 _id: { type: String, require: true },
//                 name: { type: String },
//                 desc: { type: String },
//                 banner: { type: String },
//                 type: { type: String },
//                 unit: { type: Number },
//                 price: { type: Number },
//                 suplier: { type: String },
//             },
//             unit: { type: Number, require: true }
//         }
//     ]
// },
//     {
//         toJSON: {
//             transform(doc, ret) {
//                 delete ret.__v;
//             }
//         },
//         timestamps: true
//     });

// module.exports = mongoose.model('order', OrderSchema);

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
