const mongoose = require('mongoose');
const RatingAndReview = require('./RatingAndReview');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    description: String,
    instructorId: String, // Reference to user ID
    content: {
        lectureNotes: [{ title: String, content: String }],
        videos: [{ type: Schema.Types.ObjectId, ref: 'Videos' }],
        quizzes: [{
            question: String, options: [String],
            correctAnswer: String
        }]
    },
    enrollment: {
        capacity: Number,
        enrolledUsers: [{ type: String }]
    },
    RatingAndReview: [{
        type: Schema.Types.ObjectId,
        ref: 'RatingAndReview'
    }],
    price: Number,
    discount: Number,
    banner: String,
    category: String,
    published: Boolean,
    publishedDate: Date,
    lastUpdated: Date,
    createdAt: Date,
    updatedAt: Date
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('course', CourseSchema);
