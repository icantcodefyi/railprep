// Mock data for Railway Exam Preparation
// This includes memory techniques and easy-to-remember tips for quick revision

export interface Note {
  id: string;
  title: string;
  content: string;
  isHighlighted: boolean;
}

export interface MemoryTrick {
  concept: string;
  trick: string;
  example?: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  memoryTricks: MemoryTrick[];
}

export interface PracticeQuestion {
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

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface LessonData {
  id: string;
  title: string;
  content: string;
  durationMinutes: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  chapter: { id: string; title: string };
  subject: { id: string; name: string };
  exam: { id: string; name: string };
  notes: Note[];
  topics: Topic[];
  quickRevisionPoints: string[];
  commonMistakes: string[];
  examTips: string[];
  practiceQuestions?: PracticeQuestion[];
  flashcards?: Flashcard[];
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

// Mock lesson: Indian Constitution for Railway Exams
export const mockLesson: LessonData = {
  id: 'lesson-constitution-basics',
  title: 'Indian Constitution - Basics & Key Articles',
  content: `## Introduction to Indian Constitution

The **Indian Constitution** is the supreme law of India. It was adopted on **26th November 1949** and came into effect on **26th January 1950**.

### Key Facts (Must Remember!)

- **Longest written constitution** in the world
- **Original**: 395 Articles, 22 Parts, 8 Schedules
- **Current**: 470+ Articles, 25 Parts, 12 Schedules
- **Father of Constitution**: Dr. B.R. Ambedkar
- **Drafted by**: Constituent Assembly (299 members)
- **Time taken**: 2 years, 11 months, 18 days

## Important Parts of Constitution

### Part I - The Union and its Territory
- Articles 1-4
- Defines India as "Union of States"
- Territory of India

### Part II - Citizenship
- Articles 5-11
- Who is an Indian citizen
- Rights of citizenship

### Part III - Fundamental Rights
- Articles 12-35
- **6 Fundamental Rights** (originally 7, Right to Property removed in 1978)
- Most important for exams!

### Part IV - Directive Principles of State Policy (DPSP)
- Articles 36-51
- Guidelines for government
- Not enforceable by courts

### Part IVA - Fundamental Duties
- Article 51A
- **11 Fundamental Duties**
- Added by 42nd Amendment (1976)

## The 6 Fundamental Rights

### 1. Right to Equality (Articles 14-18)
- Equality before law
- No discrimination
- Abolition of untouchability
- Abolition of titles (except military & academic)

### 2. Right to Freedom (Articles 19-22)
- **6 Freedoms under Article 19(1)**:
  - Speech & Expression
  - Assembly
  - Association
  - Movement
  - Residence
  - Profession

### 3. Right against Exploitation (Articles 23-24)
- Prohibition of human trafficking
- Child labor prohibition (below 14 years)

### 4. Right to Freedom of Religion (Articles 25-28)
- Freedom of conscience
- Right to practice religion
- Secular state

### 5. Cultural & Educational Rights (Articles 29-30)
- Protection of minorities
- Right to conserve culture
- Right to establish educational institutions

### 6. Right to Constitutional Remedies (Article 32)
- **"Heart & Soul of Constitution"** - Dr. Ambedkar
- Right to move Supreme Court
- **5 Writs**: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto

## Important Amendments (Frequently Asked)

- **1st Amendment (1951)**: Added 9th Schedule
- **42nd Amendment (1976)**: "Mini Constitution" - Added Fundamental Duties
- **44th Amendment (1978)**: Removed Right to Property from Fundamental Rights
- **61st Amendment (1989)**: Reduced voting age from 21 to 18
- **73rd Amendment (1992)**: Panchayati Raj
- **74th Amendment (1992)**: Municipalities
- **86th Amendment (2002)**: Right to Education (Article 21A)
- **101st Amendment (2016)**: GST Implementation

## Schedules (Important Ones)

- **1st Schedule**: List of States & Union Territories
- **2nd Schedule**: Salaries of officials
- **3rd Schedule**: Forms of Oaths
- **5th Schedule**: Administration of Scheduled Areas
- **6th Schedule**: Administration of Tribal Areas (NE states)
- **7th Schedule**: Distribution of powers (Union, State, Concurrent Lists)
- **8th Schedule**: Recognized Languages (originally 14, now **22 languages**)
- **9th Schedule**: Land reforms & other acts (added by 1st Amendment)
- **10th Schedule**: Anti-Defection Law (added by 52nd Amendment, 1985)
- **11th Schedule**: Panchayati Raj (added by 73rd Amendment)
- **12th Schedule**: Municipalities (added by 74th Amendment)`,
  
  durationMinutes: 25,
  difficulty: 'MEDIUM',
  
  chapter: {
    id: 'ch-indian-polity',
    title: 'Indian Polity & Governance'
  },
  
  subject: {
    id: 'subj-general-awareness',
    name: 'General Awareness'
  },
  
  exam: {
    id: 'exam-rrb-ntpc',
    name: 'RRB NTPC'
  },
  
  notes: [
    {
      id: 'note-1',
      title: '🎯 Must Remember Dates',
      content: `• Adopted: 26 Nov 1949 (Constitution Day)
• Enforced: 26 Jan 1950 (Republic Day)
• Time taken: 2 years 11 months 18 days
• Constituent Assembly: 299 members
• Sessions: 11 sessions, 165 days`,
      isHighlighted: true
    },
    {
      id: 'note-2',
      title: '⚡ Quick Numbers',
      content: `• Original: 395 Articles, 22 Parts, 8 Schedules
• Current: 470+ Articles, 25 Parts, 12 Schedules
• Fundamental Rights: 6 (originally 7)
• Fundamental Duties: 11
• Languages in 8th Schedule: 22
• Writs: 5`,
      isHighlighted: true
    },
    {
      id: 'note-3',
      title: '🔥 Hot Topics for Exams',
      content: `• 6 Fundamental Rights (most questions from here!)
• 5 Writs and their meanings
• Important Amendments: 42nd, 44th, 73rd, 74th, 86th, 101st
• 7th Schedule: Union, State, Concurrent Lists
• Article 370 (Removed in 2019)
• Article 356 (President's Rule)`,
      isHighlighted: true
    },
    {
      id: 'note-4',
      title: 'Important Articles Quick Reference',
      content: `• Article 1: Name and territory of India
• Article 14: Equality before law
• Article 19: Six freedoms
• Article 21: Right to life & personal liberty
• Article 21A: Right to Education
• Article 32: Constitutional remedies (Heart & Soul)
• Article 51A: Fundamental Duties
• Article 356: President's Rule
• Article 368: Amendment procedure`,
      isHighlighted: false
    }
  ],
  
  topics: [
    {
      id: 'topic-1',
      title: 'Fundamental Rights',
      content: 'The 6 Fundamental Rights are the most important constitutional provisions for railway exams.',
      memoryTricks: [
        {
          concept: '6 Fundamental Rights',
          trick: 'Remember "EEFCRC" or think "Every Educated Fellow Can Read Constitution"',
          example: 'Equality, Exploitation, Freedom, Cultural, Religion, Constitutional Remedies'
        },
        {
          concept: '6 Freedoms under Article 19',
          trick: 'Remember "SAAMRP" - "Sab Aaram Se Rahenge Peacefully"',
          example: 'Speech, Assembly, Association, Movement, Residence, Profession'
        },
        {
          concept: '5 Writs',
          trick: 'Remember "HMPCQ" - "Hum Milke Protect Karenge Quietly"',
          example: 'Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto'
        }
      ]
    },
    {
      id: 'topic-2',
      title: 'Important Amendments',
      content: 'Focus on amendments that changed the structure or added new features.',
      memoryTricks: [
        {
          concept: '42nd Amendment',
          trick: 'Remember "42 = Mini Constitution" (like 42 is the answer to everything in Hitchhiker\'s Guide)',
          example: 'Added Fundamental Duties, Socialist, Secular, Integrity to Preamble'
        },
        {
          concept: '73rd & 74th Amendments',
          trick: 'Remember "73 = Rural (Panchayat), 74 = Urban (Municipality)" - Sequential numbers!',
          example: '73rd for villages, 74th for cities'
        },
        {
          concept: '86th Amendment',
          trick: 'Think "86 = 8+6 = 14 years" (Right to Education for 6-14 years)',
          example: 'Added Article 21A - Right to Education'
        }
      ]
    },
    {
      id: 'topic-3',
      title: 'Schedules',
      content: 'There are 12 schedules in the Indian Constitution.',
      memoryTricks: [
        {
          concept: '7th Schedule',
          trick: 'Remember "7 = Lucky number = Distribution of LUCK (powers)"',
          example: 'Contains Union List (97 subjects), State List (61), Concurrent List (47)'
        },
        {
          concept: '8th Schedule',
          trick: 'Remember "8 = Ate (Languages we speak)" - 22 languages',
          example: 'Originally 14, now 22 recognized languages'
        },
        {
          concept: '10th Schedule',
          trick: 'Remember "10 = Perfect 10 = No Defection allowed"',
          example: 'Anti-Defection Law - prevents MLAs/MPs from switching parties'
        }
      ]
    }
  ],
  
  quickRevisionPoints: [
    '📅 26 Nov 1949 (Adopted) → 26 Jan 1950 (Enforced)',
    '👨‍⚖️ Father: Dr. B.R. Ambedkar, Chairman of Drafting Committee',
    '📊 Original: 395 Articles, 22 Parts, 8 Schedules',
    '🎯 6 Fundamental Rights (Article 12-35)',
    '✍️ 11 Fundamental Duties (Article 51A)',
    '📜 5 Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto',
    '🔢 22 Languages in 8th Schedule',
    '⚖️ 7th Schedule: Union (97), State (61), Concurrent (47) Lists',
    '🏛️ 42nd Amendment = Mini Constitution',
    '🗳️ 61st Amendment: Voting age 21→18',
    '🏘️ 73rd (Panchayat) & 74th (Municipality) Amendments',
    '📚 86th Amendment: Right to Education (Article 21A)'
  ],
  
  commonMistakes: [
    '❌ Confusing adoption date (26 Nov 1949) with enforcement date (26 Jan 1950)',
    '❌ Saying 7 Fundamental Rights instead of 6 (Right to Property removed in 1978)',
    '❌ Mixing up 73rd (Rural/Panchayat) and 74th (Urban/Municipality) amendments',
    '❌ Forgetting that Article 32 is called "Heart & Soul" by Dr. Ambedkar',
    '❌ Confusing number of languages in 8th Schedule (22, not 18 or 20)',
    '❌ Wrong number of freedoms under Article 19 (6 freedoms, not 7)',
    '❌ Mixing up schedules - especially 7th (Lists) and 8th (Languages)'
  ],
  
  examTips: [
    '💡 Focus on numbers: 6 rights, 11 duties, 5 writs, 22 languages',
    '💡 Learn amendment numbers: 42nd, 44th, 61st, 73rd, 74th, 86th, 101st',
    '💡 Memorize important articles: 14, 19, 21, 21A, 32, 51A, 356, 368',
    '💡 Use mnemonics for lists (6 rights, 6 freedoms, 5 writs)',
    '💡 Remember dates: 26 Nov (Adoption), 26 Jan (Enforcement)',
    '💡 Practice MCQs on Fundamental Rights - most common topic!',
    '💡 Know the difference between Fundamental Rights (enforceable) and DPSP (not enforceable)',
    '💡 Recent amendments are frequently asked - especially GST (101st)'
  ],

  practiceQuestions: [
    {
      id: 'q1',
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
      id: 'q2',
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
      id: 'q3',
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
      id: 'q4',
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
      id: 'q5',
      question: 'How many languages are recognized in the 8th Schedule of the Constitution?',
      optionA: '18',
      optionB: '20',
      optionC: '22',
      optionD: '24',
      correctOption: 'C',
      explanation: 'The 8th Schedule of the Indian Constitution currently recognizes 22 languages. Originally, it had 14 languages.',
      difficulty: 'EASY'
    }
  ],

  flashcards: [
    {
      id: 'fc1',
      question: 'When was the Indian Constitution adopted and enforced?',
      answer: 'Adopted: 26th November 1949 (Constitution Day)\nEnforced: 26th January 1950 (Republic Day)',
      topic: 'Basic Facts',
      difficulty: 'EASY'
    },
    {
      id: 'fc2',
      question: 'Who is known as the Father of the Indian Constitution?',
      answer: 'Dr. B.R. Ambedkar, who was the Chairman of the Drafting Committee of the Constituent Assembly.',
      topic: 'Basic Facts',
      difficulty: 'EASY'
    },
    {
      id: 'fc3',
      question: 'List the 6 Fundamental Rights',
      answer: '1. Right to Equality (14-18)\n2. Right to Freedom (19-22)\n3. Right against Exploitation (23-24)\n4. Right to Freedom of Religion (25-28)\n5. Cultural & Educational Rights (29-30)\n6. Right to Constitutional Remedies (32)',
      topic: 'Fundamental Rights',
      difficulty: 'MEDIUM'
    },
    {
      id: 'fc4',
      question: 'What are the 5 Writs under Article 32?',
      answer: '1. Habeas Corpus - produce the person\n2. Mandamus - command to perform duty\n3. Prohibition - stop lower court\n4. Certiorari - quash order\n5. Quo Warranto - question authority',
      topic: 'Fundamental Rights',
      difficulty: 'HARD'
    },
    {
      id: 'fc5',
      question: 'What is the 42nd Amendment known for?',
      answer: 'Known as "Mini Constitution" (1976):\n- Added Fundamental Duties\n- Added Socialist, Secular, Integrity to Preamble\n- Made extensive constitutional changes',
      topic: 'Amendments',
      difficulty: 'MEDIUM'
    },
    {
      id: 'fc6',
      question: 'Difference between 73rd and 74th Amendments?',
      answer: '73rd Amendment (1992): Panchayati Raj - Rural local governance\n74th Amendment (1992): Municipalities - Urban local governance',
      topic: 'Amendments',
      difficulty: 'MEDIUM'
    }
  ],
  
  prevLesson: {
    id: 'lesson-preamble',
    title: 'Preamble of Indian Constitution'
  },
  
  nextLesson: {
    id: 'lesson-parliament',
    title: 'Indian Parliament Structure'
  }
};

// Export function to get lesson by ID (for future expansion)
export function getLessonById(id: string): LessonData | null {
  if (id === mockLesson.id) {
    return mockLesson;
  }
  return null;
}

// Export all lessons (for future expansion)
export const allLessons: LessonData[] = [mockLesson];
