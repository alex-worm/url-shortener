const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  transactionLink: {type: String, required: true},
  linksAvailable: {type: Number, required: true},
  imageUrl: {type: String, required: true},
  subscribers: [{type: Types.ObjectId, ref: 'User'}]
});

module.exports = model('Subscription', schema);
