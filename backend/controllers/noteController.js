import noteModel from '../models/noteModel.js';

export const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    const Note = new noteModel({ userId, content });
    await Note.save();

    res.json({ success: true, Note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await noteModel.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
