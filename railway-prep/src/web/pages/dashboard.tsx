import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Progress } from "../components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const FlameIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
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

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
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

interface DashboardStats {
  streak: number;
  lessonsCompleted: number;
  totalLessons: number;
  mcqsAttempted: number;
  accuracy: number;
  studyTimeMinutes: number;
}

interface RecentActivity {
  id: string;
  type: "lesson" | "mcq" | "achievement";
  title: string;
  timestamp: string;
  metadata?: any;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    streak: 0,
    lessonsCompleted: 0,
    totalLessons: 500,
    mcqsAttempted: 0,
    accuracy: 0,
    studyTimeMinutes: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from API
    setTimeout(() => {
      setStats({
        streak: 5,
        lessonsCompleted: 23,
        totalLessons: 500,
        mcqsAttempted: 145,
        accuracy: 78,
        studyTimeMinutes: 320,
      });
      setLoading(false);
    }, 500);
  }, []);

  const completionPercentage =
    (stats.lessonsCompleted / stats.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-5 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#EB4B7A] font-medium transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Home
              </a>
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937]">My Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Streak Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                  <FlameIcon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="warning" className="font-bold">
                  🔥 Hot!
                </Badge>
              </div>
              <p className="text-3xl font-bold text-[#1F2937] mb-1">
                {stats.streak} Days
              </p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </CardContent>
          </Card>

          {/* Lessons Progress */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="purple">
                  {Math.round(completionPercentage)}%
                </Badge>
              </div>
              <p className="text-3xl font-bold text-[#1F2937] mb-1">
                {stats.lessonsCompleted}
              </p>
              <p className="text-sm text-gray-600">Lessons Completed</p>
              <Progress
                value={stats.lessonsCompleted}
                max={stats.totalLessons}
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* MCQ Accuracy */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="success">Good</Badge>
              </div>
              <p className="text-3xl font-bold text-[#1F2937] mb-1">
                {stats.accuracy}%
              </p>
              <p className="text-sm text-gray-600">MCQ Accuracy</p>
              <p className="text-xs text-gray-500 mt-2">
                {stats.mcqsAttempted} questions attempted
              </p>
            </CardContent>
          </Card>

          {/* Study Time */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="info">This Week</Badge>
              </div>
              <p className="text-3xl font-bold text-[#1F2937] mb-1">
                {Math.floor(stats.studyTimeMinutes / 60)}h{" "}
                {stats.studyTimeMinutes % 60}m
              </p>
              <p className="text-sm text-gray-600">Study Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
            Continue Learning
          </h2>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge variant="warning" className="mb-3">
                    In Progress
                  </Badge>
                  <h3 className="text-lg font-bold text-[#1F2937] mb-2">
                    Indian Constitution - Fundamental Rights
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Chapter 3 • 45% Complete
                  </p>
                  <Progress value={45} max={100} className="mb-3" />
                  <Link href="/lesson/demo-lesson-1">
                    <a className="inline-flex items-center gap-2 text-[#EB4B7A] font-semibold text-sm hover:gap-3 transition-all">
                      Resume Learning
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
            Recent Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-3">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-1">First Week</h3>
                <p className="text-xs text-gray-600">
                  Completed 7 days of learning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center mx-auto mb-3">
                  <TargetIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-1">Sharp Shooter</h3>
                <p className="text-xs text-gray-600">
                  80%+ accuracy on 10 quizzes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-3">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-1">Bookworm</h3>
                <p className="text-xs text-gray-600">Completed 20 lessons</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Study Plan */}
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
            Recommended for You
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="danger" className="mb-3">
                  Needs Practice
                </Badge>
                <h3 className="font-bold text-[#1F2937] mb-2">
                  General Science - Physics
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your accuracy is 62% - Practice more to improve
                </p>
                <Link href="/subject/physics">
                  <a className="inline-flex items-center gap-2 text-[#EB4B7A] font-semibold text-sm hover:gap-3 transition-all">
                    Start Practicing
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="success" className="mb-3">
                  Strong Topic
                </Badge>
                <h3 className="font-bold text-[#1F2937] mb-2">
                  Indian History - Ancient India
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Great job! 92% accuracy - Keep it up
                </p>
                <Link href="/subject/history">
                  <a className="inline-flex items-center gap-2 text-[#EB4B7A] font-semibold text-sm hover:gap-3 transition-all">
                    Continue Topic
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
