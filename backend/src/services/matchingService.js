// Matching algorithm for connecting mentors with learners
const matchSkills = (requestedSkill, mentorSkills) => {
  const normalizedRequest = requestedSkill.toLowerCase().trim();
  
  let bestMatch = null;
  let bestScore = 0;

  mentorSkills.forEach((skill) => {
    const score = calculateSimilarity(
      normalizedRequest,
      skill.skillName.toLowerCase()
    );
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = skill;
    }
  });

  return { match: bestMatch, score: bestScore };
};

// Simple similarity calculation using keyword matching
const calculateSimilarity = (str1, str2) => {
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  
  let matches = 0;
  words1.forEach((word) => {
    if (words2.includes(word)) {
      matches++;
    }
  });

  return matches / Math.max(words1.length, words2.length);
};

module.exports = { matchSkills, calculateSimilarity };
