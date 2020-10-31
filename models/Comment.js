const mongoose = require('mongoose');
import CommentSchema from "./CommentSchema"

module.exports = mongoose.models && mongoose.models.Comment ? mongoose.models.Comment : mongoose.model('Comment', CommentSchema);