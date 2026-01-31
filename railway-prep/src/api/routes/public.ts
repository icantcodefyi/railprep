import { Hono } from 'hono'
import { eq, and, desc, sql, count } from 'drizzle-orm'
import { db } from '../database'
import * as schema from '../database/schema'

const publicApi = new Hono()

// ============ EXAMS ============

publicApi.get('/exams', async (c) => {
  const database = db(c.env.DB)
  
  const examsWithCounts = await database
    .select({
      id: schema.exams.id,
      name: schema.exams.name,
      description: schema.exams.description,
      year: schema.exams.year,
      iconUrl: schema.exams.iconUrl,
      createdAt: schema.exams.createdAt,
      subjectCount: sql<number>`(SELECT COUNT(*) FROM subjects WHERE subjects.exam_id = exams.id)`,
    })
    .from(schema.exams)
  
  return c.json({ success: true, data: examsWithCounts })
})

publicApi.get('/exams/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  
  const [exam] = await database.select().from(schema.exams).where(eq(schema.exams.id, id))
  if (!exam) return c.json({ success: false, error: 'Exam not found' }, 404)
  
  const subjects = await database
    .select({
      id: schema.subjects.id,
      name: schema.subjects.name,
      orderIndex: schema.subjects.orderIndex,
      iconUrl: schema.subjects.iconUrl,
      chapterCount: sql<number>`(SELECT COUNT(*) FROM chapters WHERE chapters.subject_id = subjects.id)`,
    })
    .from(schema.subjects)
    .where(eq(schema.subjects.examId, id))
    .orderBy(schema.subjects.orderIndex)
  
  return c.json({ success: true, data: { ...exam, subjects } })
})

// ============ SUBJECTS ============

publicApi.get('/subjects/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  
  const [subject] = await database.select().from(schema.subjects).where(eq(schema.subjects.id, id))
  if (!subject) return c.json({ success: false, error: 'Subject not found' }, 404)
  
  const [exam] = await database.select().from(schema.exams).where(eq(schema.exams.id, subject.examId))
  
  const chapters = await database
    .select({
      id: schema.chapters.id,
      title: schema.chapters.title,
      description: schema.chapters.description,
      orderIndex: schema.chapters.orderIndex,
      lessonCount: sql<number>`(SELECT COUNT(*) FROM lessons WHERE lessons.chapter_id = chapters.id)`,
      mcqCount: sql<number>`(SELECT COUNT(*) FROM mcqs WHERE mcqs.chapter_id = chapters.id)`,
    })
    .from(schema.chapters)
    .where(eq(schema.chapters.subjectId, id))
    .orderBy(schema.chapters.orderIndex)
  
  return c.json({ success: true, data: { ...subject, exam, chapters } })
})

// ============ CHAPTERS ============

publicApi.get('/chapters/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  
  const [chapter] = await database.select().from(schema.chapters).where(eq(schema.chapters.id, id))
  if (!chapter) return c.json({ success: false, error: 'Chapter not found' }, 404)
  
  const [subject] = await database.select().from(schema.subjects).where(eq(schema.subjects.id, chapter.subjectId))
  const [exam] = await database.select().from(schema.exams).where(eq(schema.exams.id, subject.examId))
  
  const lessons = await database
    .select({
      id: schema.lessons.id,
      title: schema.lessons.title,
      durationMinutes: schema.lessons.durationMinutes,
      difficulty: schema.lessons.difficulty,
      orderIndex: schema.lessons.orderIndex,
    })
    .from(schema.lessons)
    .where(eq(schema.lessons.chapterId, id))
    .orderBy(schema.lessons.orderIndex)
  
  const mcqCount = await database
    .select({ count: sql<number>`count(*)` })
    .from(schema.mcqs)
    .where(eq(schema.mcqs.chapterId, id))
  
  return c.json({
    success: true,
    data: {
      ...chapter,
      subject,
      exam,
      lessons,
      mcqCount: mcqCount[0]?.count || 0,
    },
  })
})

// ============ LESSONS ============

