const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        console.log(req);
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        new URL(from);

        const code = shortid.generate();

        const existing = await Link.findOne({from});

        if (existing) {
            res.status(409).json({message: 'Link already exists'});
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
