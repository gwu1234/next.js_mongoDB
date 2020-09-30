const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
    comments: [{
        by: {  
            id: {
                type: Number,
                required: [true, 'id required'],
                unique: false
              },
            name: {
                type: String,
                required: true,
                maxlength: [50, 'name cannot be more than 50 characters']
              }        
            }, 
        created: String,
        comment: {
            type: String,
            required: true,
            maxlength: [1000, 'comment cannot be more than 1000 characters']
        }
    }],     
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);