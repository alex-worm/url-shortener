const {Router} = require('express');
const config = require('../config/default.json');
const shortid = require('shortid');
const ObjectId = require('mongoose').Types.ObjectId;
const Link = require('../models/Link');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Link:
 *      type: object
 *      required:
 *        - from
 *        - to
 *        - code
 *      properties:
 *        from:
 *          type: string
 *        to:
 *          type: string
 *        code:
 *          type: string
 *        date:
 *          type: date
 *        clicks:
 *          type: integer
 *        owner:
 *          type: string
 *      example:
 *        from: https://google.com
 *        to: "http://localhost:5000/t/oUCpDDWok"
 *        code: "oUCpDDWok"
 *        date: "2020-05-05T15:00:00.000Z"
 *        clicks: 0
 *        owner: "61715b81b9417e38cce528e1"
 */

/**
 * @swagger
 * tags:
 *    name: "Links"
 *    description: "The links managing API"
 */

/**
 * @swagger
 * /api/link:
 *  get:
 *    summary: Get all user links
 *    tags: [Links]
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
 *                $ref: '#/components/schemas/Link'
 */

/**
 * @swagger
 * /api/link/{id}:
 *   get:
 *     summary: Get link by id
 *     tags: [Links]
 *     parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *         type: string
 *         required: true
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       '404':
 *         description: Link not found
 */

/**
 * @swagger
 * /api/link/generate:
 *  post:
 *    summary: Generate new link
 *    tags: [Links]
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
 *            type: object
 *            properties:
 *              from:
 *                type: string
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Link'
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/link/delete/{id}:
 *  delete:
 *    summary: Delete link by id
 *    tags: [Links]
 *    parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *        type: string
 *        required: true
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Link'
 *      '500':
 *        description: Internal server error
 */

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.baseUrl;
        const {from} = req.body;
        new URL(from);

        const code = shortid.generate();

        const existing = await Link.findOne({from, owner: req.user.userId});

        if (existing) {
            res.status(409).json({message: 'Link already exists'});
            return;
        }

        const user = await User.findOne({_id: new ObjectId(req.user.userId)});
        const subscription = await Subscription.findOne({name: user.subscription});

        if (subscription.linksAvailable <= user.links.length) {
            res.status(409).json({message: 'Subscription limit reached'});
            return;
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({link});
    } catch (error) {
        res.status(500).json({message: error.message || 'Something wrong, try again...'});
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
   try {
       const linkToDelete = await Link.findById(req.params.id);

       await linkToDelete.delete();
       res.status(201).json({linkToDelete});
   } catch (error) {
       res.status(500).json({message: error.message || 'Something wrong, try again...'});
   }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (error) {
        res.status(500).json({message: error.message || 'Something wrong, try again...'});
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (error) {
        res.status(500).json({message: error.message || 'Something wrong, try again...'});
    }
});

module.exports = router;
