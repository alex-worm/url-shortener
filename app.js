const express = require('express');
const config = require('./config/default.json');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.1.0',
            description: 'Amogus API documentation',
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    apis: ['./routes/*.js'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'auth',
            scheme: 'bearer',
            in: 'header',
        },
    },
    security: [{ bearerAuth: [] }],
};

const cssOptions = {
    customCss: '.topbar-wrapper img {content:url(\'https://among-us.io/wp-content/uploads/2020/09/among-us-logo.png\');}',
    customSiteTitle: 'Amogus',
    customfavIcon: 'https://github.com/alex-worm/url-shortener/blob/master/favicon-32x32.png?raw=true',
}

const specs = swaggerJsDoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, cssOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/api/subscription', require('./routes/subscription.routes'));
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
