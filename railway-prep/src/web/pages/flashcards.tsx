import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Badge } from "../components/ui/badge";
import { mockFlashcards } from "../../data/mockFlashcardData";

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

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function FlashcardsPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<"all" | "unknown">("all");

  useEffect(() => {
    // Try to fetch from API, fallback to mock data
    fetch(`/api/v1/chapters/${chapterId}/flashcards`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setFlashcards(data.data);
        } else {
          // Use mock data
          setFlashcards(mockFlashcards);
        }
      })
      .catch(() => {
        // Use mock data on error
        setFlashcards(mockFlashcards);
      })
      .finally(() => setLoading(false));
  }, [chapterId]);

  const currentCard = flashcards[currentIndex];
  const displayCards =
    mode === "unknown"
      ? flashcards.filter((card) => unknownCards.has(card.id))
      : flashcards;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < displayCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(displayCards.length - 1);
    }
  };

  const handleKnown = () => {
    setKnownCards((prev) => new Set([...prev, currentCard.id]));
    setUnknownCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  };

  const handleUnknown = () => {
    setUnknownCards((prev) => new Set([...prev, currentCard.id]));
    setKnownCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  };

  const handleReset = () => {
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#EB4B7A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm">
          <div className="max-w-4xl mx-auto">
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
            <p className="text-gray-500">
              No flashcards available for this chapter
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#FFF1F2]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 px-5 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/chapter/${chapterId}`}>
            <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Exit
            </a>
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="success" className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3" />
              {knownCards.size}
            </Badge>
            <Badge variant="warning" className="flex items-center gap-1">
              <XIcon className="w-3 h-3" />
              {unknownCards.size}
            </Badge>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              title="Reset progress"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Card {currentIndex + 1} of {displayCards.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode("all")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mode === "all"
                    ? "bg-[#EB4B7A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Cards
              </button>
              <button
                onClick={() => setMode("unknown")}
                disabled={unknownCards.size === 0}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mode === "unknown"
                    ? "bg-[#EB4B7A] text-white"
                    : unknownCards.size === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Review ({unknownCards.size})
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / displayCards.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <div
            className={`relative w-full min-h-[400px] cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleFlip}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 bg-white rounded-3xl p-12 shadow-2xl border-2 border-gray-100 backface-hidden ${
                isFlipped ? "invisible" : "visible"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="info">Question</Badge>
                  <Badge
                    variant={
                      currentCard.difficulty === "EASY"
                        ? "success"
                        : currentCard.difficulty === "HARD"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {currentCard.difficulty}
                  </Badge>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#1F2937] text-center leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>
                <p className="text-sm text-gray-400 text-center mt-6">
                  Click to reveal answer
                </p>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] rounded-3xl p-12 shadow-2xl backface-hidden rotate-y-180 ${
                isFlipped ? "visible" : "invisible"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-white/20 text-white border-white/30">
                    Answer
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {currentCard.topic}
                  </Badge>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
                <p className="text-sm text-white/70 text-center mt-6">
                  Click to see question again
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            className="p-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#EB4B7A] hover:shadow-lg transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#EB4B7A]" />
          </button>

          {isFlipped && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleUnknown}
                className="px-8 py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <XIcon className="w-5 h-5" />
                Need Practice
              </button>
              <button
                onClick={handleKnown}
                className="px-8 py-4 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-600 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <CheckIcon className="w-5 h-5" />
                Got It!
              </button>
            </div>
          )}

          <button
            onClick={handleNext}
            className="p-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#EB4B7A] hover:shadow-lg transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#EB4B7A]" />
          </button>
        </div>

        {/* Stats */}
        {(knownCards.size > 0 || unknownCards.size > 0) && (
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#1F2937] mb-4">Session Progress</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-500">
                  {knownCards.size}
                </p>
                <p className="text-sm text-gray-600 mt-1">Known</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">
                  {unknownCards.size}
                </p>
                <p className="text-sm text-gray-600 mt-1">Need Practice</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-400">
                  {flashcards.length - knownCards.size - unknownCards.size}
                </p>
                <p className="text-sm text-gray-600 mt-1">Not Reviewed</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
