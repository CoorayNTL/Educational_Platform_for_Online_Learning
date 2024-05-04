const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: String },
    items: [
        {
            course: {
                _id: { type: String, require: true },
                name: { type: String },
                desc: { type: String },
                banner: { type: String },
                type: { type: String },
                unit: { type: Number },
                price: { type: Number },
                suplier: { type: String },//instructor
            },
            unit: { type: Number, require: true }
        }
    ]
});

module.exports = mongoose.model('cart', CartSchema);
