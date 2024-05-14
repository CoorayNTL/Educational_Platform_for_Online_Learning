// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    ShoppingRepository: require('./repository/shopping-repository'),
    CourseBuyRepository: require('./repository/courseenrollment-repository')
}