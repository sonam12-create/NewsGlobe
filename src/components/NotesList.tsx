import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Note } from '../types';

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  onDownloadNotes: () => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onDownloadNotes,
}) => {
  const handleDownloadSingleNote = (note: Note) => {
    const noteText = `Title: ${note.title}\nDate: ${new Date(
      note.createdAt
    ).toLocaleDateString()}\nContent: ${note.content}`;

    const blob = new Blob([noteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `note-${note.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold dark:text-white">My Notes</h2>
        {notes.length > 0 && (
          <button
            onClick={onDownloadNotes}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
        )}
      </div>
      {notes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No notes yet. Start by taking notes from news articles!</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold dark:text-white">{note.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadSingleNote(note)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                    title="Download note"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{note.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};