// Curated question templates the builder uses to scaffold instruments.
// In production these can be replaced/augmented by an AI generator.

export const demographicBank = [
  { text: 'What is your gender?', type: 'mcq', options: ['Female', 'Male', 'Prefer not to say'] },
  { text: 'What is your age bracket?', type: 'mcq', options: ['18–24', '25–34', '35–44', '45–54', '55+'] },
  { text: 'What is your highest level of education?', type: 'mcq', options: ['Diploma', 'Bachelor’s', 'Master’s', 'PhD'] },
  { text: 'Years of experience in your current field', type: 'mcq', options: ['< 1 yr', '1–3 yrs', '4–7 yrs', '8–15 yrs', '> 15 yrs'] },
  { text: 'In which county do you currently work or study?', type: 'short', options: [] },
];

export const likertStems = [
  'I clearly understand the purpose of {topic}.',
  '{topic} has a positive impact on my work/study.',
  'I am satisfied with the current state of {topic}.',
  'I would recommend improvements to {topic} to others.',
  '{topic} is well aligned with my goals and objectives.',
  'I find {topic} easy to engage with on a daily basis.',
  'I receive adequate support to implement {topic}.',
  'I have observed measurable benefits from {topic}.',
];

export const openEndedStems = [
  'In your own words, describe your experience with {topic}.',
  'What challenges, if any, have you encountered with {topic}?',
  'Which improvements would you most like to see regarding {topic}?',
  'Briefly explain how {topic} influences your day-to-day decisions.',
];

export const qualitativeStems = [
  'Walk me through a typical experience you have had with {topic}.',
  'What does {topic} mean to you personally?',
  'Can you describe a time when {topic} significantly affected you?',
  'What factors do you think shape attitudes towards {topic}?',
  'How would you describe the ideal version of {topic}?',
];

export const likertScale = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
