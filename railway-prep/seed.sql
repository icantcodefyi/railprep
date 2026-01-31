-- Seed data for Railway Exam Prep
-- Run this after migrations: wrangler d1 execute DB --local --file=./seed.sql

-- ============ EXAMS ============
INSERT INTO exams (id, name, description, year) VALUES
('exam-rrb-ntpc', 'RRB NTPC', 'Non-Technical Popular Categories - Graduate and Under Graduate posts in various departments of Indian Railways', 2025),
('exam-group-d', 'RRB Group D', 'Level 1 posts like Track Maintainer, Helper, Porter and other entry-level railway positions', 2025),
('exam-alp', 'RRB ALP', 'Assistant Loco Pilot and Technician recruitment for Indian Railways', 2025),
('exam-je', 'RRB JE', 'Junior Engineer positions for various engineering disciplines in Indian Railways', 2025);

-- ============ SUBJECTS FOR RRB NTPC ============
INSERT INTO subjects (id, exam_id, name, order_index) VALUES
('subj-ntpc-math', 'exam-rrb-ntpc', 'Mathematics', 1),
('subj-ntpc-reasoning', 'exam-rrb-ntpc', 'General Intelligence & Reasoning', 2),
('subj-ntpc-gk', 'exam-rrb-ntpc', 'General Awareness', 3),
('subj-ntpc-ga', 'exam-rrb-ntpc', 'General Science', 4);

-- ============ SUBJECTS FOR GROUP D ============
INSERT INTO subjects (id, exam_id, name, order_index) VALUES
('subj-gd-math', 'exam-group-d', 'Mathematics', 1),
('subj-gd-reasoning', 'exam-group-d', 'General Intelligence & Reasoning', 2),
('subj-gd-gk', 'exam-group-d', 'General Awareness & Current Affairs', 3),
('subj-gd-gs', 'exam-group-d', 'General Science', 4);

-- ============ CHAPTERS FOR MATHEMATICS (NTPC) ============
INSERT INTO chapters (id, subject_id, title, description, order_index) VALUES
('ch-ntpc-percentage', 'subj-ntpc-math', 'Percentage', 'Learn percentage calculations, conversions, profit/loss applications', 1),
('ch-ntpc-profit-loss', 'subj-ntpc-math', 'Profit & Loss', 'Cost price, selling price, profit percentage calculations', 2),
('ch-ntpc-simple-interest', 'subj-ntpc-math', 'Simple Interest', 'Principal, rate, time calculations for simple interest', 3),
('ch-ntpc-compound-interest', 'subj-ntpc-math', 'Compound Interest', 'Compound interest formulas and applications', 4),
('ch-ntpc-time-work', 'subj-ntpc-math', 'Time & Work', 'Work efficiency, pipes and cisterns problems', 5),
('ch-ntpc-time-distance', 'subj-ntpc-math', 'Time, Speed & Distance', 'Speed calculations, relative speed, trains problems', 6),
('ch-ntpc-average', 'subj-ntpc-math', 'Average', 'Mean, weighted average calculations', 7),
('ch-ntpc-ratio', 'subj-ntpc-math', 'Ratio & Proportion', 'Ratios, proportions, and partnership problems', 8);

-- ============ CHAPTERS FOR REASONING (NTPC) ============
INSERT INTO chapters (id, subject_id, title, description, order_index) VALUES
('ch-ntpc-analogy', 'subj-ntpc-reasoning', 'Analogy', 'Word and number analogies, relationship patterns', 1),
('ch-ntpc-coding', 'subj-ntpc-reasoning', 'Coding-Decoding', 'Letter coding, number coding, mixed coding patterns', 2),
('ch-ntpc-series', 'subj-ntpc-reasoning', 'Number & Letter Series', 'Pattern recognition in number and alphabet sequences', 3),
('ch-ntpc-syllogism', 'subj-ntpc-reasoning', 'Syllogism', 'Logical deductions from given statements', 4),
('ch-ntpc-blood-relation', 'subj-ntpc-reasoning', 'Blood Relations', 'Family tree and relationship problems', 5),
('ch-ntpc-direction', 'subj-ntpc-reasoning', 'Direction Sense', 'Direction-based movement problems', 6);

