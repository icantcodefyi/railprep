import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";

interface MCQ {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
}

interface AnswerResult {
  isCorrect: boolean;
  correctOption: string;
  explanation: string | null;
}

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function PracticePage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");

  useEffect(() => {
    // Fetch chapter info
    fetch(`/api/v1/chapters/${chapterId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setChapterTitle(data.data.title);
      });

    // Fetch MCQs
    fetch(`/api/v1/chapters/${chapterId}/mcqs?limit=50`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setMcqs(data.data);
      })
      .finally(() => setLoading(false));
  }, [chapterId]);

  const currentMCQ = mcqs[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (result) return; // Already answered
    setSelectedOption(option);
  };

  const handleCheck = async () => {
    if (!selectedOption || !currentMCQ) return;

    const res = await fetch(`/api/v1/mcqs/${currentMCQ.id}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedOption }),
    });
    const data = await res.json();
    
    if (data.success) {
      setResult(data.data);
      setScore(prev => ({
        correct: prev.correct + (data.data.isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setResult(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setResult(null);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#EB4B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <Link href={`/chapter/${chapterId}`}>
              <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Chapter
              </a>
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center py-20">
          <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500">No MCQs available for this chapter</p>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <Link href={`/chapter/${chapterId}`}>
              <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Chapter
              </a>
            </Link>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-5 py-12">
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg border border-gray-100">
            <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center text-4xl font-bold shadow-lg ${
              percentage >= 70 ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white' : 
              percentage >= 50 ? 'bg-gradient-to-br from-[#FACC15] to-[#F59E0B] text-white' : 
              'bg-gradient-to-br from-red-500 to-red-600 text-white'
            }`}>
              {percentage}%
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] mt-8">Practice Complete!</h2>
            <p className="text-gray-600 mt-3 text-lg">
              You got <span className="font-semibold text-[#EB4B7A]">{score.correct}</span> out of <span className="font-semibold">{score.total}</span> questions correct
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={handleRestart}
                className="px-8 py-3.5 bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-200"
              >
                Practice Again
              </button>
              <Link href={`/chapter/${chapterId}`}>
                <a className="px-8 py-3.5 bg-gray-100 text-[#1F2937] rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Back to Chapter
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const options = [
    { key: "A", value: currentMCQ.optionA },
    { key: "B", value: currentMCQ.optionB },
    { key: "C", value: currentMCQ.optionC },
    { key: "D", value: currentMCQ.optionD },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/chapter/${chapterId}`}>
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Exit
            </a>
          </Link>
          <span className="text-sm font-semibold text-[#1F2937]">
            {currentIndex + 1} / {mcqs.length}
          </span>
          <span className="text-sm font-semibold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
            {score.correct} correct
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
        />
      </div>

      <main className="max-w-3xl mx-auto px-5 py-8">
        {/* Question */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-lg text-[#1F2937] leading-relaxed font-medium">{currentMCQ.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {options.map(option => {
            const isSelected = selectedOption === option.key;
            const isCorrect = result?.correctOption === option.key;
            const isWrong = result && isSelected && !result.isCorrect;

            let bgClass = "bg-white hover:bg-gray-50";
            let borderClass = "border-gray-200";
            
            if (result) {
              if (isCorrect) {
                bgClass = "bg-[#22C55E]/5";
                borderClass = "border-[#22C55E]";
              } else if (isWrong) {
                bgClass = "bg-red-50";
                borderClass = "border-red-500";
              }
            } else if (isSelected) {
              bgClass = "bg-[#EB4B7A]/5";
              borderClass = "border-[#EB4B7A]";
            }

            return (
              <button
                key={option.key}
                onClick={() => handleOptionSelect(option.key)}
                disabled={!!result}
                className={`w-full p-5 rounded-2xl border-2 ${borderClass} ${bgClass} text-left transition-all duration-200 shadow-sm hover:shadow-md ${
                  result ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                    isCorrect ? 'bg-[#22C55E] text-white shadow-md shadow-green-200' :
                    isWrong ? 'bg-red-500 text-white shadow-md shadow-red-200' :
                    isSelected ? 'bg-[#EB4B7A] text-white shadow-md shadow-pink-200' :
                    'bg-gray-100 text-[#1F2937]'
                  }`}>
                    {isCorrect ? <CheckIcon className="w-5 h-5" /> :
                     isWrong ? <XIcon className="w-5 h-5" /> :
                     option.key}
                  </span>
                  <span className="text-[#1F2937] font-medium flex-1">{option.value}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {result?.explanation && (
          <div className={`p-6 rounded-2xl mb-8 shadow-sm border ${
            result.isCorrect 
              ? 'bg-[#22C55E]/5 border-[#22C55E]/20' 
              : 'bg-[#FACC15]/5 border-[#FACC15]/20'
          }`}>
            <p className="text-sm font-semibold text-[#1F2937] mb-2">Explanation</p>
            <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          {!result ? (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                selectedOption
                  ? 'bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] text-white hover:shadow-lg hover:shadow-pink-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3.5 bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-200"
            >
              {currentIndex < mcqs.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
