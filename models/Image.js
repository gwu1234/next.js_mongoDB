
const mongoose = require('mongoose');
import ImageSchema  from "./ImageSchema"
mongoose.models = {}
module.exports = mongoose.models && mongoose.models.Image ? mongoose.models.Image : mongoose.model('Images', ImageSchema);