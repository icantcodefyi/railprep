import { useState, useEffect } from "react";
import { Link } from "wouter";

interface Exam {
  id: string;
  name: string;
  description: string | null;
  subjectCount: number;
}

const TrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="3" width="16" height="16" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <circle cx="16" cy="15" r="1" fill="currentColor" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Index() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/exams")
      .then(res => res.json())
      .then(data => {
        if (data.success) setExams(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] flex items-center justify-center shadow-lg shadow-pink-200">
            <TrainIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#1F2937]">Railway Prep</h1>
            <p className="text-sm text-gray-500">RRB Exam Preparation</p>
          </div>
        </div>
      </header>

      {/* Exams List */}
      <main className="max-w-3xl mx-auto px-5 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-1">
            Choose Your Exam
          </h2>
          <p className="text-sm text-gray-600">Select an exam to start your preparation journey</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-white rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map(exam => (
              <Link key={exam.id} href={`/exam/${exam.id}`}>
                <a className="block p-5 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1F2937] text-lg mb-1">{exam.name}</h3>
                      <p className="text-sm text-gray-600">
                        {exam.subjectCount} {exam.subjectCount === 1 ? 'Subject' : 'Subjects'}
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
