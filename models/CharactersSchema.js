const mongoose = require('mongoose');
import CharacterSchema  from "./CharacterSchema"

const CharactersSchema = new mongoose.Schema({
    created: {
        type: Number,
        required: [true, 'created is required'],
        unique: true
    },
    characters: [CharacterSchema]   
})

export default CharactersSchema