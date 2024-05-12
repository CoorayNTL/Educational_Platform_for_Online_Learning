const CourseBuyService = require("../services/CourseBuyService");
const { PublishMessage } = require("../utils");
const UserAuth = require('./middlewares/auth');
const { USER_SERVICE } = require('../config');
const { PublishCustomerEvent, SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
    
    const service = new CourseBuyService();

        SubscribeMessage(channel, service);

    app.post('/coursebuy', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { txnNumber } = req.body;
        const data = await service.createCourseBuy({ _id, txnNumber });
        const payload = await service.getOrderPayload(_id, data, 'ENROLL_COURSE_SERVICE');
        PublishMessage(channel, USER_SERVICE, JSON.stringify(payload));
        res.status(200).json(data);

        
    });

    app.get('/coursebuys', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const data = await service.getCourseBuysByUserId(_id);
        res.status(200).json(data);
    });

    app.put('/cart', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { courseId } = req.body;
        const data = await service.addCourseToCart(_id, courseId);
        res.status(200).json(data);
    });

    app.delete('/cart/:courseId', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { courseId } = req.params;
        const data = await service.removeCourseFromCart(_id, courseId);
        res.status(200).json(data);
    });

    app.get('/cart', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const data = await service.getCart(_id);
        res.json(data);
    });

    app.post("/ids", async (req, res, next) => {
        const { ids } = req.body;
        const courses = await service.getSelectedCourses(ids);
        return res.status(200).json(courses);
    });

    app.put("/wishlist", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { courseId } = req.body;
        const data = await service.addToWishlist(_id, courseId);
        PublishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: req.body });
        return res.json(data);
    });

    app.get("/wishlist", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const data = await service.getWishlist(_id);
        PublishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: req.body });
        return res.json(data);
    });

    app.delete("/wishlist/:courseId", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { courseId } = req.params;
        const data = await service.removeFromWishlist(_id, courseId);
        PublishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: { courseId } });
        return res.json(data);
    });

    // Duplicate route handler for 'PUT /cart', not required

    app.put("/cart", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { data } = await service.getCartPayload(_id, req.body);
        PublishMessage(channel, USER_SERVICE, JSON.stringify(data));
        return res.json(data);
    });

    app.delete("/cart/:courseId", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { courseId } = req.params;
        const data = await service.removeCourseFromCart(_id, courseId);
        PublishMessage(channel, USER_SERVICE, JSON.stringify(data));
        return res.json(data);
    });
}
