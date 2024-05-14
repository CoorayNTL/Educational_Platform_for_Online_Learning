const mongoose = require('mongoose');
const course = require("../models/course");

// Handling database operations for course data
class CourseRepository {

  async createCourse({ title, description, instructorId, content, enrollment, price, discount, banner, category, published }) {
    const course = new course({
      title,
      description,
      instructorId,
      content,
      enrollment,
      price,
      discount,
      banner, 
      category,
      published
    });

    const courseResult = await course.save();
    return courseResult;
  }

  async findAllCourses() {
    return await course.find().populate('content.videos').populate('RatingAndReview');
  }

  async findCourseById(id) {
    return await course.findById(id).populate('content.videos').populate('RatingAndReview');
  }

  async findCoursesByCategory(category) {
    const course = await course.find({ category }).populate('content.videos').populate('RatingAndReview');
    return course;
  }

  async updateCourseById(id, updateData) {
    return await course.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteCourseById(id) {
    return await course.findByIdAndDelete(id);
  }
}

module.exports = CourseRepository;
