import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import * as schema from '../database/schema'
import { z } from 'zod'

const admin = new Hono()

// ============ VALIDATION SCHEMAS ============

const examSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  year: z.number().min(2020).max(2030).optional(),
  iconUrl: z.string().url().optional(),
})

const subjectSchema = z.object({
  examId: z.string().uuid(),
  name: z.string().min(1).max(100),
  orderIndex: z.number().default(0),
  iconUrl: z.string().url().optional(),
})

const chapterSchema = z.object({
  subjectId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  orderIndex: z.number().default(0),
})

const lessonSchema = z.object({
  chapterId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  durationMinutes: z.number().min(1).max(120).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  orderIndex: z.number().default(0),
})

const noteSchema = z.object({
  lessonId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  isHighlighted: z.boolean().default(false),
})

const mcqSchema = z.object({
  chapterId: z.string().uuid(),
  question: z.string().min(1).max(2000),
  optionA: z.string().min(1).max(500),
  optionB: z.string().min(1).max(500),
  optionC: z.string().min(1).max(500),
  optionD: z.string().min(1).max(500),
  correctOption: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().max(2000).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
})

// Bulk import schema for entire chapter
const bulkChapterImportSchema = z.object({
  examName: z.string(),
  subjectName: z.string(),
  chapter: z.object({
    title: z.string(),
    description: z.string().optional(),
    orderIndex: z.number().default(0),
  }),
  lessons: z.array(z.object({
    title: z.string(),
    content: z.string(),
    durationMinutes: z.number().optional(),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
    orderIndex: z.number().default(0),
    notes: z.array(z.object({
      title: z.string(),
      content: z.string(),
      isHighlighted: z.boolean().default(false),
    })).default([]),
  })).default([]),
  mcqs: z.array(z.object({
    question: z.string(),
    optionA: z.string(),
    optionB: z.string(),
    optionC: z.string(),
    optionD: z.string(),
    correctOption: z.enum(['A', 'B', 'C', 'D']),
    explanation: z.string().optional(),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  })).default([]),
})

// ============ EXAM ROUTES ============

admin.get('/exams', async (c) => {
  const database = db(c.env.DB)
  const allExams = await database.select().from(schema.exams)
  return c.json({ success: true, data: allExams })
})

admin.post('/exams', async (c) => {
  const body = await c.req.json()
  const parsed = examSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [exam] = await database.insert(schema.exams).values(parsed.data).returning()
  return c.json({ success: true, data: exam }, 201)
})

admin.put('/exams/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = examSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [exam] = await database.update(schema.exams)
    .set(parsed.data)
    .where(eq(schema.exams.id, id))
    .returning()
  
  if (!exam) return c.json({ success: false, error: 'Exam not found' }, 404)
  return c.json({ success: true, data: exam })
})

admin.delete('/exams/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.exams).where(eq(schema.exams.id, id))
  return c.json({ success: true, message: 'Exam deleted' })
})

// ============ SUBJECT ROUTES ============

admin.get('/subjects', async (c) => {
  const examId = c.req.query('examId')
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.subjects)
  if (examId) {
    query = query.where(eq(schema.subjects.examId, examId)) as typeof query
  }
  
  const allSubjects = await query
  return c.json({ success: true, data: allSubjects })
})

admin.post('/subjects', async (c) => {
  const body = await c.req.json()
  const parsed = subjectSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [subject] = await database.insert(schema.subjects).values(parsed.data).returning()
  return c.json({ success: true, data: subject }, 201)
})

admin.put('/subjects/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = subjectSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [subject] = await database.update(schema.subjects)
    .set(parsed.data)
    .where(eq(schema.subjects.id, id))
    .returning()
  
  if (!subject) return c.json({ success: false, error: 'Subject not found' }, 404)
  return c.json({ success: true, data: subject })
})

admin.delete('/subjects/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.subjects).where(eq(schema.subjects.id, id))
  return c.json({ success: true, message: 'Subject deleted' })
})

