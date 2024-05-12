const CustomerService = require("../services/user-service");

module.exports = (app) => {

    const service = new CustomerService();
    app.use('/app-events', async (req, res, next) => {

        const { payload } = req.body;

        //handle subscribe events
        service.SubscribeEvents(payload);

        console.log("============= course ================");
        console.log(payload);
        res.json(payload);

    });

}
