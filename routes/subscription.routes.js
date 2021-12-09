const {Router} = require('express');
const Subscription = require('../models/Subscription');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Subscription:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - transactionLink
 *        - linksAvailable
 *        - imageUrl
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        transactionLink:
 *          type: string
 *        linksAvailable:
 *          type: integer
 *        imageUrl:
 *          type: string
 *        subscribers:
 *          type: array
 *          items:
 *            type: string
 *      example:
 *        name: "Super mega pro plan"
 *        description: "This is the best plan you will ever get"
 *        transactionLink: "https://www.paypal.com/us/signin"
 *        linksAvailable: 50000
 *        imageUrl: "https://c.tenor.com/GryShD35-psAAAAC/troll-face-creepy-smile.gif"
 *        subscribers: ["user1", "user2"]
 */

/**
 * @swagger
 * tags:
 *    name: "Subscriptions"
 *    description: "The subscriptions managing API"
 */

/**
 * @swagger
 * /api/subscription:
 *  get:
 *    summary: Get all subscriptions
 *    tags: [Subscriptions]
 *    parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Subscription'
 *      '500':
 *        description: A server error
 */

/**
 * @swagger
 * /api/subscription/create:
 *  post:
 *    summary: Create a new subscription
 *    tags: [Subscriptions]
 *    parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *        type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subscription'
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subscription'
 *      '409':
 *        description: A subscription already exists
 *      '500':
 *        description: A server error
 */

router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});

    if (subscriptions) {
      return res.json(subscriptions);
    }

    res.status(500).json('No subscriptions found');
  } catch (error) {
    res.status(500).json({message: error.message || 'Something wrong, try again...'});
  }
});

router.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, transactionLink, linksAvailable, imageUrl } = req.body;

    const existing = await Subscription.findOne({ name });

    if (existing) {
      res.status(409).json({message: 'Subscription already exists'});
      return;
    }

    const subscription = new Subscription({
      name,
      description,
      transactionLink,
      linksAvailable,
      imageUrl,
      subscribers: [],
    })

    await subscription.save();

    res.status(201).json({ subscription });
  } catch (error) {
    res.status(500).json({message: error.message || 'Something wrong, try again...'});
  }
})

module.exports = router;