publicApi.get('/lessons/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  
  const [lesson] = await database.select().from(schema.lessons).where(eq(schema.lessons.id, id))
  if (!lesson) return c.json({ success: false, error: 'Lesson not found' }, 404)
  
  const [chapter] = await database.select().from(schema.chapters).where(eq(schema.chapters.id, lesson.chapterId))
  const [subject] = await database.select().from(schema.subjects).where(eq(schema.subjects.id, chapter.subjectId))
  const [exam] = await database.select().from(schema.exams).where(eq(schema.exams.id, subject.examId))
  
  const notes = await database
    .select()
    .from(schema.notes)
    .where(eq(schema.notes.lessonId, id))
  
  // Get next/prev lessons
  const allLessons = await database
    .select({ id: schema.lessons.id, title: schema.lessons.title, orderIndex: schema.lessons.orderIndex })
    .from(schema.lessons)
    .where(eq(schema.lessons.chapterId, lesson.chapterId))
    .orderBy(schema.lessons.orderIndex)
  
  const currentIndex = allLessons.findIndex(l => l.id === id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  
  return c.json({
    success: true,
    data: {
      ...lesson,
      chapter,
      subject,
      exam,
      notes,
      prevLesson,
      nextLesson,
    },
  })
})

// ============ MCQs (Practice Mode) ============

publicApi.get('/chapters/:id/mcqs', async (c) => {
  const id = c.req.param('id')
  const limit = parseInt(c.req.query('limit') || '10')
  const offset = parseInt(c.req.query('offset') || '0')
  const difficulty = c.req.query('difficulty')
  
  const database = db(c.env.DB)
  
  let query = database
    .select({
      id: schema.mcqs.id,
      question: schema.mcqs.question,
      optionA: schema.mcqs.optionA,
      optionB: schema.mcqs.optionB,
      optionC: schema.mcqs.optionC,
      optionD: schema.mcqs.optionD,
      difficulty: schema.mcqs.difficulty,
    })
    .from(schema.mcqs)
    .where(eq(schema.mcqs.chapterId, id))
    .limit(limit)
    .offset(offset)
  
  const mcqs = await query
  
  const totalCount = await database
    .select({ count: sql<number>`count(*)` })
    .from(schema.mcqs)
    .where(eq(schema.mcqs.chapterId, id))
  
  return c.json({
    success: true,
    data: mcqs,
    pagination: {
      total: totalCount[0]?.count || 0,
      limit,
      offset,
    },
  })
})

publicApi.get('/mcqs/:id', async (c) => {
  const id = c.req.param('id')
  const database = db(c.env.DB)
  
  const [mcq] = await database.select().from(schema.mcqs).where(eq(schema.mcqs.id, id))
  if (!mcq) return c.json({ success: false, error: 'MCQ not found' }, 404)
  
  return c.json({ success: true, data: mcq })
})

// Check MCQ answer (returns correct answer and explanation)
publicApi.post('/mcqs/:id/check', async (c) => {
  const id = c.req.param('id')
  const { selectedOption, userId } = await c.req.json()
  
  const database = db(c.env.DB)
  
  const [mcq] = await database.select().from(schema.mcqs).where(eq(schema.mcqs.id, id))
  if (!mcq) return c.json({ success: false, error: 'MCQ not found' }, 404)
  
  const isCorrect = selectedOption === mcq.correctOption
  
  // Record attempt if userId provided
  if (userId) {
    await database.insert(schema.mcqAttempts).values({
      userId,
      mcqId: id,
      selectedOption,
      isCorrect,
    })
  }
  
  return c.json({
    success: true,
    data: {
      isCorrect,
      correctOption: mcq.correctOption,
      explanation: mcq.explanation,
    },
  })
})

// ============ USER PROGRESS ============

publicApi.post('/progress/lesson', async (c) => {
  const { userId, lessonId, progressPercent } = await c.req.json()
  
  if (!userId || !lessonId) {
    return c.json({ success: false, error: 'userId and lessonId required' }, 400)
  }
  
  const database = db(c.env.DB)
  
  // Upsert progress
  const existing = await database
    .select()
    .from(schema.userLessonProgress)
    .where(and(
      eq(schema.userLessonProgress.userId, userId),
      eq(schema.userLessonProgress.lessonId, lessonId)
    ))
    .limit(1)
  
  if (existing.length > 0) {
    const [updated] = await database
      .update(schema.userLessonProgress)
      .set({
        progressPercent,
        completedAt: progressPercent >= 100 ? new Date() : null,
      })
      .where(eq(schema.userLessonProgress.id, existing[0].id))
      .returning()
    return c.json({ success: true, data: updated })
  } else {
    const [created] = await database
      .insert(schema.userLessonProgress)
      .values({
        userId,
        lessonId,
        progressPercent,
        completedAt: progressPercent >= 100 ? new Date() : null,
      })
      .returning()
    return c.json({ success: true, data: created }, 201)
  }
})

