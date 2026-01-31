import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Badge } from "../components/ui/badge";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

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

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

interface SearchResult {
  id: string;
  type: "lesson" | "chapter" | "mcq";
  title: string;
  excerpt: string;
  path: string;
  metadata?: {
    subject?: string;
    difficulty?: string;
    chapter?: string;
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    difficulty: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        ...(filters.type !== "all" && { type: filters.type }),
        ...(filters.difficulty !== "all" && { difficulty: filters.difficulty }),
      });

      const response = await fetch(`/api/v1/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Home
              </a>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, chapters, MCQs..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#EB4B7A] focus:ring-2 focus:ring-[#EB4B7A]/20 transition-all"
                autoFocus
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl transition-all ${
                showFilters
                  ? "bg-[#EB4B7A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FilterIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-slide-up">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EB4B7A]"
                  >
                    <option value="all">All Types</option>
                    <option value="lesson">Lessons</option>
                    <option value="chapter">Chapters</option>
                    <option value="mcq">MCQs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) =>
                      setFilters({ ...filters, difficulty: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#EB4B7A]"
                  >
                    <option value="all">All Levels</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#EB4B7A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : query.length < 2 ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Start Searching
            </h3>
            <p className="text-gray-500">
              Type at least 2 characters to search
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">Try different keywords or filters</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for
              "{query}"
            </p>
            <div className="space-y-4">
              {results.map((result) => (
                <Link key={result.id} href={result.path}>
                  <a className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#EB4B7A] hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          result.type === "lesson"
                            ? "bg-purple-100"
                            : result.type === "chapter"
                              ? "bg-blue-100"
                              : "bg-green-100"
                        }`}
                      >
                        {result.type === "lesson" ? (
                          <BookOpenIcon
                            className={`w-6 h-6 ${
                              result.type === "lesson" ? "text-purple-600" : ""
                            }`}
                          />
                        ) : result.type === "mcq" ? (
                          <TargetIcon className="w-6 h-6 text-green-600" />
                        ) : (
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={
                              result.type === "lesson"
                                ? "purple"
                                : result.type === "chapter"
                                  ? "info"
                                  : "success"
                            }
                          >
                            {result.type.toUpperCase()}
                          </Badge>
                          {result.metadata?.difficulty && (
                            <Badge
                              variant={
                                result.metadata.difficulty === "EASY"
                                  ? "success"
                                  : result.metadata.difficulty === "HARD"
                                    ? "danger"
                                    : "warning"
                              }
                            >
                              {result.metadata.difficulty}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-[#1F2937] mb-2 group-hover:text-[#EB4B7A] transition-colors">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {result.excerpt}
                        </p>
                        {result.metadata?.subject && (
                          <p className="text-xs text-gray-500">
                            {result.metadata.subject}
                            {result.metadata.chapter &&
                              ` • ${result.metadata.chapter}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
