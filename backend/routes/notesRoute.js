// routes/noteRoutes.js
import express from 'express'
import noteModel from '../models/noteModel.js'
import authUser from '../middlewares/authUser.js'

const noteRouter = express.Router()

// Create Note
noteRouter.post('/', authUser, async (req, res) => {
  const { content } = req.body
  const note = new noteModel({ userId: req.userId, content })
  await note.save()
  res.json({ success: true, note })

})

// Get All Notes of Logged-in User
noteRouter.get('/', authUser, async (req, res) => {
  const notes = await noteModel.find({ userId: req.userId }).sort({ createdAt: -1 })
  res.json({ success: true, notes })
})

export default noteRouter
