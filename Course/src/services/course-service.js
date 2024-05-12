const { CourseRepository } = require("../database");
const { FormateData } = require("../utils");
// All business logic for Course management will be here
class CourseService {

  constructor() {
    this.repository = new CourseRepository();
  }

  async createCourse(courseInputs) {
    const courseResult = await this.repository.createCourse(courseInputs);
    return FormateData(courseResult);
  }

  async getCourses() {
    const courses = await this.repository.findAllCourses();

    let categories = {};
    courses.map(({ category }) => {
      categories[category] = category;
    });

    return FormateData({
      courses,
      categories: Object.keys(categories)
    });
  }

  async getCourseDescription(courseId) {
    const course = await this.repository.findCourseById(courseId);
    return FormateData(course);
  }

  async getCoursesByCategory(category) {
    const courses = await this.repository.findCoursesByCategory(category);
    return FormateData(courses);
  }

  async getEnrolledCourses(enrolledIds) {
    const courses = await this.repository.findSelectedCourses(enrolledIds);
    return FormateData(courses);
  }

  async GetCoursePayload(userId, { courseId, status }, event) {
    const course = await this.repository.findCourseById(courseId);

    if (course) {
      const payload = {
        event: event,
        data: { userId, course, status }
      };

      return FormateData(payload);
    } else {
      return FormateData({ error: 'Course not available' });
    }
  }
}

module.exports = CourseService;