publicApi.get('/users/:userId/progress', async (c) => {
  const userId = c.req.param('userId')
  const database = db(c.env.DB)
  
  // Get lesson progress
  const lessonProgress = await database
    .select()
    .from(schema.userLessonProgress)
    .where(eq(schema.userLessonProgress.userId, userId))
  
  // Get MCQ stats
  const mcqStats = await database
    .select({
      total: sql<number>`count(*)`,
      correct: sql<number>`sum(case when is_correct = 1 then 1 else 0 end)`,
    })
    .from(schema.mcqAttempts)
    .where(eq(schema.mcqAttempts.userId, userId))
  
  return c.json({
    success: true,
    data: {
      completedLessons: lessonProgress.filter(p => p.completedAt).length,
      totalLessonsStarted: lessonProgress.length,
      mcqsAttempted: mcqStats[0]?.total || 0,
      mcqsCorrect: mcqStats[0]?.correct || 0,
      accuracy: mcqStats[0]?.total ? Math.round((mcqStats[0].correct / mcqStats[0].total) * 100) : 0,
    },
  })
})

// ============ BOOKMARKS ============

publicApi.get('/users/:userId/bookmarks', async (c) => {
  const userId = c.req.param('userId')
  const type = c.req.query('type') as 'LESSON' | 'NOTE' | 'MCQ' | undefined
  
  const database = db(c.env.DB)
  
  let query = database.select().from(schema.bookmarks).where(eq(schema.bookmarks.userId, userId))
  
  if (type) {
    query = query.where(eq(schema.bookmarks.type, type)) as typeof query
  }
  
  const bookmarks = await query.orderBy(desc(schema.bookmarks.createdAt))
  
  return c.json({ success: true, data: bookmarks })
})

publicApi.post('/bookmarks', async (c) => {
  const { userId, type, referenceId } = await c.req.json()
  
  if (!userId || !type || !referenceId) {
    return c.json({ success: false, error: 'userId, type, and referenceId required' }, 400)
  }
  
  const database = db(c.env.DB)
  
  // Check if already bookmarked
  const existing = await database
    .select()
    .from(schema.bookmarks)
    .where(and(
      eq(schema.bookmarks.userId, userId),
      eq(schema.bookmarks.type, type),
      eq(schema.bookmarks.referenceId, referenceId)
    ))
    .limit(1)
  
  if (existing.length > 0) {
    return c.json({ success: true, data: existing[0], message: 'Already bookmarked' })
  }
  
  const [bookmark] = await database
    .insert(schema.bookmarks)
    .values({ userId, type, referenceId })
    .returning()
  
  return c.json({ success: true, data: bookmark }, 201)
})

publicApi.delete('/bookmarks', async (c) => {
  const { userId, type, referenceId } = await c.req.json()
  
  const database = db(c.env.DB)
  
  await database
    .delete(schema.bookmarks)
    .where(and(
      eq(schema.bookmarks.userId, userId),
      eq(schema.bookmarks.type, type),
      eq(schema.bookmarks.referenceId, referenceId)
    ))
  
  return c.json({ success: true, message: 'Bookmark removed' })
})

// ============ SEARCH ============

publicApi.get('/search', async (c) => {
  const query = c.req.query('q')
  if (!query || query.length < 2) {
    return c.json({ success: false, error: 'Search query must be at least 2 characters' }, 400)
  }
  
  const database = db(c.env.DB)
  const searchTerm = `%${query}%`
  
  // Search lessons
  const lessons = await database
    .select({
      id: schema.lessons.id,
      title: schema.lessons.title,
      type: sql<string>`'lesson'`,
    })
    .from(schema.lessons)
    .where(sql`${schema.lessons.title} LIKE ${searchTerm} OR ${schema.lessons.content} LIKE ${searchTerm}`)
    .limit(10)
  
  // Search MCQs
  const mcqs = await database
    .select({
      id: schema.mcqs.id,
      title: schema.mcqs.question,
      type: sql<string>`'mcq'`,
    })
    .from(schema.mcqs)
    .where(sql`${schema.mcqs.question} LIKE ${searchTerm}`)
    .limit(10)
  
  // Search chapters
  const chapters = await database
    .select({
      id: schema.chapters.id,
      title: schema.chapters.title,
      type: sql<string>`'chapter'`,
    })
    .from(schema.chapters)
    .where(sql`${schema.chapters.title} LIKE ${searchTerm}`)
    .limit(10)
  
  return c.json({
    success: true,
    data: {
      lessons,
      mcqs,
      chapters,
    },
  })
})

export default publicApi
