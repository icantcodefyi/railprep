// Mock data for Chapter page

export interface ChapterLesson {
  id: string;
  title: string;
  durationMinutes: number | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface ChapterData {
  id: string;
  title: string;
  description: string | null;
  subject: { id: string; name: string };
  exam: { id: string; name: string };
  lessons: ChapterLesson[];
  mcqCount: number;
}

export const mockChapter: ChapterData = {
  id: 'ch-indian-polity',
  title: 'Indian Polity & Governance',
  description: 'Learn about the Indian Constitution, governance structure, and political system - essential for Railway exams',
  subject: {
    id: 'subj-general-awareness',
    name: 'General Awareness'
  },
  exam: {
    id: 'exam-rrb-ntpc',
    name: 'RRB NTPC'
  },
  lessons: [
    {
      id: 'lesson-preamble',
      title: 'Preamble of Indian Constitution',
      durationMinutes: 15,
      difficulty: 'EASY'
    },
    {
      id: 'lesson-constitution-basics',
      title: 'Indian Constitution - Basics & Key Articles',
      durationMinutes: 25,
      difficulty: 'MEDIUM'
    },
    {
      id: 'lesson-parliament',
      title: 'Indian Parliament Structure',
      durationMinutes: 20,
      difficulty: 'MEDIUM'
    },
    {
      id: 'lesson-fundamental-rights',
      title: 'Fundamental Rights in Detail',
      durationMinutes: 30,
      difficulty: 'MEDIUM'
    },
    {
      id: 'lesson-dpsp',
      title: 'Directive Principles of State Policy',
      durationMinutes: 20,
      difficulty: 'MEDIUM'
    },
    {
      id: 'lesson-fundamental-duties',
      title: 'Fundamental Duties',
      durationMinutes: 15,
      difficulty: 'EASY'
    },
    {
      id: 'lesson-president',
      title: 'President of India - Powers & Functions',
      durationMinutes: 25,
      difficulty: 'HARD'
    },
    {
      id: 'lesson-prime-minister',
      title: 'Prime Minister & Council of Ministers',
      durationMinutes: 20,
      difficulty: 'MEDIUM'
    },
    {
      id: 'lesson-judiciary',
      title: 'Indian Judiciary System',
      durationMinutes: 30,
      difficulty: 'HARD'
    },
    {
      id: 'lesson-amendments',
      title: 'Important Constitutional Amendments',
      durationMinutes: 25,
      difficulty: 'HARD'
    }
  ],
  mcqCount: 150
};

// Function to get chapter by ID
export function getChapterById(id: string): ChapterData | null {
  if (id === mockChapter.id) {
    return mockChapter;
  }
  return null;
}

// Export all chapters (for future expansion)
export const allChapters: ChapterData[] = [mockChapter];
