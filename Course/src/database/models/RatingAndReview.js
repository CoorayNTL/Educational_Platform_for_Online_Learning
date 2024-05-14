const mongoose = require('mongoose');

const RatingAndReviewSchema = new mongoose.Schema({
    userId: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    //instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    entityType: { type: String, enum: ['intructor', 'course'], required: true }, // Indicates whether it's a course or course
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating out of 5
    review: { type: String, maxlength: 500 }, // Optional review text

},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            }
        },
        timestamps: true
    });

module.exports = mongoose.model('RatingAndReview', RatingAndReviewSchema);
