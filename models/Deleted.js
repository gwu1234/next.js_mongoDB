const mongoose = require('mongoose');
import CharacterSchema  from "./CharacterSchema"

module.exports = mongoose.models.DeletedCharacter || mongoose.model('DeletedCharacter', CharacterSchema);