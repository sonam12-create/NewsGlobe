// models/noteModel.js
import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  content: { type: String, required: true },
}, { timestamps: true })

const noteModel = mongoose.models.note || mongoose.model('note', noteSchema)

export default noteModel
