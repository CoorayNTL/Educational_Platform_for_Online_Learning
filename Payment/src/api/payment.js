const UserService = require('../services/payment-service');
const UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');


module.exports = (app, channel) => {

    const service = new UserService();

    // To listen
    SubscribeMessage(channel, service);

    app.post('/pay', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { amount, currency, source, description } = req.body;
        const { data } = await service.Pay({ _id, amount, currency, source, description });
        res.json(data);

    });

    app.post('/refund', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { amount, currency, charge } = req.body;

        const { data } = await service.Refund({ _id, amount, currency, charge });

        res.json(data);

    });

    app.post('/transfer', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { amount, currency, source, destination } = req.body;

        const { data } = await service.Transfer({ _id, amount, currency, source, destination });

        res.json(data);

    });

    app.post('/payout', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { amount, currency, source, destination } = req.body;

        const { data } = await service.Payout({ _id, amount, currency, source, destination });

        res.json(data);

    });

    app.post('/balance', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetBalance({ _id });

        res.json(data);

    });

    app.post('/transactions', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetTransactions({ _id });

        res.json(data);

    });

    app.post('/transaction', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetTransaction({ _id, id });

        res.json(data);

    });

    app.post('/card', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { card } = req.body;

        const { data } = await service.AddCard({ _id, card });

        res.json(data);

    });

    app.post('/cards', UserAuth, async (req, res, next) => {


        const { _id } = req.user;

        const { data } = await service.GetCards({ _id });

        res.json(data);

    }

    );

    app.post('/delete-card', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DeleteCard({ _id, id });

        res.json(data);

    }

    );

    app.post('/subscriptions', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetSubscriptions({ _id });

        res.json(data);

    }

    );

    app.post('/subscription', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetSubscription({ _id, id });

        res.json(data);

    }

    );

    app.post('/subscribe', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { plan, source } = req.body;

        const { data } = await service.Subscribe({ _id, plan, source });

        res.json(data);

    }

    );

    app.post('/unsubscribe', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.Unsubscribe({ _id, id });

        res.json(data);

    }

    );

    app.post('/update-subscription', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id, plan } = req.body;

        const { data } = await service.UpdateSubscription({ _id, id, plan });

        res.json(data);

    }

    );

    app.post('/invoices', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetInvoices({ _id });

        res.json(data);

    }

    );

    app.post('/invoice', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetInvoice({ _id, id });

        res.json(data);

    }

    );

    app.post('/download-invoice', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DownloadInvoice({ _id, id });

        res.json(data);

    }

    );

    app.post('/update-invoice', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id, metadata } = req.body;

        const { data } = await service.UpdateInvoice({ _id, id, metadata });

        res.json(data);

    }

    );

    app.post('/delete-invoice', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DeleteInvoice({ _id, id });

        res.json(data);

    }

    );

    app.post('/create-invoice', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { customer, currency, amount, description } = req.body;

        const { data } = await service.CreateInvoice({ _id, customer, currency, amount, description });

        res.json(data);

    }

    );

    app.post('/create-invoice-item', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { invoice, currency, amount, description } = req.body;

        const { data } = await service.CreateInvoiceItem({ _id, invoice, currency, amount, description });

        res.json(data);

    }

    );

    app.post('/invoice-items', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { invoice } = req.body;

        const { data } = await service.GetInvoiceItems({ _id, invoice });

        res.json(data);

    }

    );

    app.post('/invoice-item', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetInvoiceItem({ _id, id });

        res.json(data);

    }

    );

    app.post('/delete-invoice-item', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DeleteInvoiceItem({ _id, id });

        res.json(data);

    }

    );

    app.post('/update-invoice-item', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id, metadata } = req.body;

        const { data } = await service.UpdateInvoiceItem({ _id, id, metadata });

        res.json(data);

    }

    );

    app.post('/create-plan', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { name, currency, interval, amount, description } = req.body;

        const { data } = await service.CreatePlan({ _id, name, currency, interval, amount, description });

        res.json(data);

    }

    );

    app.post('/plans', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetPlans({ _id });

        res.json(data);

    }

    );

    app.post('/plan', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetPlan({ _id, id });

        res.json(data);

    }

    );

    app.post('/delete-plan', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DeletePlan({ _id, id });

        res.json(data);

    }

    );

    app.post('/update-plan', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id, metadata } = req.body;

        const { data } = await service.UpdatePlan({ _id, id, metadata });

        res.json(data);

    }

    );

    app.post('/create-coupon', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { name, currency, amount, duration, duration_in_months } = req.body;

        const { data } = await service.CreateCoupon({ _id, name, currency, amount, duration, duration_in_months });

        res.json(data);

    }

    );

    app.post('/coupons', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { data } = await service.GetCoupons({ _id });

        res.json(data);

    }

    );

    app.post('/coupon', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.GetCoupon({ _id, id });

        res.json(data);

    }

    );


    app.post('/delete-coupon', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id } = req.body;

        const { data } = await service.DeleteCoupon({ _id, id });

        res.json(data);

    }

    );

    app.post('/update-coupon', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        const { id, metadata } = req.body;

        const { data } = await service.UpdateCoupon({ _id, id, metadata });

        res.json(data);

    }

    );



};