// ============ CHAPTER ROUTES ============

admin.get('/chapters', async (c) => {
  const subjectId = c.req.query('subjectId')
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.chapters)
  if (subjectId) {
    query = query.where(eq(schema.chapters.subjectId, subjectId)) as typeof query
  }
  
  const allChapters = await query
  return c.json({ success: true, data: allChapters })
})

admin.post('/chapters', async (c) => {
  const body = await c.req.json()
  const parsed = chapterSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [chapter] = await database.insert(schema.chapters).values(parsed.data).returning()
  return c.json({ success: true, data: chapter }, 201)
})

admin.put('/chapters/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = chapterSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [chapter] = await database.update(schema.chapters)
    .set(parsed.data)
    .where(eq(schema.chapters.id, id))
    .returning()
  
  if (!chapter) return c.json({ success: false, error: 'Chapter not found' }, 404)
  return c.json({ success: true, data: chapter })
})

admin.delete('/chapters/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.chapters).where(eq(schema.chapters.id, id))
  return c.json({ success: true, message: 'Chapter deleted' })
})

// ============ LESSON ROUTES ============

admin.get('/lessons', async (c) => {
  const chapterId = c.req.query('chapterId')
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.lessons)
  if (chapterId) {
    query = query.where(eq(schema.lessons.chapterId, chapterId)) as typeof query
  }
  
  const allLessons = await query
  return c.json({ success: true, data: allLessons })
})

admin.post('/lessons', async (c) => {
  const body = await c.req.json()
  const parsed = lessonSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [lesson] = await database.insert(schema.lessons).values(parsed.data).returning()
  return c.json({ success: true, data: lesson }, 201)
})

admin.put('/lessons/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = lessonSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [lesson] = await database.update(schema.lessons)
    .set(parsed.data)
    .where(eq(schema.lessons.id, id))
    .returning()
  
  if (!lesson) return c.json({ success: false, error: 'Lesson not found' }, 404)
  return c.json({ success: true, data: lesson })
})

admin.delete('/lessons/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.lessons).where(eq(schema.lessons.id, id))
  return c.json({ success: true, message: 'Lesson deleted' })
})

// ============ NOTE ROUTES ============

admin.get('/notes', async (c) => {
  const lessonId = c.req.query('lessonId')
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.notes)
  if (lessonId) {
    query = query.where(eq(schema.notes.lessonId, lessonId)) as typeof query
  }
  
  const allNotes = await query
  return c.json({ success: true, data: allNotes })
})

admin.post('/notes', async (c) => {
  const body = await c.req.json()
  const parsed = noteSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [note] = await database.insert(schema.notes).values(parsed.data).returning()
  return c.json({ success: true, data: note }, 201)
})

admin.put('/notes/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = noteSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [note] = await database.update(schema.notes)
    .set(parsed.data)
    .where(eq(schema.notes.id, id))
    .returning()
  
  if (!note) return c.json({ success: false, error: 'Note not found' }, 404)
  return c.json({ success: true, data: note })
})

admin.delete('/notes/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.notes).where(eq(schema.notes.id, id))
  return c.json({ success: true, message: 'Note deleted' })
})

// ============ MCQ ROUTES ============

admin.get('/mcqs', async (c) => {
  const chapterId = c.req.query('chapterId')
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.mcqs)
  if (chapterId) {
    query = query.where(eq(schema.mcqs.chapterId, chapterId)) as typeof query
  }
  
  const allMcqs = await query
  return c.json({ success: true, data: allMcqs })
})

admin.post('/mcqs', async (c) => {
  const body = await c.req.json()
  const parsed = mcqSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [mcq] = await database.insert(schema.mcqs).values(parsed.data).returning()
  return c.json({ success: true, data: mcq }, 201)
})

