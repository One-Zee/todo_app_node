const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: false
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'Category must have author']
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;