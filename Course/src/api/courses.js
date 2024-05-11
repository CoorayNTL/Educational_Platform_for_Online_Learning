const {
    PublishCustomerEvent,
    PublishShoppingEvent,
    PublishMessage,
} = require("../utils");
const UserAuth = require("./middlewares/auth");
const { USER_SERVICE } = require("../config");
const CourseService = require("../services/course-service");

module.exports = (app, channel) => {
    const courseService = new CourseService();

    app.post("/create", async (req, res, next) => {
        const { name, desc, type, unit, price, available, suplier, banner } = req.body;
        // validation
        const { data } = await courseService.createCourse({ name, desc, type, unit, price, available, suplier, banner });
        return res.json(data);
    });

    app.get("/category/:type", async (req, res, next) => {
        const type = req.params.type;

        try {
            const { data } = await courseService.GetCoursesByCategory(type);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.get("/:id", async (req, res, next) => {
        const courseId = req.params.id;

        try {
            const { data } = await courseService.GetCourseDescription(courseId);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.post("/ids", async (req, res, next) => {
        const { ids } = req.body;
        const courses = await courseService.GetSelectedCourses(ids);
        return res.status(200).json(courses);
    });

    app.put("/wishlist", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await courseService.GetCoursePayload(_id, req.body);
        PublishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: req.body });

        return res.json(data);
    });

    app.get("/wishlist", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await courseService.GetWishlist(_id);
        PublishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: req.body });
        return res.json(data);
    });

    app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const courseId = req.params.id;

        const { data } = await service.GetCoursePayload(
            _id,
            { courseId },
            "REMOVE_FROM_WISHLIST"
        );
        // PublishCustomerEvent(data);
        PublishMessage(channel, USER_SERVICE, JSON.stringify(data));

        res.status(200).json(data.data.product);

        //const { data } = await courseService.RemoveCourseFromWishlist(_id, courseId);
        piblishMessage(channel, USER_SERVICE, { userId: _id, event: "wishlist", data: { courseId } });
        return res.json(data);
    });

    app.put("/cart", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        // const { data } = await courseService.GetCartPayload(_id, req.body);
        const { data } = await service.GetCoursePayload(
            _id,
            { courseId: req.body._id, qty: req.body.qty },
            "ADD_TO_CART"
        );

        PublishMessage(channel, USER_SERVICE, JSON.stringify(data));


        return res.json(data);
    });

    app.get("/cart", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await courseService.GetCart(_id);
        return res.json(data);
    });

    // app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    //     const { _id } = req.user;
    //     const courseId = req.params.id;

    //     const { data } = await courseService.RemoveCourseFromCart(_id, courseId);
    //     PublishMessage(channel, USER_SERVICE, JSON.stringify(data));
    //     return res.json(data);
    // });

    app.delete("/cart/:id", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const courseId = req.params.id;

        const { data } = await service.GetProductPayload(
            _id,
            { courseId },
            "REMOVE_FROM_CART"
        );



        PublishMessage(channel, USER_SERVICE, JSON.stringify(data));
        PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(data));
        piblishMessage(channel, ENROLL_COURSE_SERVICE, JSON.stringify(data));


        const response = { product: data.data.product, unit: data.data.qty };

        res.status(200).json(response);
    });

    app.post("/checkout", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await courseService.Checkout(_id);
        return res.json(data);
    });

    app.post("/subscribe", async (req, res, next) => {
        const { data } = await courseService.SubscribeEvents(req.body);
        return res.json(data);
    });

    app.post("/orders", async (req, res, next) => {
        const { userId } = req.body;

        const { data } = await courseService.GetOrders(userId);
        return res.json(data);
    });


    // To listen
    SubscribeMessage(channel, courseService);
}

// Path: Course/src/api/products.js
// Compare this snippet from CourseEnrollment/src/database/repository/CourseRepository.js:
// const { Course } = require("../models");




