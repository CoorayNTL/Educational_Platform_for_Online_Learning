const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [
        { type: Schema.Types.ObjectId, ref: 'address', require: true }
    ],
    role: {
        type: String, enum: ['instructor', 'admin', 'learner'],
        default: 'learner',
        required: true
    },
    cart: [
        {
            course: {
                _id: { type: String, require: true },
                name: { type: String },
                banner: { type: String },
                price: { type: Number },
            },
            unit: { type: Number, require: true }
        }
    ],
    wishlist: [
        {
            _id: { type: String, require: true },
            name: { type: String },
            description: { type: String },
            banner: { type: String },
            avalable: { type: Boolean },
            price: { type: Number },
        }
    ],
    orders: [
        {
            _id: { type: String, required: true },
            amount: { type: String },
            date: { type: Date, default: Date.now() }
        }
    ],
    enrolledCourses: [
        {
            _id: { type: String, required: true },
            startDate: { type: Date },
            endDate: { type: Date }
        }
    ]

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

// Method to enroll in a course
UserSchema.methods.enrollCourse = function (courseId) {
    if (!this.enrolledCourses.includes(courseId)) {
        this.enrolledCourses.push(courseId);
        return this.save();
    }
    return Promise.resolve(this);
};

// Method to cancel course enrollment
UserSchema.methods.cancelCourseEnrollment = function (courseId) {
    this.enrolledCourses = this.enrolledCourses.filter(id => id !== courseId);
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);
