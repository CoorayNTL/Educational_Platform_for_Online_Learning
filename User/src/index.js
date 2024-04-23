const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils')

const StartServer = async () => {
    const app = express();

    try {
        await databaseConnection();
        const channel = await CreateChannel();
        await expressApp(app, channel);

        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        })
            .on('error', (err) => {
                console.log(err);
                process.exit();
            })
            .on('close', () => {
                channel.close();
            });
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1); // Exit with a non-zero code to indicate failure
    }
}

StartServer();
