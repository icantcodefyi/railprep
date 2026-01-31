// Mock data for Subject page

export interface SubjectChapter {
  id: string;
  title: string;
  description: string | null;
  lessonCount: number;
  mcqCount: number;
}

export interface SubjectData {
  id: string;
  name: string;
  exam: { id: string; name: string };
  chapters: SubjectChapter[];
}

export const mockSubject: SubjectData = {
  id: 'subj-general-awareness',
  name: 'General Awareness',
  exam: {
    id: 'exam-rrb-ntpc',
    name: 'RRB NTPC'
  },
  chapters: [
    {
      id: 'ch-indian-polity',
      title: 'Indian Polity & Governance',
      description: 'Learn about the Indian Constitution, governance structure, and political system',
      lessonCount: 10,
      mcqCount: 150
    },
    {
      id: 'ch-indian-history',
      title: 'Indian History',
      description: 'Ancient, Medieval, and Modern Indian History',
      lessonCount: 12,
      mcqCount: 180
    },
    {
      id: 'ch-indian-geography',
      title: 'Indian Geography',
      description: 'Physical and Human Geography of India',
      lessonCount: 8,
      mcqCount: 120
    },
    {
      id: 'ch-indian-economy',
      title: 'Indian Economy',
      description: 'Economic development, planning, and policies',
      lessonCount: 10,
      mcqCount: 140
    },
    {
      id: 'ch-current-affairs',
      title: 'Current Affairs',
      description: 'Latest national and international events',
      lessonCount: 15,
      mcqCount: 200
    }
  ]
};

// Function to get subject by ID
export function getSubjectById(id: string): SubjectData | null {
  if (id === mockSubject.id) {
    return mockSubject;
  }
  return null;
}

// Export all subjects (for future expansion)
export const allSubjects: SubjectData[] = [mockSubject];
