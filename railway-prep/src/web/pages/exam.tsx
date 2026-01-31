import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";

interface Subject {
  id: string;
  name: string;
  chapterCount: number;
}

interface ExamData {
  id: string;
  name: string;
  description: string | null;
  subjects: Subject[];
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

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

export default function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/exams/${examId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setExam(data.data);
      })
      .finally(() => setLoading(false));
  }, [examId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
          <div className="max-w-3xl mx-auto h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
        </header>
        <main className="max-w-3xl mx-auto px-5 py-8 space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 bg-white rounded-2xl animate-pulse shadow-sm" />
          ))}
        </main>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-gray-500">Exam not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] mb-3 font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back to Exams
            </a>
          </Link>
          <h1 className="text-2xl font-semibold text-[#1F2937]">{exam.name}</h1>
        </div>
      </header>

      {/* Subjects List */}
      <main className="max-w-3xl mx-auto px-5 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-1">
            Subjects
          </h2>
          <p className="text-sm text-gray-600">{exam.subjects.length} subjects available</p>
        </div>

        <div className="space-y-4">
          {exam.subjects.map(subject => (
            <Link key={subject.id} href={`/subject/${subject.id}`}>
              <a className="block p-5 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EB4B7A]/10 to-[#F58FB0]/10 flex items-center justify-center">
                      <BookIcon className="w-6 h-6 text-[#EB4B7A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937] text-base mb-1">{subject.name}</h3>
                      <p className="text-sm text-gray-600">
                        {subject.chapterCount} {subject.chapterCount === 1 ? 'Chapter' : 'Chapters'}
                      </p>
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
      </main>
    </div>
  );
}
