import { useState, useEffect } from "react";
import { Link } from "wouter";
import { mockLesson } from "../../data/mockLessonData";
import { allExams, type ExamData } from "../../data/mockExamData";
import { mockChapter } from "../../data/mockChapterData";

const TrainIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="3" width="16" height="16" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <circle cx="16" cy="15" r="1" fill="currentColor" />
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

export default function Index() {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setExams(data.data);
        } else {
          // Use mock data if API fails
          setExams(allExams);
        }
      })
      .catch(() => {
        // Use mock data on error
        setExams(allExams);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white px-5 py-6 mb-6 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] flex items-center justify-center">
                <TrainIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1F2937]">
                  Railway Prep
                </h1>
                <p className="text-sm text-gray-500">RRB Exam Preparation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/voice-assistant">
                <a className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#8b9a7d] hover:bg-gray-100 rounded-xl transition-all">
                  AI Voice
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Content Cards */}
      <main className="max-w-3xl mx-auto px-5 pb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Demo Chapter Card */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📚</span>
              <h2 className="text-base font-bold text-purple-900">
                Demo Chapter
              </h2>
            </div>
            <p className="text-sm text-purple-700 mb-4">
              Explore a full chapter with lessons, practice questions & flashcards!
            </p>
            <Link href={`/chapter/${mockChapter.id}`}>
              <a className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 group text-sm">
                <span>View Chapter</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>

          {/* Demo Lesson Card */}
          <div className="p-6 bg-gradient-to-br from-[#EB4B7A]/10 to-[#F58FB0]/10 rounded-2xl border-2 border-[#EB4B7A]/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎓</span>
              <h2 className="text-base font-bold text-[#1F2937]">
                Demo Lesson
              </h2>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Sample lesson with memory tricks & AI chatbot!
            </p>
            <Link href={`/lesson/${mockLesson.id}`}>
              <a className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 group text-sm">
                <span>View Lesson</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-2">
            Choose Your Exam
          </h2>
          <p className="text-sm text-gray-600">
            Select an exam to start your preparation journey
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-white rounded-2xl animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {exams.map((exam) => (
              <Link key={exam.id} href={`/exam/${exam.id}`}>
                <a className="block p-6 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1F2937] text-lg mb-2">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exam.subjectCount || exam.subjects?.length || 0}{" "}
                        {(exam.subjectCount || exam.subjects?.length || 0) === 1 ? "Subject" : "Subjects"}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center group-hover:bg-[#EB4B7A] transition-colors duration-200">
                      <ChevronRight className="w-5 h-5 text-[#EB4B7A] group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
