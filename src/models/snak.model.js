import mongoose from 'mongoose'
import shortid from 'shortid'

const { Schema } = mongoose
const snaks = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: { type: String },
  description: String,
  version: { type: String, default: '1' },
  tech: { type: String, default: '' },
  techVersion: { type: String, default: '' },
  screenshot: {
    small: { type: String },
    medium: { type: String },
    big: { type: String }
  },
  tags: [{ type: String }],
  duration: { type: Number, default: 120 },
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: String, ref: 'Comment' }],
  author: { type: String, ref: 'User' },
  assets: [
    {
      type: { type: String },
      size: Number,
      src: String,
      name: String,
      audioDuration: Number
    }
  ],
  data: String
}, { timestamps: true })

export default mongoose.model('snaks', snaks)
