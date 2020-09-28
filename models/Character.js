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

module.exports = mongoose.models.Character || mongoose.model('Character', CharacterSchema);
/*{
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
    "name": "Earth (Replacement Dimension)",
    "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
    "https://rickandmortyapi.com/api/episode/4",
    "https://rickandmortyapi.com/api/episode/5",
    "https://rickandmortyapi.com/api/episode/6",
    "https://rickandmortyapi.com/api/episode/7",
    "https://rickandmortyapi.com/api/episode/8",
    "https://rickandmortyapi.com/api/episode/9",
    "https://rickandmortyapi.com/api/episode/10",
    "https://rickandmortyapi.com/api/episode/11",
    "https://rickandmortyapi.com/api/episode/12",
    "https://rickandmortyapi.com/api/episode/13",
    "https://rickandmortyapi.com/api/episode/14",
    "https://rickandmortyapi.com/api/episode/15",
    "https://rickandmortyapi.com/api/episode/16",
    "https://rickandmortyapi.com/api/episode/17",
    "https://rickandmortyapi.com/api/episode/18",
    "https://rickandmortyapi.com/api/episode/19",
    "https://rickandmortyapi.com/api/episode/20",
    "https://rickandmortyapi.com/api/episode/21",
    "https://rickandmortyapi.com/api/episode/22",
    "https://rickandmortyapi.com/api/episode/23",
    "https://rickandmortyapi.com/api/episode/24",
    "https://rickandmortyapi.com/api/episode/25",
    "https://rickandmortyapi.com/api/episode/26",
    "https://rickandmortyapi.com/api/episode/27",
    "https://rickandmortyapi.com/api/episode/28",
    "https://rickandmortyapi.com/api/episode/29",
    "https://rickandmortyapi.com/api/episode/30",
    "https://rickandmortyapi.com/api/episode/31",
    "https://rickandmortyapi.com/api/episode/32",
    "https://rickandmortyapi.com/api/episode/33",
    "https://rickandmortyapi.com/api/episode/34",
    "https://rickandmortyapi.com/api/episode/35",
    "https://rickandmortyapi.com/api/episode/36",
    "https://rickandmortyapi.com/api/episode/37",
    "https://rickandmortyapi.com/api/episode/38",
    "https://rickandmortyapi.com/api/episode/39",
    "https://rickandmortyapi.com/api/episode/40",
    "https://rickandmortyapi.com/api/episode/41"
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
    },*/