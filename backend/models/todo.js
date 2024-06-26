const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }, 
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const todoModel = mongoose.model("todo", todoSchema)

module.exports = {
    todoModel
}