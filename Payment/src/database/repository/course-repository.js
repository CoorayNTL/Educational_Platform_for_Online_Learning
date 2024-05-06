const mongoose = require('mongoose');
const Course = require("../models/Course");

// Handling database operations for Course data
class CourseRepository {

  async createCourse({ title, description, instructorId, content, enrollment, price, discount, banner, category, published }) {
    const course = new Course({
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
    return await Course.find().populate('content.videos').populate('RatingAndReview');
  }

  async findCourseById(id) {
    return await Course.findById(id).populate('content.videos').populate('RatingAndReview');
  }

  async findCoursesByCategory(category) {
    const courses = await Course.find({ category }).populate('content.videos').populate('RatingAndReview');
    return courses;
  }

  async updateCourseById(id, updateData) {
    return await Course.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteCourseById(id) {
    return await Course.findByIdAndDelete(id);
  }
}

module.exports = CourseRepository;
