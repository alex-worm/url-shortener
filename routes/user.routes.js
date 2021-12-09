const {Router} = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const router = Router();

/**
 * swagger
 * tags:
 *   name: "User"
 *   description: "The users managing API"
 */

/**
 * @swagger
 * /api/user/update:
 *  put:
 *    summary: Update user subscription
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              newSubscription:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: No subscription found with requested name
 *      '500':
 *        description: A server error
 */

router.put('/update', async (req, res) => {
  try {
    const {userId, newSubscription} = req.body;

    const subscription = await Subscription.findOne({name: newSubscription});

    if (!subscription) {
      res.status(400).json('No subscription found with requested name');
      return;
    }

    const user = await User.findOne({_id: new ObjectId(userId)});

    user.subscription = subscription.name;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message || 'Something wrong, try again...'});
  }
});

module.exports = router;
