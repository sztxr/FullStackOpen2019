const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
<<<<<<< HEAD
    minlength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3
  },
=======
    unique: true
  },
  name: String,
  passwordHash: String,
>>>>>>> 38e82b16fd7503c83d50453e190b71edf22653e6
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)