const mongoose = require('mongoose');
import CharactersSchema  from "./CharactersSchema"

module.exports = mongoose.models.Characters || mongoose.model('Characters', CharactersSchema);