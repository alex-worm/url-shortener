const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - subscription
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *        subscription:
 *          type: string
 *        links:
 *          type: array
 *          items:
 *            ref: '#/components/schemas/Link'
 */

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                });
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword, subscription: 'Free'});

            await user.save();

            res.status(201).json({message: 'User created'});
        } catch (error) {
            res.status(500).json({message: error.message || 'Something wrong, try again...'});
        }
    });
// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during login'
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password, try again'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.jwtSecretKey,
                {expiresIn: '1h'}
            );

            res.json({token, userId: user.id});
        } catch (error) {
            res.status(500).json({message: error.message || 'Something wrong, try again...'});
        }
    });

module.exports = router;
