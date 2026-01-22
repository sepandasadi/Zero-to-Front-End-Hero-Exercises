/**
 * questions.js - Question Bank
 * 60+ questions across 3 categories and 3 difficulty levels
 */

const QUESTION_BANK = [
  // ===== GENERAL KNOWLEDGE - EASY =====
  {
    id: 1,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0,
    explanation: "Paris is the capital and largest city of France."
  },
  {
    id: 2,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "How many days are there in a leap year?",
    answers: ["365", "366", "364", "367"],
    correctAnswer: 1,
    explanation: "A leap year has 366 days, with February having 29 days."
  },
  {
    id: 3,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "What color do you get when you mix red and white?",
    answers: ["Pink", "Purple", "Orange", "Brown"],
    correctAnswer: 0,
    explanation: "Mixing red and white creates pink."
  },
  {
    id: 4,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "How many continents are there?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America."
  },
  {
    id: 5,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correctAnswer: 1,
    explanation: "The Pacific Ocean is the largest and deepest ocean."
  },
  {
    id: 6,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "How many sides does a hexagon have?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: 1,
    explanation: "A hexagon has 6 sides."
  },
  {
    id: 7,
    category: "General Knowledge",
    difficulty: "Easy",
    question: "What is the opposite of 'hot'?",
    answers: ["Cold", "Warm", "Cool", "Freezing"],
    correctAnswer: 0,
    explanation: "The opposite of hot is cold."
  },

  // ===== GENERAL KNOWLEDGE - MEDIUM =====
  {
    id: 8,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "In which year did World War II end?",
    answers: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    explanation: "World War II ended in 1945."
  },
  {
    id: 9,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "What is the smallest country in the world?",
    answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    explanation: "Vatican City is the smallest country, with an area of about 0.44 km²."
  },
  {
    id: 10,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "Who painted the Mona Lisa?",
    answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctAnswer: 1,
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503-1519."
  },
  {
    id: 11,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "What is the currency of Japan?",
    answers: ["Yuan", "Won", "Yen", "Baht"],
    correctAnswer: 2,
    explanation: "The Japanese currency is the Yen (¥)."
  },
  {
    id: 12,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "How many teeth does an adult human have?",
    answers: ["28", "30", "32", "34"],
    correctAnswer: 2,
    explanation: "Adults have 32 teeth, including wisdom teeth."
  },
  {
    id: 13,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "What is the tallest mountain in the world?",
    answers: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
    correctAnswer: 2,
    explanation: "Mount Everest stands at 8,849 meters (29,032 feet) tall."
  },
  {
    id: 14,
    category: "General Knowledge",
    difficulty: "Medium",
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to its reddish appearance."
  },

  // ===== GENERAL KNOWLEDGE - HARD =====
  {
    id: 15,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "What is the world's longest river?",
    answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1,
    explanation: "The Nile River is approximately 6,650 km long."
  },
  {
    id: 16,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "In what year was the United Nations founded?",
    answers: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    explanation: "The United Nations was founded on October 24, 1945."
  },
  {
    id: 17,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "What is the rarest blood type?",
    answers: ["O negative", "AB negative", "B negative", "A negative"],
    correctAnswer: 1,
    explanation: "AB negative is the rarest blood type."
  },
  {
    id: 18,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "Which country has the most time zones?",
    answers: ["Russia", "USA", "France", "China"],
    correctAnswer: 2,
    explanation: "France has 12 time zones due to its overseas territories."
  },
  {
    id: 19,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "What is the speed of light in vacuum (approximately)?",
    answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
    correctAnswer: 0,
    explanation: "Light travels at approximately 300,000 kilometers per second."
  },
  {
    id: 20,
    category: "General Knowledge",
    difficulty: "Hard",
    question: "Who wrote '1984'?",
    answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: 1,
    explanation: "George Orwell wrote the dystopian novel '1984'."
  },

  // ===== SCIENCE - EASY =====
  {
    id: 21,
    category: "Science",
    difficulty: "Easy",
    question: "What is H2O?",
    answers: ["Water", "Hydrogen", "Oxygen", "Carbon dioxide"],
    correctAnswer: 0,
    explanation: "H2O is the chemical formula for water."
  },
  {
    id: 22,
    category: "Science",
    difficulty: "Easy",
    question: "What planet do we live on?",
    answers: ["Mars", "Venus", "Earth", "Jupiter"],
    correctAnswer: 2,
    explanation: "We live on planet Earth."
  },
  {
    id: 23,
    category: "Science",
    difficulty: "Easy",
    question: "How many legs does a spider have?",
    answers: ["6", "8", "10", "12"],
    correctAnswer: 1,
    explanation: "Spiders have 8 legs."
  },
  {
    id: 24,
    category: "Science",
    difficulty: "Easy",
    question: "What gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Plants absorb carbon dioxide during photosynthesis."
  },
  {
    id: 25,
    category: "Science",
    difficulty: "Easy",
    question: "What is the center of an atom called?",
    answers: ["Proton", "Electron", "Nucleus", "Neutron"],
    correctAnswer: 2,
    explanation: "The nucleus is the center of an atom."
  },
  {
    id: 26,
    category: "Science",
    difficulty: "Easy",
    question: "What force keeps us on the ground?",
    answers: ["Magnetism", "Gravity", "Friction", "Electricity"],
    correctAnswer: 1,
    explanation: "Gravity pulls objects toward Earth's center."
  },
  {
    id: 27,
    category: "Science",
    difficulty: "Easy",
    question: "What is the largest organ in the human body?",
    answers: ["Heart", "Brain", "Liver", "Skin"],
    correctAnswer: 3,
    explanation: "The skin is the largest organ of the human body."
  },

  // ===== SCIENCE - MEDIUM =====
  {
    id: 28,
    category: "Science",
    difficulty: "Medium",
    question: "What is the chemical symbol for gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    explanation: "Au is the chemical symbol for gold, from Latin 'aurum'."
  },
  {
    id: 29,
    category: "Science",
    difficulty: "Medium",
    question: "How many bones are in the adult human body?",
    answers: ["196", "206", "216", "226"],
    correctAnswer: 1,
    explanation: "Adults have 206 bones."
  },
  {
    id: 30,
    category: "Science",
    difficulty: "Medium",
    question: "What is the powerhouse of the cell?",
    answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correctAnswer: 2,
    explanation: "Mitochondria produce energy for the cell."
  },
  {
    id: 31,
    category: "Science",
    difficulty: "Medium",
    question: "What is the speed of sound in air at sea level?",
    answers: ["243 m/s", "343 m/s", "443 m/s", "543 m/s"],
    correctAnswer: 1,
    explanation: "Sound travels at approximately 343 meters per second in air."
  },
  {
    id: 32,
    category: "Science",
    difficulty: "Medium",
    question: "What is the most abundant gas in Earth's atmosphere?",
    answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
    correctAnswer: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
  },
  {
    id: 33,
    category: "Science",
    difficulty: "Medium",
    question: "What type of rock is formed from cooled lava?",
    answers: ["Sedimentary", "Metamorphic", "Igneous", "Volcanic"],
    correctAnswer: 2,
    explanation: "Igneous rocks form from cooled and solidified magma or lava."
  },
  {
    id: 34,
    category: "Science",
    difficulty: "Medium",
    question: "What is the smallest unit of life?",
    answers: ["Atom", "Molecule", "Cell", "Tissue"],
    correctAnswer: 2,
    explanation: "The cell is the smallest unit of life."
  },

  // ===== SCIENCE - HARD =====
  {
    id: 35,
    category: "Science",
    difficulty: "Hard",
    question: "What is Avogadro's number?",
    answers: ["6.022 × 10²³", "3.14 × 10²³", "9.81 × 10²³", "1.60 × 10²³"],
    correctAnswer: 0,
    explanation: "Avogadro's number is 6.022 × 10²³, representing one mole."
  },
  {
    id: 36,
    category: "Science",
    difficulty: "Hard",
    question: "What is the half-life of Carbon-14?",
    answers: ["5,730 years", "7,530 years", "3,570 years", "9,730 years"],
    correctAnswer: 0,
    explanation: "Carbon-14 has a half-life of approximately 5,730 years."
  },
  {
    id: 37,
    category: "Science",
    difficulty: "Hard",
    question: "What is the Heisenberg Uncertainty Principle related to?",
    answers: ["Thermodynamics", "Quantum mechanics", "Relativity", "Electromagnetism"],
    correctAnswer: 1,
    explanation: "The Uncertainty Principle is a fundamental concept in quantum mechanics."
  },
  {
    id: 38,
    category: "Science",
    difficulty: "Hard",
    question: "What is the pH of pure water at 25°C?",
    answers: ["6", "7", "8", "9"],
    correctAnswer: 1,
    explanation: "Pure water has a pH of 7, which is neutral."
  },
  {
    id: 39,
    category: "Science",
    difficulty: "Hard",
    question: "What particle has no electric charge?",
    answers: ["Proton", "Electron", "Neutron", "Positron"],
    correctAnswer: 2,
    explanation: "Neutrons have no electric charge."
  },
  {
    id: 40,
    category: "Science",
    difficulty: "Hard",
    question: "What is the most common isotope of hydrogen?",
    answers: ["Protium", "Deuterium", "Tritium", "Helium"],
    correctAnswer: 0,
    explanation: "Protium (¹H) is the most common hydrogen isotope."
  },

  // ===== HISTORY - EASY =====
  {
    id: 41,
    category: "History",
    difficulty: "Easy",
    question: "Who was the first President of the United States?",
    answers: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    correctAnswer: 2,
    explanation: "George Washington was the first U.S. President (1789-1797)."
  },
  {
    id: 42,
    category: "History",
    difficulty: "Easy",
    question: "In which year did the Titanic sink?",
    answers: ["1910", "1911", "1912", "1913"],
    correctAnswer: 2,
    explanation: "The Titanic sank on April 15, 1912."
  },
  {
    id: 43,
    category: "History",
    difficulty: "Easy",
    question: "What ancient civilization built the pyramids?",
    answers: ["Romans", "Greeks", "Egyptians", "Mayans"],
    correctAnswer: 2,
    explanation: "The ancient Egyptians built the pyramids."
  },
  {
    id: 44,
    category: "History",
    difficulty: "Easy",
    question: "Who discovered America in 1492?",
    answers: ["Amerigo Vespucci", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
    correctAnswer: 1,
    explanation: "Christopher Columbus reached the Americas in 1492."
  },
  {
    id: 45,
    category: "History",
    difficulty: "Easy",
    question: "What was the name of the first human-made satellite?",
    answers: ["Apollo 1", "Explorer 1", "Sputnik 1", "Voyager 1"],
    correctAnswer: 2,
    explanation: "Sputnik 1, launched by the USSR in 1957, was the first satellite."
  },
  {
    id: 46,
    category: "History",
    difficulty: "Easy",
    question: "Which country gifted the Statue of Liberty to the USA?",
    answers: ["England", "France", "Spain", "Italy"],
    correctAnswer: 1,
    explanation: "France gifted the Statue of Liberty to the United States in 1886."
  },
  {
    id: 47,
    category: "History",
    difficulty: "Easy",
    question: "What year did the Berlin Wall fall?",
    answers: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2,
    explanation: "The Berlin Wall fell on November 9, 1989."
  },

  // ===== HISTORY - MEDIUM =====
  {
    id: 48,
    category: "History",
    difficulty: "Medium",
    question: "Who was the longest-reigning British monarch?",
    answers: ["Queen Victoria", "Queen Elizabeth I", "Queen Elizabeth II", "King George III"],
    correctAnswer: 2,
    explanation: "Queen Elizabeth II reigned for over 70 years (1952-2022)."
  },
  {
    id: 49,
    category: "History",
    difficulty: "Medium",
    question: "What year did World War I begin?",
    answers: ["1912", "1913", "1914", "1915"],
    correctAnswer: 2,
    explanation: "World War I began in 1914."
  },
  {
    id: 50,
    category: "History",
    difficulty: "Medium",
    question: "Who wrote the Declaration of Independence?",
    answers: ["George Washington", "Benjamin Franklin", "John Adams", "Thomas Jefferson"],
    correctAnswer: 3,
    explanation: "Thomas Jefferson was the primary author of the Declaration of Independence."
  },
  {
    id: 51,
    category: "History",
    difficulty: "Medium",
    question: "What was the name of the first manned mission to the Moon?",
    answers: ["Apollo 10", "Apollo 11", "Apollo 12", "Gemini 12"],
    correctAnswer: 1,
    explanation: "Apollo 11 was the first manned mission to land on the Moon in 1969."
  },
  {
    id: 52,
    category: "History",
    difficulty: "Medium",
    question: "Which empire was ruled by Julius Caesar?",
    answers: ["Greek Empire", "Persian Empire", "Roman Empire", "Byzantine Empire"],
    correctAnswer: 2,
    explanation: "Julius Caesar was a Roman military and political leader."
  },
  {
    id: 53,
    category: "History",
    difficulty: "Medium",
    question: "What was the Renaissance?",
    answers: ["A war", "A cultural movement", "A plague", "A dynasty"],
    correctAnswer: 1,
    explanation: "The Renaissance was a cultural movement from the 14th-17th centuries."
  },
  {
    id: 54,
    category: "History",
    difficulty: "Medium",
    question: "Who was the first woman to win a Nobel Prize?",
    answers: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Ada Lovelace"],
    correctAnswer: 0,
    explanation: "Marie Curie won the Nobel Prize in Physics in 1903."
  },

  // ===== HISTORY - HARD =====
  {
    id: 55,
    category: "History",
    difficulty: "Hard",
    question: "In what year was the Magna Carta signed?",
    answers: ["1205", "1215", "1225", "1235"],
    correctAnswer: 1,
    explanation: "The Magna Carta was signed in 1215."
  },
  {
    id: 56,
    category: "History",
    difficulty: "Hard",
    question: "Who was the last pharaoh of ancient Egypt?",
    answers: ["Tutankhamun", "Ramses II", "Cleopatra VII", "Nefertiti"],
    correctAnswer: 2,
    explanation: "Cleopatra VII was the last pharaoh of Egypt (51-30 BC)."
  },
  {
    id: 57,
    category: "History",
    difficulty: "Hard",
    question: "What was the capital of the Byzantine Empire?",
    answers: ["Rome", "Athens", "Constantinople", "Alexandria"],
    correctAnswer: 2,
    explanation: "Constantinople (modern Istanbul) was the Byzantine capital."
  },
  {
    id: 58,
    category: "History",
    difficulty: "Hard",
    question: "Who led the Mongol Empire at its peak?",
    answers: ["Kublai Khan", "Genghis Khan", "Tamerlane", "Attila the Hun"],
    correctAnswer: 1,
    explanation: "Genghis Khan founded and led the Mongol Empire."
  },
  {
    id: 59,
    category: "History",
    difficulty: "Hard",
    question: "What year did the French Revolution begin?",
    answers: ["1787", "1788", "1789", "1790"],
    correctAnswer: 2,
    explanation: "The French Revolution began in 1789."
  },
  {
    id: 60,
    category: "History",
    difficulty: "Hard",
    question: "Who was the first Holy Roman Emperor?",
    answers: ["Otto I", "Charlemagne", "Frederick Barbarossa", "Charles V"],
    correctAnswer: 1,
    explanation: "Charlemagne was crowned the first Holy Roman Emperor in 800 AD."
  }
];

// Helper functions
function getQuestionsByCategory(category) {
  if (category === 'all') return QUESTION_BANK;
  return QUESTION_BANK.filter(q => q.category === category);
}

function getQuestionsByDifficulty(difficulty) {
  return QUESTION_BANK.filter(q => q.difficulty === difficulty);
}

function getQuestionsByCategoryAndDifficulty(category, difficulty) {
  let questions = QUESTION_BANK;
  if (category !== 'all') {
    questions = questions.filter(q => q.category === category);
  }
  questions = questions.filter(q => q.difficulty === difficulty);
  return questions;
}

