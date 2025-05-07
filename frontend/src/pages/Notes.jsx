import { useState, useEffect, useContext } from 'react'
import { NewsContext } from '../context/NewsContext'
import axios from 'axios'

const Notes = () => {
  const { backendUrl, token } = useContext(NewsContext)
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchNotes = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${backendUrl}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(res.data.notes || [])
    } catch (err) {
      setError('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  const createNote = async () => {
    if (!content) return alert('Please enter some content for the note.')
    setLoading(true)
    setError('')
    try {
      await axios.post(
        `${backendUrl}/api/notes`,
        { content },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        }
      )
      setContent('')
      fetchNotes()
    } catch (err) {
      setError('Failed to save note')
    } finally {
      setLoading(false)
    }
  }

  const downloadNote = (text, index) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `note-${index + 1}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (token) fetchNotes()
  }, [token])

  return (
    <div className="p-4 max-w-xl mx-auto">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full border rounded p-2"
        rows="4"
        placeholder="Write your note here..."
      />
      <button
        onClick={createNote}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Note'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h2 className="mt-6 font-bold text-lg">Your Notes:</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        notes.map((note, index) => (
          <div key={note._id} className="border p-2 my-2 rounded shadow-sm">
            <p>{note.content}</p>
            <button
              onClick={() => downloadNote(note.content, index)}
              className="text-sm text-blue-600 mt-1 underline"
            >
              Download
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Notes

