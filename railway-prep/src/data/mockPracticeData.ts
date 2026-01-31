// Mock data for Practice MCQs

export interface MCQ {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const mockMCQs: MCQ[] = [
  {
    id: 'mcq-1',
    question: 'When was the Indian Constitution adopted?',
    optionA: '26th January 1950',
    optionB: '26th November 1949',
    optionC: '15th August 1947',
    optionD: '26th January 1949',
    correctOption: 'B',
    explanation: 'The Indian Constitution was adopted on 26th November 1949, but it came into effect on 26th January 1950, which is celebrated as Republic Day.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-2',
    question: 'How many Fundamental Rights are there in the Indian Constitution?',
    optionA: '5',
    optionB: '6',
    optionC: '7',
    optionD: '8',
    correctOption: 'B',
    explanation: 'There are 6 Fundamental Rights in the Indian Constitution. Originally there were 7, but the Right to Property was removed from Fundamental Rights in 1978 by the 44th Amendment.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-3',
    question: 'Which article is called the "Heart and Soul" of the Constitution?',
    optionA: 'Article 14',
    optionB: 'Article 19',
    optionC: 'Article 21',
    optionD: 'Article 32',
    correctOption: 'D',
    explanation: 'Dr. B.R. Ambedkar called Article 32 (Right to Constitutional Remedies) the "Heart and Soul" of the Constitution as it provides the right to move to the Supreme Court for enforcement of Fundamental Rights.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-4',
    question: 'Which amendment is known as the "Mini Constitution"?',
    optionA: '42nd Amendment',
    optionB: '44th Amendment',
    optionC: '73rd Amendment',
    optionD: '86th Amendment',
    correctOption: 'A',
    explanation: 'The 42nd Amendment (1976) is called the "Mini Constitution" because it made extensive changes to the Constitution, including adding Fundamental Duties and the words Socialist, Secular, and Integrity to the Preamble.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-5',
    question: 'How many languages are recognized in the 8th Schedule of the Constitution?',
    optionA: '18',
    optionB: '20',
    optionC: '22',
    optionD: '24',
    correctOption: 'C',
    explanation: 'The 8th Schedule of the Indian Constitution currently recognizes 22 languages. Originally, it had 14 languages.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-6',
    question: 'Who is known as the Father of the Indian Constitution?',
    optionA: 'Mahatma Gandhi',
    optionB: 'Dr. B.R. Ambedkar',
    optionC: 'Jawaharlal Nehru',
    optionD: 'Sardar Patel',
    correctOption: 'B',
    explanation: 'Dr. B.R. Ambedkar is known as the Father of the Indian Constitution. He was the Chairman of the Drafting Committee of the Constituent Assembly.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-7',
    question: 'Which article deals with the Right to Equality before law?',
    optionA: 'Article 12',
    optionB: 'Article 14',
    optionC: 'Article 19',
    optionD: 'Article 21',
    correctOption: 'B',
    explanation: 'Article 14 guarantees equality before law and equal protection of laws within the territory of India.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-8',
    question: 'How many freedoms are guaranteed under Article 19?',
    optionA: '4',
    optionB: '5',
    optionC: '6',
    optionD: '7',
    correctOption: 'C',
    explanation: 'Article 19 guarantees 6 freedoms: Speech & Expression, Assembly, Association, Movement, Residence, and Profession.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-9',
    question: 'Which amendment reduced the voting age from 21 to 18 years?',
    optionA: '42nd Amendment',
    optionB: '52nd Amendment',
    optionC: '61st Amendment',
    optionD: '73rd Amendment',
    correctOption: 'C',
    explanation: 'The 61st Amendment Act of 1989 reduced the voting age from 21 to 18 years for Lok Sabha and State Assembly elections.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-10',
    question: 'Which schedule contains the list of states and union territories?',
    optionA: '1st Schedule',
    optionB: '2nd Schedule',
    optionC: '7th Schedule',
    optionD: '8th Schedule',
    correctOption: 'A',
    explanation: 'The 1st Schedule of the Indian Constitution contains the list of States and Union Territories.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-11',
    question: 'Which amendment added the Right to Education as a Fundamental Right?',
    optionA: '73rd Amendment',
    optionB: '86th Amendment',
    optionC: '93rd Amendment',
    optionD: '101st Amendment',
    correctOption: 'B',
    explanation: 'The 86th Amendment Act of 2002 inserted Article 21A, making education a Fundamental Right for children aged 6-14 years.',
    difficulty: 'HARD'
  },
  {
    id: 'mcq-12',
    question: 'How many writs can be issued by the Supreme Court under Article 32?',
    optionA: '3',
    optionB: '4',
    optionC: '5',
    optionD: '6',
    correctOption: 'C',
    explanation: 'The Supreme Court can issue 5 types of writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-13',
    question: 'Which part of the Constitution deals with Fundamental Duties?',
    optionA: 'Part III',
    optionB: 'Part IV',
    optionC: 'Part IVA',
    optionD: 'Part V',
    correctOption: 'C',
    explanation: 'Part IVA (Article 51A) of the Constitution deals with Fundamental Duties, which were added by the 42nd Amendment in 1976.',
    difficulty: 'HARD'
  },
  {
    id: 'mcq-14',
    question: 'How many Fundamental Duties are there in the Indian Constitution?',
    optionA: '10',
    optionB: '11',
    optionC: '12',
    optionD: '13',
    correctOption: 'B',
    explanation: 'There are 11 Fundamental Duties in the Indian Constitution under Article 51A.',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-15',
    question: 'Which amendment is related to the Goods and Services Tax (GST)?',
    optionA: '99th Amendment',
    optionB: '100th Amendment',
    optionC: '101st Amendment',
    optionD: '102nd Amendment',
    correctOption: 'C',
    explanation: 'The 101st Amendment Act of 2016 introduced the Goods and Services Tax (GST) in India.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-16',
    question: 'Which schedule deals with the Anti-Defection Law?',
    optionA: '8th Schedule',
    optionB: '9th Schedule',
    optionC: '10th Schedule',
    optionD: '11th Schedule',
    correctOption: 'C',
    explanation: 'The 10th Schedule contains the Anti-Defection Law, which was added by the 52nd Amendment Act of 1985.',
    difficulty: 'HARD'
  },
  {
    id: 'mcq-17',
    question: 'Which article prohibits child labor below the age of 14 years?',
    optionA: 'Article 21',
    optionB: 'Article 23',
    optionC: 'Article 24',
    optionD: 'Article 25',
    correctOption: 'C',
    explanation: 'Article 24 prohibits the employment of children below the age of 14 years in factories, mines, or any other hazardous work.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mcq-18',
    question: 'Which part of the Constitution contains Directive Principles of State Policy?',
    optionA: 'Part III',
    optionB: 'Part IV',
    optionC: 'Part IVA',
    optionD: 'Part V',
    correctOption: 'B',
    explanation: 'Part IV (Articles 36-51) of the Constitution contains the Directive Principles of State Policy (DPSP).',
    difficulty: 'EASY'
  },
  {
    id: 'mcq-19',
    question: 'How long did it take to draft the Indian Constitution?',
    optionA: '2 years, 11 months, 18 days',
    optionB: '3 years, 6 months, 10 days',
    optionC: '2 years, 6 months, 15 days',
    optionD: '3 years, 11 months, 5 days',
    correctOption: 'A',
    explanation: 'The Constituent Assembly took 2 years, 11 months, and 18 days to draft the Indian Constitution.',
    difficulty: 'HARD'
  },
  {
    id: 'mcq-20',
    question: 'Which amendment is related to Panchayati Raj?',
    optionA: '72nd Amendment',
    optionB: '73rd Amendment',
    optionC: '74th Amendment',
    optionD: '75th Amendment',
    correctOption: 'B',
    explanation: 'The 73rd Amendment Act of 1992 gave constitutional status to Panchayati Raj institutions (rural local governance).',
    difficulty: 'MEDIUM'
  }
];

// Function to get MCQs by chapter ID
export function getMCQsByChapterId(chapterId: string): MCQ[] {
  // For now, return all mock MCQs for any chapter
  // In a real app, you would filter by chapter
  return mockMCQs;
}
