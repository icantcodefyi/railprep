import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

// ============ ENUMS (as text with validation) ============
export const difficultyEnum = ['EASY', 'MEDIUM', 'HARD'] as const
export type Difficulty = typeof difficultyEnum[number]

export const bookmarkTypeEnum = ['LESSON', 'NOTE', 'MCQ'] as const
export type BookmarkType = typeof bookmarkTypeEnum[number]

// ============ EXAMS ============
export const exams = sqliteTable('exams', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  year: integer('year'),
  iconUrl: text('icon_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const examsRelations = relations(exams, ({ many }) => ({
  subjects: many(subjects),
}))

// ============ SUBJECTS ============
export const subjects = sqliteTable('subjects', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  examId: text('exam_id').notNull().references(() => exams.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  orderIndex: integer('order_index').default(0),
  iconUrl: text('icon_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  exam: one(exams, {
    fields: [subjects.examId],
    references: [exams.id],
  }),
  chapters: many(chapters),
}))

// ============ CHAPTERS ============
export const chapters = sqliteTable('chapters', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  subjectId: text('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  orderIndex: integer('order_index').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [chapters.subjectId],
    references: [subjects.id],
  }),
  lessons: many(lessons),
  mcqs: many(mcqs),
}))

// ============ LESSONS ============
export const lessons = sqliteTable('lessons', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  chapterId: text('chapter_id').notNull().references(() => chapters.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(), // Markdown content
  durationMinutes: integer('duration_minutes'),
  difficulty: text('difficulty').$type<Difficulty>().default('MEDIUM'),
  orderIndex: integer('order_index').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [lessons.chapterId],
    references: [chapters.id],
  }),
  notes: many(notes),
  progress: many(userLessonProgress),
}))

// ============ NOTES ============
export const notes = sqliteTable('notes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  lessonId: text('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  isHighlighted: integer('is_highlighted', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const notesRelations = relations(notes, ({ one }) => ({
  lesson: one(lessons, {
    fields: [notes.lessonId],
    references: [lessons.id],
  }),
}))

// ============ MCQS ============
export const mcqs = sqliteTable('mcqs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  chapterId: text('chapter_id').notNull().references(() => chapters.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  optionA: text('option_a').notNull(),
  optionB: text('option_b').notNull(),
  optionC: text('option_c').notNull(),
  optionD: text('option_d').notNull(),
  correctOption: text('correct_option').notNull(), // 'A', 'B', 'C', 'D'
  explanation: text('explanation'),
  difficulty: text('difficulty').$type<Difficulty>().default('MEDIUM'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const mcqsRelations = relations(mcqs, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [mcqs.chapterId],
    references: [chapters.id],
  }),
  attempts: many(mcqAttempts),
}))

// ============ USERS ============
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  lessonProgress: many(userLessonProgress),
  mcqAttempts: many(mcqAttempts),
  bookmarks: many(bookmarks),
}))

// ============ USER LESSON PROGRESS ============
export const userLessonProgress = sqliteTable('user_lesson_progress', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: text('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  progressPercent: integer('progress_percent').default(0),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
})

export const userLessonProgressRelations = relations(userLessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [userLessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userLessonProgress.lessonId],
    references: [lessons.id],
  }),
}))

// ============ MCQ ATTEMPTS ============
export const mcqAttempts = sqliteTable('mcq_attempts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  mcqId: text('mcq_id').notNull().references(() => mcqs.id, { onDelete: 'cascade' }),
  selectedOption: text('selected_option').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  attemptedAt: integer('attempted_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const mcqAttemptsRelations = relations(mcqAttempts, ({ one }) => ({
  user: one(users, {
    fields: [mcqAttempts.userId],
    references: [users.id],
  }),
  mcq: one(mcqs, {
    fields: [mcqAttempts.mcqId],
    references: [mcqs.id],
  }),
}))

// ============ BOOKMARKS ============
export const bookmarks = sqliteTable('bookmarks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<BookmarkType>().notNull(),
  referenceId: text('reference_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}))

// ============ MOCK TESTS (Optional) ============
export const mockTests = sqliteTable('mock_tests', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  examId: text('exam_id').notNull().references(() => exams.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  durationMinutes: integer('duration_minutes').default(60),
  totalMarks: integer('total_marks').default(100),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const mockTestQuestions = sqliteTable('mock_test_questions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  mockTestId: text('mock_test_id').notNull().references(() => mockTests.id, { onDelete: 'cascade' }),
  mcqId: text('mcq_id').notNull().references(() => mcqs.id, { onDelete: 'cascade' }),
  orderIndex: integer('order_index').default(0),
  marks: integer('marks').default(1),
})
