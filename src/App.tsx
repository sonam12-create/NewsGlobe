import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsCard } from './components/NewsCard';
import { NotesList } from './components/NotesList';
import { ThemeToggle } from './components/ThemeToggle';
import { NoteModal } from './components/NoteModal';
import { NewsArticle, Note } from './types';
import { Newspaper, AlertCircle, PenSquare } from 'lucide-react';

function App() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          'https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&apikey=240ab4ed7c52cf406c3c24ce8664dd3a',
          { signal: AbortSignal.timeout(10000) }
        );
        
        if (!mounted) return;

        if (response.data.errors) {
          throw new Error(response.data.errors[0] || 'Failed to fetch news');
        }

        const articles = response.data.articles || [];
        setNews(articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.image,
          publishedAt: article.publishedAt,
          source: {
            name: article.source.name
          }
        })));
      } catch (err) {
        if (!mounted) return;
        
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('Failed to fetch news');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleTakeNote = (article: NewsArticle) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: article.title,
      content: article.description,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleSaveNote = ({ title, content }: { title: string; content: string }) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setIsNoteModalOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleDownloadNotes = () => {
    const notesText = notes
      .map(
        (note) =>
          `Title: ${note.title}\nDate: ${new Date(
            note.createdAt
          ).toLocaleDateString()}\nContent: ${note.content}\n\n`
      )
      .join('---\n\n');

    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-news-notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors`}>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              NewsGlobe
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <PenSquare className="w-5 h-5" />
              <span>Take Notes</span>
            </button>
            <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Latest News</h2>
            {loading ? (
              <div className="text-gray-600 dark:text-gray-400">Loading news...</div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {news.map((article, index) => (
                  <NewsCard
                    key={index}
                    article={article}
                    onTakeNote={handleTakeNote}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <NotesList
              notes={notes}
              onDeleteNote={handleDeleteNote}
              onDownloadNotes={handleDownloadNotes}
            />
          </div>
        </div>
      </main>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSaveNote={handleSaveNote}
        onDownloadNotes={handleDownloadNotes}
      />
    </div>
  );
}

export default App;