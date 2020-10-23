
const mongoose = require('mongoose');
import CharacterSchema  from "./CharacterSchema"

module.exports = mongoose.models.Characters || mongoose.model('Characters', CharacterSchema);