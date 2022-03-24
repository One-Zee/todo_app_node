const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Task requires Title'],
    },
    completed:{
        type: Boolean,
        default: false
    },
    date:{ 
        type: Date, 
        default: Date.now 
    }
})

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;