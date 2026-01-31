import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";

interface Note {
  id: string;
  title: string;
  content: string;
  isHighlighted: boolean;
}

interface LessonData {
  id: string;
  title: string;
  content: string;
  durationMinutes: number | null;
  difficulty: string;
  chapter: { id: string; title: string };
  subject: { id: string; name: string };
  exam: { id: string; name: string };
  notes: Note[];
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Simple markdown renderer
function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1 mb-4 text-gray-700">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  lines.forEach((line, idx) => {
    // Headers
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={idx} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={idx} className="text-lg font-semibold text-gray-900 mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(line.slice(2));
    } else if (line.startsWith('|')) {
      // Skip table formatting for now
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      // Handle bold text
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={idx} className="text-gray-700 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    }
  });

  flushList();
  return elements;
}

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/lessons/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setLesson(data.data);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto h-6 w-32 bg-gray-100 rounded animate-pulse" />
        </header>
        <main className="max-w-3xl mx-auto px-5 py-8">
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-white rounded-xl animate-pulse shadow-sm" />
            <div className="h-6 w-full bg-white rounded-xl animate-pulse shadow-sm" />
            <div className="h-6 w-full bg-white rounded-xl animate-pulse shadow-sm" />
            <div className="h-6 w-2/3 bg-white rounded-xl animate-pulse shadow-sm" />
          </div>
        </main>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-gray-500">Lesson not found</p>
      </div>
    );
  }

  const highlightedNotes = lesson.notes.filter(n => n.isHighlighted);
  const regularNotes = lesson.notes.filter(n => !n.isHighlighted);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <Link href={`/chapter/${lesson.chapter.id}`}>
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {lesson.chapter.title}
            </a>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        {/* Title */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-3">{lesson.title}</h1>
          <div className="flex items-center gap-3">
            {lesson.durationMinutes && (
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                {lesson.durationMinutes} min read
              </span>
            )}
            <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${
              lesson.difficulty === 'EASY' ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20' :
              lesson.difficulty === 'HARD' ? 'bg-red-100 text-red-600 border border-red-200' :
              'bg-[#FACC15]/10 text-[#F59E0B] border border-[#FACC15]/20'
            }`}>
              {lesson.difficulty}
            </span>
          </div>
        </div>

        {/* Important Notes */}
        {highlightedNotes.length > 0 && (
          <div className="mb-6 p-6 bg-gradient-to-br from-[#EB4B7A]/5 to-[#F58FB0]/5 border-2 border-[#EB4B7A]/20 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <StarIcon className="w-5 h-5 text-[#EB4B7A]" />
              <span className="font-semibold text-[#EB4B7A] text-base">Important Notes</span>
            </div>
            {highlightedNotes.map(note => (
              <div key={note.id} className="mb-4 last:mb-0 bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                <h4 className="font-semibold text-[#1F2937] text-sm mb-2">{note.title}</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="prose prose-gray max-w-none">
            {renderMarkdown(lesson.content)}
          </div>
        </div>

        {/* Regular Notes */}
        {regularNotes.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="font-semibold text-[#1F2937] text-lg mb-4">Quick Notes</h3>
            {regularNotes.map(note => (
              <div key={note.id} className="mb-4 last:mb-0 p-4 bg-[#F9FAFB] rounded-xl">
                <h4 className="font-semibold text-[#1F2937] text-sm mb-2">{note.title}</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          {lesson.prevLesson ? (
            <Link href={`/lesson/${lesson.prevLesson.id}`}>
              <a className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors group">
                <div className="w-8 h-8 rounded-full bg-[#F9FAFB] group-hover:bg-[#EB4B7A] flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4 group-hover:text-white transition-colors" />
                </div>
                <span className="max-w-[140px] truncate">Previous</span>
              </a>
            </Link>
          ) : <div />}
          
          {lesson.nextLesson ? (
            <Link href={`/lesson/${lesson.nextLesson.id}`}>
              <a className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors group">
                <span className="max-w-[140px] truncate">Next</span>
                <div className="w-8 h-8 rounded-full bg-[#F9FAFB] group-hover:bg-[#EB4B7A] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 group-hover:text-white transition-colors" />
                </div>
              </a>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
