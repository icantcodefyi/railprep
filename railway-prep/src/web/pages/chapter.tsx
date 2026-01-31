import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { mockChapter, type ChapterData } from "../../data/mockChapterData";

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  </svg>
);

const difficultyColors: Record<string, string> = {
  EASY: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20",
  MEDIUM: "bg-[#FACC15]/10 text-[#F59E0B] border border-[#FACC15]/20",
  HARD: "bg-red-100 text-red-600 border border-red-200",
};

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch from API first, fallback to mock data
    fetch(`/api/v1/chapters/${chapterId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChapter(data.data);
        } else {
          // Use mock data if API fails
          if (chapterId === mockChapter.id) {
            setChapter(mockChapter);
          }
        }
      })
      .catch(() => {
        // Use mock data on error
        if (chapterId === mockChapter.id) {
          setChapter(mockChapter);
        }
      })
      .finally(() => setLoading(false));
  }, [chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white px-5 py-6 mb-6">
          <div className="max-w-3xl mx-auto h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
        </header>
        <main className="max-w-3xl mx-auto px-5 pb-8 flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white rounded-2xl animate-pulse shadow-sm"
            />
          ))}
        </main>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white px-5 py-6 mb-6">
        <div className="max-w-3xl mx-auto">
          <Link href={`/subject/${chapter.subject.id}`}>
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] mb-4 font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {chapter.subject.name}
            </a>
          </Link>
          <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p className="text-sm text-gray-600">{chapter.description}</p>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 pb-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Practice MCQs Card */}
          {chapter.mcqCount > 0 && (
            <Link href={`/practice/${chapter.id}`}>
              <a className="block p-6 bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] hover:from-[#D94069] hover:to-[#F17FA0] rounded-2xl transition-all duration-200 text-white shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <PlayIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Practice MCQs
                    </h3>
                    <p className="text-xs text-white/90">
                      {chapter.mcqCount} questions
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          )}

          {/* Flashcards Card */}
          <Link href={`/flashcards/${chapter.id}`}>
            <a className="block p-6 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-2xl transition-all duration-200 text-white shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🎴</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">Flashcards</h3>
                  <p className="text-xs text-white/90">Quick revision mode</p>
                </div>
              </div>
            </a>
          </Link>
        </div>

        {/* Lessons List */}
        {chapter.lessons.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#1F2937] mb-2">
                Lessons
              </h2>
              <p className="text-sm text-gray-600">
                {chapter.lessons.length} lessons to complete
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {chapter.lessons.map((lesson, idx) => (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <a className="block p-6 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-[#1F2937] flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#1F2937] text-base mb-3">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            {lesson.durationMinutes && (
                              <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                {lesson.durationMinutes} min
                              </span>
                            )}
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyColors[lesson.difficulty] || "bg-gray-100 text-gray-600"}`}
                            >
                              {lesson.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center group-hover:bg-[#EB4B7A] transition-colors duration-200">
                        <ChevronRight className="w-5 h-5 text-[#EB4B7A] group-hover:text-white transition-colors duration-200" />
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </>
        )}

        {chapter.lessons.length === 0 && chapter.mcqCount === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500">No content available yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
