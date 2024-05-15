

module.exports = (app) => {

    // const service = new ShoppingService();
    app.use('/app-events', async (req, res, next) => {

        const { payload } = req.body;

        console.log("============= course ================");
        console.log(payload);

        return res.status(200).json({ message: 'notified!' });

    });

}
