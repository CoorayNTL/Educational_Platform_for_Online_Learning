const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseBuySchema = new Schema({
    CourseBuyId: { type: String },
    userId: { type: String },
    amount: { type: Number },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    items: [
        {
            course: {
                title: String,
                description: String,
                instructorId: String,
                content: {
                    lectureNotes: [{ title: String, content: String }],
                    videos: [{
                        url: {
                            type: String,
                            required: true
                        },
                        title: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        description: {
                            type: String,
                            required: true,
                            trim: true
                        },
                        course: {
                            courseId: { type: String },
                        },
                        RatingAndReview: {
                            ratingandreviewId: { type: String }
                        }
                    }],
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
                    userId: { type: String },
                    courseId: { type: String },
                    entityType: { type: String, enum: ['intructor', 'course'], required: true },
                    rating: { type: Number, min: 1, max: 5, required: true }, // Rating out of 5
                    review: { type: String, maxlength: 500 }, // Optional review text
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
            }
        }
    ]
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('CourseBuy', CourseBuySchema);
