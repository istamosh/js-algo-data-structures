// get average of score array
function getAverage(scores) {
  let sum = 0;
  /*   for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  } */
  for (const score of scores) {
    sum += score;
  }
  return sum / scores.length;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

// get alphabetical grade based on score
function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));

// check passing grade (other than F)
function hasPassingGrade(score) {
  if (getGrade(score) != "F") {
    return true;
  } else return false;
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

// inform average class grade, then inform student grade and tell if they passed or not
function studentMsg(totalScores, studentScore) {
  if (hasPassingGrade(studentScore)) {
    return (
      "Class average: " +
      getAverage(totalScores) +
      ". Your grade: " +
      getGrade(studentScore) +
      ". You passed the course."
    );
  } else {
    return (
      "Class average: " +
      getAverage(totalScores) +
      ". Your grade: " +
      getGrade(studentScore) +
      ". You failed the course."
    );
  }
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
