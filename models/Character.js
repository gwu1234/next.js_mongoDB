const mongoose = require('mongoose');
import CharacterSchema  from "./CharacterSchema"

module.exports = mongoose.models.Favorite || mongoose.model('Favorite', CharacterSchema);