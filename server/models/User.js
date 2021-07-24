const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
 id: { type: Number },
 username: { type: String },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 avatar: { type: String },
 friends: [{ type: Object }],
 games: [{ type: Object }],
 comments: [{ type: Object }],
});

module.exports = model('User', schema);
