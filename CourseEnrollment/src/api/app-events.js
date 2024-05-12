const ShoppingService = require("../services/shopping-service");
const CourseBuyService = require("../services/CourseBuyService");

module.exports = (app) => {

    //const service = new ShoppingService();
    const service = new CourseBuyService();

    app.use('/app-events', async (req, res, next) => {

        const { payload } = req.body;
        console.log("============= Course ================");

        console.log(payload);

        //handle subscribe events
        service.SubscribeEvents(payload);

        return res.status(200).json({ message: 'notified!' });

    });

}