-- ============ LESSONS FOR PERCENTAGE CHAPTER ============
INSERT INTO lessons (id, chapter_id, title, content, duration_minutes, difficulty, order_index) VALUES
('lesson-pct-intro', 'ch-ntpc-percentage', 'Introduction to Percentages', '## What is Percentage?

**Percentage** means "per hundred" or "out of 100". It is denoted by the symbol **%**.

### Basic Concept
- 1% = 1/100 = 0.01
- 50% = 50/100 = 0.5 = 1/2
- 100% = 100/100 = 1 (the whole)

### Why Percentages Matter
Percentages help us:
- Compare quantities of different sizes
- Calculate discounts and price changes
- Understand statistics and data
- Solve profit/loss problems

### Converting to Percentage
To convert a fraction to percentage:
**Percentage = (Value / Total) × 100**

Example: What percentage is 25 out of 200?
= (25/200) × 100 = 12.5%

### Converting from Percentage
To find the value from percentage:
**Value = (Percentage × Total) / 100**

Example: What is 15% of 300?
= (15 × 300) / 100 = 45', 15, 'EASY', 1),

('lesson-pct-fractions', 'ch-ntpc-percentage', 'Percentage-Fraction Conversions', '## Quick Conversion Table

Memorize these for fast calculations in exams:

| Fraction | Percentage |
|----------|------------|
| 1/2 | 50% |
| 1/3 | 33.33% |
| 2/3 | 66.67% |
| 1/4 | 25% |
| 3/4 | 75% |
| 1/5 | 20% |
| 2/5 | 40% |
| 3/5 | 60% |
| 4/5 | 80% |
| 1/6 | 16.67% |
| 1/8 | 12.5% |
| 1/10 | 10% |
| 1/12 | 8.33% |

### Shortcut Tips
- To find 10%: Divide by 10
- To find 5%: Half of 10%
- To find 1%: Divide by 100
- To find 25%: Divide by 4
- To find 33.33%: Divide by 3

### Practice Example
Find 37.5% of 400:
- 37.5% = 25% + 12.5% = 1/4 + 1/8 = 3/8
- 3/8 of 400 = 150', 20, 'EASY', 2),

('lesson-pct-increase-decrease', 'ch-ntpc-percentage', 'Percentage Increase & Decrease', '## Percentage Change Formula

### Percentage Increase
**% Increase = ((New - Original) / Original) × 100**

Example: Price increased from ₹200 to ₹250
= ((250 - 200) / 200) × 100 = 25%

### Percentage Decrease
**% Decrease = ((Original - New) / Original) × 100**

Example: Price decreased from ₹500 to ₹400
= ((500 - 400) / 500) × 100 = 20%

### Finding New Value After Increase
**New Value = Original × (1 + %/100)**

Example: Increase ₹400 by 15%
= 400 × (1 + 15/100) = 400 × 1.15 = ₹460

### Finding New Value After Decrease
**New Value = Original × (1 - %/100)**

Example: Decrease ₹600 by 20%
= 600 × (1 - 20/100) = 600 × 0.80 = ₹480

## Successive Percentage Changes

When a% and b% changes happen successively:
**Net Effect = a + b + (ab/100)%**

Example: 10% increase followed by 10% decrease
= 10 + (-10) + (10 × -10)/100 = 0 - 1 = **-1% (net decrease)**

⚠️ **Important**: Successive equal increase and decrease always results in net decrease!', 25, 'MEDIUM', 3),

('lesson-pct-population', 'ch-ntpc-percentage', 'Population & Depreciation Problems', '## Population Growth Formula

**P_n = P₀ × (1 + r/100)ⁿ**

Where:
- P_n = Population after n years
- P₀ = Initial population
- r = Growth rate %
- n = Number of years

### Example
A town has population 50,000. It grows at 10% per year. Find population after 2 years.

P₂ = 50,000 × (1 + 10/100)²
P₂ = 50,000 × (1.1)²
P₂ = 50,000 × 1.21
P₂ = **60,500**

## Depreciation Formula

For decreasing values (machines, vehicles):

**V_n = V₀ × (1 - r/100)ⁿ**

### Example
A car worth ₹5,00,000 depreciates at 15% per year. Find value after 2 years.

V₂ = 5,00,000 × (1 - 15/100)²
V₂ = 5,00,000 × (0.85)²
V₂ = 5,00,000 × 0.7225
V₂ = **₹3,61,250**

## Finding Past Values

To find original value when final value is known:
**P₀ = P_n / (1 + r/100)ⁿ**', 20, 'MEDIUM', 4);

-- ============ NOTES FOR PERCENTAGE LESSONS ============
INSERT INTO notes (id, lesson_id, title, content, is_highlighted) VALUES
('note-pct-1', 'lesson-pct-intro', 'Key Percentage Formulas', '• Percentage = (Value/Total) × 100
• Value = (Percentage × Total) / 100
• To convert decimal to %: Multiply by 100
• To convert % to decimal: Divide by 100', 1),

('note-pct-2', 'lesson-pct-fractions', 'Must-Remember Fractions', '• 1/2 = 50% • 1/3 = 33.33% • 1/4 = 25%
• 1/5 = 20% • 1/6 = 16.67% • 1/8 = 12.5%
• 1/10 = 10% • 1/12 = 8.33% • 3/4 = 75%', 1),

('note-pct-3', 'lesson-pct-increase-decrease', 'Successive Change Trap', '⚠️ 10% increase + 10% decrease ≠ 0%
Net effect = a + b + (ab/100)
= 10 - 10 + (-100/100) = -1%
Always results in NET DECREASE!', 1),

('note-pct-4', 'lesson-pct-population', 'Growth vs Depreciation', '📈 Growth: P = P₀(1 + r/100)ⁿ
📉 Depreciation: V = V₀(1 - r/100)ⁿ
Only difference is + or - sign!', 1);

-- ============ MCQS FOR PERCENTAGE CHAPTER ============
INSERT INTO mcqs (id, chapter_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES
('mcq-pct-1', 'ch-ntpc-percentage', 'What is 25% of 400?', '50', '100', '125', '200', 'B', '25% of 400 = (25/100) × 400 = 100. Quick method: 25% = 1/4, so 400/4 = 100', 'EASY'),

('mcq-pct-2', 'ch-ntpc-percentage', 'Express 3/8 as a percentage:', '35%', '37.5%', '38%', '40%', 'B', '3/8 = 3 ÷ 8 = 0.375 = 37.5%. Remember: 1/8 = 12.5%, so 3/8 = 3 × 12.5% = 37.5%', 'EASY'),

('mcq-pct-3', 'ch-ntpc-percentage', 'A number is increased by 20% and then decreased by 20%. The net change is:', 'No change', '4% increase', '4% decrease', '2% decrease', 'C', 'Net effect = a + b + (ab/100) = 20 + (-20) + (20 × -20)/100 = 0 - 4 = -4%. Net 4% decrease.', 'MEDIUM'),

('mcq-pct-4', 'ch-ntpc-percentage', 'If the price of sugar increases by 25%, by what percent should consumption be reduced to keep expenditure the same?', '20%', '25%', '30%', '15%', 'A', 'Reduction = (Increase × 100)/(100 + Increase) = (25 × 100)/125 = 20%', 'MEDIUM'),

('mcq-pct-5', 'ch-ntpc-percentage', 'A student scores 450 marks out of 600. What is the percentage?', '70%', '72%', '75%', '80%', 'C', '(450/600) × 100 = 75%. Quick: 450/600 = 45/60 = 3/4 = 75%', 'EASY'),

('mcq-pct-6', 'ch-ntpc-percentage', 'The population of a city increases by 10% every year. If current population is 1,00,000, what will it be after 2 years?', '1,20,000', '1,21,000', '1,10,000', '1,22,000', 'B', 'P = 1,00,000 × (1.1)² = 1,00,000 × 1.21 = 1,21,000', 'MEDIUM'),

('mcq-pct-7', 'ch-ntpc-percentage', 'Two numbers are respectively 20% and 50% more than a third number. What is the ratio of the two numbers?', '2:5', '4:5', '5:4', '5:2', 'B', 'Let third number = 100. First = 120, Second = 150. Ratio = 120:150 = 4:5', 'HARD'),

('mcq-pct-8', 'ch-ntpc-percentage', '60% of a number is added to 60, the result is the number itself. Find the number.', '100', '120', '150', '180', 'C', 'Let number = x. 0.6x + 60 = x → 60 = 0.4x → x = 150', 'MEDIUM'),

('mcq-pct-9', 'ch-ntpc-percentage', 'If A is 20% more than B, by what percent is B less than A?', '16.67%', '20%', '25%', '15%', 'A', 'B less than A = (Difference/A) × 100 = (20/120) × 100 = 16.67%', 'MEDIUM'),

('mcq-pct-10', 'ch-ntpc-percentage', 'A machine depreciates at 20% per annum. Its present value is ₹64,000. What was its value 2 years ago?', '₹80,000', '₹96,000', '₹1,00,000', '₹1,20,000', 'C', 'Original = Present/(1-r/100)² = 64000/(0.8)² = 64000/0.64 = ₹1,00,000', 'HARD');

-- ============ SAMPLE USER ============
INSERT INTO users (id, name, email) VALUES
('user-demo', 'Demo User', 'demo@railwayprep.com');
