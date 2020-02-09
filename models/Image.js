const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    uri: {
        type: String,
        required: true
    },
    createDate : {
        type: Date,
        default: Date.now
    },
    description : {
        type: String
    },
    likes: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
    ],
    comments:[
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]

});
    
module.exports = Images = mongoose.model('images', ImageSchema);