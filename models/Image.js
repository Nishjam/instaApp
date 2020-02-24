const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    uri: {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    name :{
      type:String
    },
    avatar :{
      type: String
    },
    date : {
      type: Date,
      default: Date.now
  },
    likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
    ],
  
});
    
module.exports = Image = mongoose.model('image', ImageSchema);