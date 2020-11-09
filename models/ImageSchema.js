const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        maxlength: [100, 'name cannot be more than 50 characters']
    },
    name: {
        type: String,
        required: true,
        maxlength: [100, 'name cannot be more than 50 characters']
    },
    img: { data: Buffer, contentType: String }
    
})

export default ImageSchema


