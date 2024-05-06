const { CourseRepository } = require("../database");
const { FormatData } = require("../utils");

// All business logic for Course management will be here
class CourseService {

  constructor() {
    this.repository = new CourseRepository();
  }

  async createCourse(courseInputs) {
    const courseResult = await this.repository.createCourse(courseInputs);
    return FormatData(courseResult);
  }

  async getCourses() {
    const courses = await this.repository.findAllCourses();

    let categories = {};
    courses.map(({ category }) => {
      categories[category] = category;
    });

    return FormatData({
      courses,
      categories: Object.keys(categories)
    });
  }

  async getCourseDescription(courseId) {
    const course = await this.repository.findCourseById(courseId);
    return FormatData(course);
  }

  async getCoursesByCategory(category) {
    const courses = await this.repository.findCoursesByCategory(category);
    return FormatData(courses);
  }

  async getEnrolledCourses(enrolledIds) {
    const courses = await this.repository.findSelectedCourses(enrolledIds);
    return FormatData(courses);
  }

  async getCoursePayload(userId, { courseId, status }, event) {
    const course = await this.repository.findCourseById(courseId);

    if (course) {
      const payload = {
        event: event,
        data: { userId, course, status }
      };

      return FormatData(payload);
    } else {
      return FormatData({ error: 'Course not available' });
    }
  }
}

module.exports = CourseService;