admin.post('/mcqs/bulk', async (c) => {
  const body = await c.req.json()
  const parsed = z.array(mcqSchema).safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const mcqs = await database.insert(schema.mcqs).values(parsed.data).returning()
  return c.json({ success: true, data: mcqs, count: mcqs.length }, 201)
})

admin.put('/mcqs/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = mcqSchema.partial().safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }
  
  const database = db(c.env.DB)
  const [mcq] = await database.update(schema.mcqs)
    .set(parsed.data)
    .where(eq(schema.mcqs.id, id))
    .returning()
  
  if (!mcq) return c.json({ success: false, error: 'MCQ not found' }, 404)
  return c.json({ success: true, data: mcq })
})

admin.delete('/mcqs/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  await database.delete(schema.mcqs).where(eq(schema.mcqs.id, id))
  return c.json({ success: true, message: 'MCQ deleted' })
})

// ============ BULK IMPORT - FULL CHAPTER ============

admin.post('/import/chapter', async (c) => {
  const body = await c.req.json()
  const parsed = bulkChapterImportSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }

  const data = parsed.data
  const database = db(c.env.DB)

  try {
    // 1. Find or create exam
    let [exam] = await database.select().from(schema.exams)
      .where(eq(schema.exams.name, data.examName))
      .limit(1)
    
    if (!exam) {
      [exam] = await database.insert(schema.exams)
        .values({ name: data.examName })
        .returning()
    }

    // 2. Find or create subject
    let [subject] = await database.select().from(schema.subjects)
      .where(eq(schema.subjects.examId, exam.id))
      .where(eq(schema.subjects.name, data.subjectName))
      .limit(1)
    
    if (!subject) {
      [subject] = await database.insert(schema.subjects)
        .values({ examId: exam.id, name: data.subjectName })
        .returning()
    }

    // 3. Create chapter
    const [chapter] = await database.insert(schema.chapters)
      .values({
        subjectId: subject.id,
        title: data.chapter.title,
        description: data.chapter.description,
        orderIndex: data.chapter.orderIndex,
      })
      .returning()

    // 4. Create lessons and their notes
    const createdLessons = []
    for (let i = 0; i < data.lessons.length; i++) {
      const lessonData = data.lessons[i]
      const [lesson] = await database.insert(schema.lessons)
        .values({
          chapterId: chapter.id,
          title: lessonData.title,
          content: lessonData.content,
          durationMinutes: lessonData.durationMinutes,
          difficulty: lessonData.difficulty,
          orderIndex: lessonData.orderIndex || i,
        })
        .returning()

      // Create notes for this lesson
      if (lessonData.notes && lessonData.notes.length > 0) {
        await database.insert(schema.notes).values(
          lessonData.notes.map(note => ({
            lessonId: lesson.id,
            title: note.title,
            content: note.content,
            isHighlighted: note.isHighlighted,
          }))
        )
      }

      createdLessons.push(lesson)
    }

    // 5. Create MCQs
    let createdMcqs: any[] = []
    if (data.mcqs && data.mcqs.length > 0) {
      createdMcqs = await database.insert(schema.mcqs)
        .values(data.mcqs.map(mcq => ({
          chapterId: chapter.id,
          question: mcq.question,
          optionA: mcq.optionA,
          optionB: mcq.optionB,
          optionC: mcq.optionC,
          optionD: mcq.optionD,
          correctOption: mcq.correctOption,
          explanation: mcq.explanation,
          difficulty: mcq.difficulty,
        })))
        .returning()
    }

    return c.json({
      success: true,
      data: {
        exam,
        subject,
        chapter,
        lessonsCount: createdLessons.length,
        mcqsCount: createdMcqs.length,
      },
      message: `Successfully imported chapter "${chapter.title}" with ${createdLessons.length} lessons and ${createdMcqs.length} MCQs`,
    }, 201)

  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message || 'Failed to import chapter',
    }, 500)
  }
})

// ============ BULK IMPORT - FULL SUBJECT ============

