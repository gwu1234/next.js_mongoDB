const mongoose = require('mongoose');
import CharacterSchema  from "./CharacterSchema"

module.exports = mongoose.models && mongoose.models.DeletedCharacter ? mongoose.models.DeletedCharacter : mongoose.model('DeletedCharacter', CharacterSchema);