/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

/**
 * Mood Schema
 */
var ArticleMoodSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  }, 
  email: {
    type: String
  },
  mood: {
	type: String,
	default: 'HAPPY'
  },
  article: {
	type: Schema.ObjectId,
	ref: 'Article'
  }
});

/**
 * Statics
 */
ArticleMoodSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  })
  .populate('user', 'email')
  .populate('article', 'title')
  .exec(cb);
};


mongoose.model('ArticleMood', ArticleMoodSchema);
