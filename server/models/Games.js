const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
 id: { type: Number },
 title: { type: String },
 description: { type: String },
 poster: { type: String },
 rating: { type: Number },
 score: { type: Number },
 awards: { type: Number },
 categories: [{ type: String }],
 trailer: { type: String },
 comments: [{ type: Object }],
 showComments: { type: Boolean },
 showVideo: { type: Boolean },
 arrowDown: { type: Boolean },
});

module.exports = model('Games', schema);
