var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	_id: Schema.ObjectId,
    email: String,
    password: String
});


/**
 * Statics
 */
UserSchema.static('findByEmail', function (email, callback) {
	return this.find({email: email}, callback);
});


mongoose.model('User', UserSchema);