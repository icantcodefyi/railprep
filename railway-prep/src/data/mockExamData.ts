// Mock data for Exam page

export interface ExamSubject {
  id: string;
  name: string;
  chapterCount: number;
}

export interface ExamData {
  id: string;
  name: string;
  description: string | null;
  subjects: ExamSubject[];
  subjectCount?: number;
}

export const mockExam: ExamData = {
  id: 'exam-rrb-ntpc',
  name: 'RRB NTPC',
  description: 'Railway Recruitment Board - Non-Technical Popular Categories',
  subjectCount: 3,
  subjects: [
    {
      id: 'subj-general-awareness',
      name: 'General Awareness',
      chapterCount: 5
    },
    {
      id: 'subj-mathematics',
      name: 'Mathematics',
      chapterCount: 8
    },
    {
      id: 'subj-general-intelligence',
      name: 'General Intelligence & Reasoning',
      chapterCount: 6
    }
  ]
};

// Function to get exam by ID
export function getExamById(id: string): ExamData | null {
  if (id === mockExam.id) {
    return mockExam;
  }
  return null;
}

// Export all exams (for future expansion)
export const allExams: ExamData[] = [mockExam];
