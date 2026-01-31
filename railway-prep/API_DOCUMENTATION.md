# Railway Exam Prep - Content Population API

## Base URL
```
/api/admin
```

## Authentication
For production, add an API key header:
```
Authorization: Bearer YOUR_ADMIN_API_KEY
```

---

## 🚀 Quick Start - Bulk Import (Recommended)

### Import Entire Chapter (Single API Call)
**POST** `/api/admin/import/chapter`

This is the **most efficient** way to populate content. One call creates:
- Exam (if doesn't exist)
- Subject (if doesn't exist)
- Chapter
- All lessons with their notes
- All MCQs

```json
{
  "examName": "RRB NTPC",
  "subjectName": "Quantitative Aptitude",
  "chapter": {
    "title": "Percentage",
    "description": "Learn percentage calculations, conversions, and shortcuts",
    "orderIndex": 1
  },
  "lessons": [
    {
      "title": "Introduction to Percentages",
      "content": "## What is Percentage?\n\nPercentage means **per hundred**...",
      "durationMinutes": 15,
      "difficulty": "EASY",
      "orderIndex": 0,
      "notes": [
        {
          "title": "Key Formulas",
          "content": "• Percentage = (Value/Total) × 100\n• Value = (Percentage × Total) / 100",
          "isHighlighted": true
        },
        {
          "title": "Quick Tips",
          "content": "• 1/2 = 50%\n• 1/4 = 25%\n• 1/5 = 20%",
          "isHighlighted": false
        }
      ]
    },
    {
      "title": "Percentage Increase & Decrease",
      "content": "## Percentage Change Formula\n\n**% Increase = ((New - Original) / Original) × 100**...",
      "durationMinutes": 20,
      "difficulty": "MEDIUM",
      "orderIndex": 1,
      "notes": []
    }
  ],
  "mcqs": [
    {
      "question": "What is 25% of 400?",
      "optionA": "50",
      "optionB": "100",
      "optionC": "125",
      "optionD": "200",
      "correctOption": "B",
      "explanation": "25% of 400 = (25/100) × 400 = 100",
      "difficulty": "EASY"
    },
    {
      "question": "A number is increased by 20% and then decreased by 20%. The net change is:",
      "optionA": "No change",
      "optionB": "4% increase",
      "optionC": "4% decrease",
      "optionD": "2% decrease",
      "correctOption": "C",
      "explanation": "Net effect = a + b + (ab/100) = 20 - 20 - 4 = -4%",
      "difficulty": "MEDIUM"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exam": { "id": "...", "name": "RRB NTPC" },
    "subject": { "id": "...", "name": "Quantitative Aptitude" },
    "chapter": { "id": "...", "title": "Percentage" },
    "lessonsCount": 2,
    "mcqsCount": 2
  },
  "message": "Successfully imported chapter \"Percentage\" with 2 lessons and 2 MCQs"
}
```

---

### Import Entire Subject (Multiple Chapters)
**POST** `/api/admin/import/subject`

```json
{
  "examName": "RRB NTPC",
  "subject": {
    "name": "General Intelligence & Reasoning",
    "orderIndex": 2
  },
  "chapters": [
    {
      "title": "Analogy",
      "description": "Word and number analogies",
      "orderIndex": 0,
      "lessons": [
        {
          "title": "Introduction to Analogies",
          "content": "## What is Analogy?\n\nAnalogy means similarity...",
          "durationMinutes": 15,
          "difficulty": "EASY",
          "notes": [
            {
              "title": "Types of Analogies",
              "content": "1. Word Analogies\n2. Number Analogies\n3. Letter Analogies",
              "isHighlighted": true
            }
          ]
        }
      ],
      "mcqs": [
        {
          "question": "Book : Read :: Food : ?",
          "optionA": "Cook",
          "optionB": "Eat",
          "optionC": "Taste",
          "optionD": "Digest",
          "correctOption": "B",
          "explanation": "Book is for reading, Food is for eating",
          "difficulty": "EASY"
        }
      ]
    },
    {
      "title": "Coding-Decoding",
      "description": "Letter and number coding patterns",
      "orderIndex": 1,
      "lessons": [...],
      "mcqs": [...]
    }
  ]
}
```

---

## 📝 Individual Resource APIs

### Exams

**GET** `/api/admin/exams` - List all exams
**POST** `/api/admin/exams` - Create exam
```json
{
  "name": "RRB NTPC",
  "description": "Non-Technical Popular Categories",
  "year": 2025
}
```

**PUT** `/api/admin/exams/:id` - Update exam
**DELETE** `/api/admin/exams/:id` - Delete exam

---

### Subjects

**GET** `/api/admin/subjects?examId=xxx` - List subjects (optional filter by exam)
**POST** `/api/admin/subjects` - Create subject
```json
{
  "examId": "exam-uuid-here",
  "name": "Mathematics",
  "orderIndex": 1
}
```

**PUT** `/api/admin/subjects/:id` - Update subject
**DELETE** `/api/admin/subjects/:id` - Delete subject

---

### Chapters

**GET** `/api/admin/chapters?subjectId=xxx` - List chapters
**POST** `/api/admin/chapters` - Create chapter
```json
{
  "subjectId": "subject-uuid-here",
  "title": "Percentage",
  "description": "Learn percentage calculations",
  "orderIndex": 1
}
```

**PUT** `/api/admin/chapters/:id` - Update chapter
**DELETE** `/api/admin/chapters/:id` - Delete chapter

---

### Lessons

**GET** `/api/admin/lessons?chapterId=xxx` - List lessons
**POST** `/api/admin/lessons` - Create lesson
```json
{
  "chapterId": "chapter-uuid-here",
  "title": "Introduction to Percentages",
  "content": "## What is Percentage?\n\nMarkdown content here...",
  "durationMinutes": 15,
  "difficulty": "EASY",
  "orderIndex": 0
}
```

**PUT** `/api/admin/lessons/:id` - Update lesson
**DELETE** `/api/admin/lessons/:id` - Delete lesson

---

### Notes

**GET** `/api/admin/notes?lessonId=xxx` - List notes
**POST** `/api/admin/notes` - Create note
```json
{
  "lessonId": "lesson-uuid-here",
  "title": "Key Formulas",
  "content": "• Formula 1\n• Formula 2",
  "isHighlighted": true
}
```

**PUT** `/api/admin/notes/:id` - Update note
**DELETE** `/api/admin/notes/:id` - Delete note

---

### MCQs

**GET** `/api/admin/mcqs?chapterId=xxx` - List MCQs
**POST** `/api/admin/mcqs` - Create single MCQ
```json
{
  "chapterId": "chapter-uuid-here",
  "question": "What is 25% of 400?",
  "optionA": "50",
  "optionB": "100",
  "optionC": "125",
  "optionD": "200",
  "correctOption": "B",
  "explanation": "25% of 400 = 100",
  "difficulty": "EASY"
}
```

**POST** `/api/admin/mcqs/bulk` - Create multiple MCQs
```json
[
  { "chapterId": "...", "question": "...", ... },
  { "chapterId": "...", "question": "...", ... }
]
```

**PUT** `/api/admin/mcqs/:id` - Update MCQ
**DELETE** `/api/admin/mcqs/:id` - Delete MCQ

---

## 📊 Validation Rules

| Field | Rules |
|-------|-------|
| `name/title` | Required, max 200 chars |
| `description` | Optional, max 500 chars |
| `content` | Required for lessons/notes, Markdown format |
| `difficulty` | Enum: `EASY`, `MEDIUM`, `HARD` |
| `correctOption` | Enum: `A`, `B`, `C`, `D` |
| `durationMinutes` | Number, 1-120 |
| `orderIndex` | Number, default 0 |
| `isHighlighted` | Boolean, default false |

---

## 🔄 Content Pipeline Workflow

### Recommended Flow for AI Content Generation:

1. **Generate content by chapter** using `/api/admin/import/chapter`
2. Each chapter should include:
   - 3-5 lessons covering the topic progressively
   - 2-4 notes per lesson (key formulas, tips, traps)
   - 10-20 MCQs per chapter with varied difficulty

### Example Pipeline:

```python
# Your AI content generator
import requests

BASE_URL = "https://your-app.com/api/admin"

def populate_chapter(exam_name, subject_name, chapter_data):
    response = requests.post(
        f"{BASE_URL}/import/chapter",
        json={
            "examName": exam_name,
            "subjectName": subject_name,
            "chapter": chapter_data["chapter"],
            "lessons": chapter_data["lessons"],
            "mcqs": chapter_data["mcqs"]
        },
        headers={"Authorization": "Bearer YOUR_API_KEY"}
    )
    return response.json()

# Generate and populate
chapter_content = your_ai_generator.generate_chapter(
    exam="RRB NTPC",
    subject="Mathematics", 
    topic="Simple Interest"
)

result = populate_chapter("RRB NTPC", "Mathematics", chapter_content)
print(f"Created: {result['message']}")
```

---

## 🌐 Public API Endpoints (User-Facing)

Base URL: `/api/v1`

| Endpoint | Description |
|----------|-------------|
| `GET /exams` | List all exams with subject counts |
| `GET /exams/:id` | Exam details with subjects |
| `GET /subjects/:id` | Subject with chapters |
| `GET /chapters/:id` | Chapter with lessons list |
| `GET /chapters/:id/mcqs` | MCQs for practice |
| `GET /lessons/:id` | Lesson content with notes |
| `POST /mcqs/:id/check` | Check MCQ answer |
| `POST /progress/lesson` | Update lesson progress |
| `GET /users/:id/progress` | User stats |
| `POST /bookmarks` | Add bookmark |
| `DELETE /bookmarks` | Remove bookmark |
| `GET /search?q=term` | Search content |
