// Mock data for Flashcards

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const mockFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    question: 'When was the Indian Constitution adopted and enforced?',
    answer: 'Adopted: 26th November 1949 (Constitution Day)\nEnforced: 26th January 1950 (Republic Day)',
    topic: 'Basic Facts',
    difficulty: 'EASY'
  },
  {
    id: 'fc-2',
    question: 'Who is known as the Father of the Indian Constitution?',
    answer: 'Dr. B.R. Ambedkar, who was the Chairman of the Drafting Committee of the Constituent Assembly.',
    topic: 'Basic Facts',
    difficulty: 'EASY'
  },
  {
    id: 'fc-3',
    question: 'List the 6 Fundamental Rights',
    answer: '1. Right to Equality (14-18)\n2. Right to Freedom (19-22)\n3. Right against Exploitation (23-24)\n4. Right to Freedom of Religion (25-28)\n5. Cultural & Educational Rights (29-30)\n6. Right to Constitutional Remedies (32)',
    topic: 'Fundamental Rights',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-4',
    question: 'What are the 5 Writs under Article 32?',
    answer: '1. Habeas Corpus - produce the person\n2. Mandamus - command to perform duty\n3. Prohibition - stop lower court\n4. Certiorari - quash order\n5. Quo Warranto - question authority',
    topic: 'Fundamental Rights',
    difficulty: 'HARD'
  },
  {
    id: 'fc-5',
    question: 'What is the 42nd Amendment known for?',
    answer: 'Known as "Mini Constitution" (1976):\n- Added Fundamental Duties\n- Added Socialist, Secular, Integrity to Preamble\n- Made extensive constitutional changes',
    topic: 'Amendments',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-6',
    question: 'Difference between 73rd and 74th Amendments?',
    answer: '73rd Amendment (1992): Panchayati Raj - Rural local governance\n74th Amendment (1992): Municipalities - Urban local governance',
    topic: 'Amendments',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-7',
    question: 'How many languages are in the 8th Schedule?',
    answer: '22 languages are recognized in the 8th Schedule of the Constitution. Originally there were 14 languages.',
    topic: 'Schedules',
    difficulty: 'EASY'
  },
  {
    id: 'fc-8',
    question: 'What does the 7th Schedule contain?',
    answer: 'The 7th Schedule contains three lists:\n- Union List (97 subjects)\n- State List (61 subjects)\n- Concurrent List (47 subjects)',
    topic: 'Schedules',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-9',
    question: 'What is Article 32 known as?',
    answer: 'Article 32 is called the "Heart and Soul" of the Constitution by Dr. Ambedkar. It provides the Right to Constitutional Remedies.',
    topic: 'Fundamental Rights',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-10',
    question: 'How many Fundamental Duties are there?',
    answer: '11 Fundamental Duties under Article 51A, added by the 42nd Amendment in 1976.',
    topic: 'Fundamental Duties',
    difficulty: 'EASY'
  },
  {
    id: 'fc-11',
    question: 'What is the Anti-Defection Law?',
    answer: 'The 10th Schedule contains the Anti-Defection Law (52nd Amendment, 1985) which prevents MLAs/MPs from switching parties.',
    topic: 'Schedules',
    difficulty: 'HARD'
  },
  {
    id: 'fc-12',
    question: 'Which article deals with Right to Education?',
    answer: 'Article 21A provides Right to Education for children aged 6-14 years. Added by 86th Amendment (2002).',
    topic: 'Fundamental Rights',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-13',
    question: 'What are the 6 freedoms under Article 19?',
    answer: '1. Speech & Expression\n2. Assembly\n3. Association\n4. Movement\n5. Residence\n6. Profession',
    topic: 'Fundamental Rights',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-14',
    question: 'When was the voting age reduced to 18?',
    answer: 'The 61st Amendment (1989) reduced the voting age from 21 to 18 years.',
    topic: 'Amendments',
    difficulty: 'EASY'
  },
  {
    id: 'fc-15',
    question: 'What is the GST Amendment?',
    answer: 'The 101st Amendment (2016) introduced the Goods and Services Tax (GST) in India.',
    topic: 'Amendments',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-16',
    question: 'Original structure of the Constitution?',
    answer: 'Original: 395 Articles, 22 Parts, 8 Schedules\nCurrent: 470+ Articles, 25 Parts, 12 Schedules',
    topic: 'Basic Facts',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-17',
    question: 'What is Article 14?',
    answer: 'Article 14 provides Equality before law and equal protection of laws within the territory of India.',
    topic: 'Fundamental Rights',
    difficulty: 'EASY'
  },
  {
    id: 'fc-18',
    question: 'What is Article 356?',
    answer: 'Article 356 deals with President\'s Rule - when the President takes over the administration of a state.',
    topic: 'Emergency Provisions',
    difficulty: 'HARD'
  },
  {
    id: 'fc-19',
    question: 'What are Directive Principles (DPSP)?',
    answer: 'Part IV (Articles 36-51) contains DPSP - guidelines for government policy. They are not enforceable by courts.',
    topic: 'DPSP',
    difficulty: 'MEDIUM'
  },
  {
    id: 'fc-20',
    question: 'How long did it take to draft the Constitution?',
    answer: '2 years, 11 months, and 18 days. The Constituent Assembly had 299 members and held 11 sessions over 165 days.',
    topic: 'Basic Facts',
    difficulty: 'HARD'
  }
];

// Function to get flashcards by chapter ID
export function getFlashcardsByChapterId(chapterId: string): Flashcard[] {
  // For now, return all mock flashcards for any chapter
  // In a real app, you would filter by chapter
  return mockFlashcards;
}
