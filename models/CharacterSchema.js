const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'id required'],
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: [50, 'name cannot be more than 50 characters']
    },
    status: {
        type: String,
        required: false,
        maxlength: [50, 'status cannot be more than 50 characters']
    },
    species: {
        type: String,
        required: false,
        maxlength: [50, 'species cannot be more than 50 characters']
    }, 
    type: {
        type: String,
        required: false,
        maxlength: [50, 'type cannot be more than 50 characters']
    }, 
    gender: {
        type: String,
        required: false,
        maxlength: [50, 'gender cannot be more than 50 characters']
    }, 
    origin : {
        name: String,
        url: String
    },
    location : {
        name: String,
        url: String
    },
    image: {
        type: String,
        required: false,
        maxlength: [100, 'image cannot be more than 100 characters']
    },
    episode: [String],     
    url: {
        type: String,
        required: false,
        maxlength: [100, 'url cannot be more than 100 characters']
    }, 
    created: {
        type: String,
        required: false,
        maxlength: [100, 'name cannot be more than 100 characters']
    }
})

export default CharacterSchema
