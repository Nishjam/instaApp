const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
      type: String,
      require:true,
      max:20
  },
  website: {
      type: String
  },
  bio: {
      type: String
  },
  gender: {
      type:String     
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = Profile = mongoose.model('profile', ProfileSchema);