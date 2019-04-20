const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  hidden: Boolean,
  email: {
    type: String,
    match: /^.+@.+\..+$/
  },
  password: String,
  role: Boolean,
  intern: Boolean,
  position: {
    type : String ,
    enum: ["développeur", "data-scientist", "UX/UI", "Projet", "Finance", "autre" ]
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
