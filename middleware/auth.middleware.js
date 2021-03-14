const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.header.authorization.split(' ')[1]; // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({message: 'No authorization'});
        }

        req.user = jwt.verify(token, config.get('jwtSecretKey'));
        next();
    } catch (ex) {
        res.status(401).json({message: 'No authorization'});
    }
};