import { useState, useEffect } from "react";
import { Link } from "wouter";
import { mockLesson } from "../../data/mockLessonData";

interface Exam {
  id: string;
  name: string;
  description: string | null;
  subjectCount: number;
}

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
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setExams(data.data);
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
              <Link href="/search">
                <a className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#EB4B7A] hover:bg-gray-100 rounded-xl transition-all">
                  Search
                </a>
              </Link>
              <Link href="/dashboard">
                <a className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] text-white rounded-xl hover:shadow-lg transition-all">
                  Dashboard
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Lesson Card */}
      <main className="max-w-3xl mx-auto px-5 pb-8">
        <div className="mb-8 p-6 bg-gradient-to-br from-[#EB4B7A]/10 to-[#F58FB0]/10 rounded-2xl border-2 border-[#EB4B7A]/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎓</span>
            <h2 className="text-lg font-bold text-[#1F2937]">
              Demo Lesson Available!
            </h2>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Check out our sample lesson with memory tricks, quick revision
            points, and AI chatbot assistance!
          </p>
          <Link href={`/lesson/${mockLesson.id}`}>
            <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 group">
              <span>View Demo Lesson: {mockLesson.title}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
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
                        {exam.subjectCount}{" "}
                        {exam.subjectCount === 1 ? "Subject" : "Subjects"}
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
