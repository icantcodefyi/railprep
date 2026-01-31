import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";

interface Chapter {
  id: string;
  title: string;
  description: string | null;
  lessonCount: number;
  mcqCount: number;
}

interface SubjectData {
  id: string;
  name: string;
  exam: { id: string; name: string };
  chapters: Chapter[];
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

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/subjects/${subjectId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setSubject(data.data);
      })
      .finally(() => setLoading(false));
  }, [subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white px-5 py-6 mb-6">
          <div className="max-w-3xl mx-auto h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
        </header>
        <main className="max-w-3xl mx-auto px-5 pb-8 flex flex-col gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-white rounded-2xl animate-pulse shadow-sm" />
          ))}
        </main>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-gray-500">Subject not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white px-5 py-6 mb-6">
        <div className="max-w-3xl mx-auto">
          <Link href={`/exam/${subject.exam.id}`}>
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] mb-4 font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {subject.exam.name}
            </a>
          </Link>
          <h1 className="text-2xl font-semibold text-[#1F2937]">{subject.name}</h1>
        </div>
      </header>

      {/* Chapters List */}
      <main className="max-w-3xl mx-auto px-5 pb-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-2">
            Chapters
          </h2>
          <p className="text-sm text-gray-600">{subject.chapters.length} chapters to master</p>
        </div>

        <div className="flex flex-col gap-6">
          {subject.chapters.map((chapter, idx) => (
            <Link key={chapter.id} href={`/chapter/${chapter.id}`}>
              <a className="block p-6 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] text-white flex items-center justify-center text-base font-semibold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1F2937] text-base mb-3">{chapter.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4B7A]"></span>
                          {chapter.lessonCount} Lessons
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                          {chapter.mcqCount} MCQs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center group-hover:bg-[#EB4B7A] transition-colors duration-200 shrink-0">
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
