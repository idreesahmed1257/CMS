const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: 'studentDirectory'});
// we don't want our collection to be dynamic based on the name of the model

const model = mongoose.model('studentDirectory',UserSchema);

module.exports = model;