const bulkSubjectImportSchema = z.object({
  examName: z.string(),
  subject: z.object({
    name: z.string(),
    orderIndex: z.number().default(0),
  }),
  chapters: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    orderIndex: z.number().default(0),
    lessons: z.array(z.object({
      title: z.string(),
      content: z.string(),
      durationMinutes: z.number().optional(),
      difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
      notes: z.array(z.object({
        title: z.string(),
        content: z.string(),
        isHighlighted: z.boolean().default(false),
      })).default([]),
    })).default([]),
    mcqs: z.array(z.object({
      question: z.string(),
      optionA: z.string(),
      optionB: z.string(),
      optionC: z.string(),
      optionD: z.string(),
      correctOption: z.enum(['A', 'B', 'C', 'D']),
      explanation: z.string().optional(),
      difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
    })).default([]),
  })),
})

admin.post('/import/subject', async (c) => {
  const body = await c.req.json()
  const parsed = bulkSubjectImportSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ success: false, error: parsed.error.errors }, 400)
  }

  const data = parsed.data
  const database = db(c.env.DB)

  try {
    // 1. Find or create exam
    let [exam] = await database.select().from(schema.exams)
      .where(eq(schema.exams.name, data.examName))
      .limit(1)
    
    if (!exam) {
      [exam] = await database.insert(schema.exams)
        .values({ name: data.examName })
        .returning()
    }

    // 2. Create subject
    const [subject] = await database.insert(schema.subjects)
      .values({
        examId: exam.id,
        name: data.subject.name,
        orderIndex: data.subject.orderIndex,
      })
      .returning()

    let totalLessons = 0
    let totalMcqs = 0

    // 3. Create chapters with their content
    for (let chIdx = 0; chIdx < data.chapters.length; chIdx++) {
      const chapterData = data.chapters[chIdx]
      
      const [chapter] = await database.insert(schema.chapters)
        .values({
          subjectId: subject.id,
          title: chapterData.title,
          description: chapterData.description,
          orderIndex: chapterData.orderIndex || chIdx,
        })
        .returning()

      // Create lessons
      for (let lIdx = 0; lIdx < chapterData.lessons.length; lIdx++) {
        const lessonData = chapterData.lessons[lIdx]
        const [lesson] = await database.insert(schema.lessons)
          .values({
            chapterId: chapter.id,
            title: lessonData.title,
            content: lessonData.content,
            durationMinutes: lessonData.durationMinutes,
            difficulty: lessonData.difficulty,
            orderIndex: lIdx,
          })
          .returning()

        // Create notes
        if (lessonData.notes && lessonData.notes.length > 0) {
          await database.insert(schema.notes).values(
            lessonData.notes.map(note => ({
              lessonId: lesson.id,
              title: note.title,
              content: note.content,
              isHighlighted: note.isHighlighted,
            }))
          )
        }
        totalLessons++
      }

      // Create MCQs
      if (chapterData.mcqs && chapterData.mcqs.length > 0) {
        await database.insert(schema.mcqs).values(
          chapterData.mcqs.map(mcq => ({
            chapterId: chapter.id,
            question: mcq.question,
            optionA: mcq.optionA,
            optionB: mcq.optionB,
            optionC: mcq.optionC,
            optionD: mcq.optionD,
            correctOption: mcq.correctOption,
            explanation: mcq.explanation,
            difficulty: mcq.difficulty,
          }))
        )
        totalMcqs += chapterData.mcqs.length
      }
    }

    return c.json({
      success: true,
      data: {
        exam,
        subject,
        chaptersCount: data.chapters.length,
        lessonsCount: totalLessons,
        mcqsCount: totalMcqs,
      },
      message: `Successfully imported subject "${subject.name}" with ${data.chapters.length} chapters, ${totalLessons} lessons, and ${totalMcqs} MCQs`,
    }, 201)

  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message || 'Failed to import subject',
    }, 500)
  }
})

export default admin
