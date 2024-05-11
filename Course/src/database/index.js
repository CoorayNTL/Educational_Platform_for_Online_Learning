// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    ProductRepository: require('./repository/product-repository'),
    CourseRepository: require('./repository/course-repository')
}