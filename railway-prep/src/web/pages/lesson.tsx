import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import AIChat from "../components/ai-chat";
import { mockLesson, type LessonData, type Note, type Topic, type MemoryTrick } from "../../data/mockLessonData";

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

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.33.47 2.48 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
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
    // Use mock data instead of API
    setTimeout(() => {
      setLesson(mockLesson);
      setLoading(false);
    }, 300);
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
        {/* AI Chat Component */}
        <AIChat 
          lessonContext={{
            title: lesson.title,
            content: lesson.content
          }}
        />
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

        {/* Memory Tricks & Topics */}
        {lesson.topics && lesson.topics.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-sm border-2 border-purple-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BrainIcon className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-purple-900 text-lg">Memory Tricks & Easy Ways to Remember</h3>
            </div>
            <p className="text-sm text-purple-700 mb-4">These tricks will help you remember concepts quickly for the exam!</p>
            
            {lesson.topics.map(topic => (
              <div key={topic.id} className="mb-5 last:mb-0 bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-purple-900 text-base mb-3 flex items-center gap-2">
                  <LightbulbIcon className="w-5 h-5 text-amber-500" />
                  {topic.title}
                </h4>
                <div className="space-y-3">
                  {topic.memoryTricks.map((trick, idx) => (
                    <div key={idx} className="pl-4 border-l-4 border-amber-400 bg-amber-50/50 p-3 rounded-r-lg">
                      <p className="font-medium text-gray-800 text-sm mb-1">
                        📌 {trick.concept}
                      </p>
                      <p className="text-purple-700 text-sm font-semibold mb-1">
                        💡 Trick: {trick.trick}
                      </p>
                      {trick.example && (
                        <p className="text-gray-600 text-xs italic">
                          Example: {trick.example}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Revision Points */}
        {lesson.quickRevisionPoints && lesson.quickRevisionPoints.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border-2 border-green-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-green-900 text-lg">Quick Revision Points</h3>
            </div>
            <p className="text-sm text-green-700 mb-4">Skim through these before the exam!</p>
            <div className="grid gap-2">
              {lesson.quickRevisionPoints.map((point, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-green-100 text-sm text-gray-800">
                  {point}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Common Mistakes */}
        {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-sm border-2 border-red-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertIcon className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-red-900 text-lg">Common Mistakes to Avoid</h3>
            </div>
            <p className="text-sm text-red-700 mb-4">Don't fall into these traps!</p>
            <div className="space-y-2">
              {lesson.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-red-100 text-sm text-gray-800">
                  {mistake}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Tips */}
        {lesson.examTips && lesson.examTips.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm border-2 border-blue-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <LightbulbIcon className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-blue-900 text-lg">Exam Tips & Strategy</h3>
            </div>
            <p className="text-sm text-blue-700 mb-4">Smart tips to score better!</p>
            <div className="space-y-2">
              {lesson.examTips.map((tip, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100 text-sm text-gray-800">
                  {tip}
                </div>
              ))}
            </div>
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
