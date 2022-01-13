// Defines only the schema/model for the Blog objects
// Does not connect to the DB

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0 // 0 if undefined
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// See https://stackoverflow.com/a/36413472
blogSchema.pre('validate', function (next) {
    if (!this.title && !this.url) {
        this.invalidate('title', 'title OR url must be defined', this.title)
        this.invalidate('url',   'title OR url must be defined', this.url)
    }
    next()
})

// Adding the formatter
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)