const express = require('express');
const config = require('./config/default.json');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t/', require('./routes/redirect.routes'));

const PORT = config.port || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`);
        });
    } catch (error) {
        console.log('Server error', error.message);
        process.exit(1);
    }
};

start();
