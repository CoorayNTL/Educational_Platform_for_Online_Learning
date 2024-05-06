const { Schema, model } = require('mongoose')

const videoschema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'course'
  },
  RatingAndReview: {
    type: Schema.Types.ObjectId,
    ref: 'RatingAndReview'
  }
})

const Videos = model('videos', videoschema)

module.exports = Videos