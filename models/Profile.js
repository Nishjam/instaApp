const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
      type: String,
      require:true,
      max:20
  },
  website: {
      type: String
  },
  Bio: {
      type: String
  },
  email: {
      type: String,
      require: true
  },
  gender: {
      type:String     
  }

});
module.exports = Profile = mongoose.model('profile', ProfileSchema);