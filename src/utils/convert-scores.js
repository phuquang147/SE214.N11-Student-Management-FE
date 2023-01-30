const _ = require('lodash');

export function convertArrayToObjectKeys(studentScores) {
  if (studentScores.length === 0) return [];

  const newStudentScores = _.map(studentScores, (studentScore) => {
    const newScores = {
      _id: studentScore._id,
      student: studentScore.student,
      name: studentScore.student ? studentScore.student.name : '',
      classScore: studentScore.classScore,
      final: studentScore.scores.final,
      average: studentScore.scores.average,
    };

    for (let i = 0; i < 5; i++) {
      newScores[`oral${i + 1}`] = studentScore.scores.oral[i] ? studentScore.scores.oral[i] : null;
      newScores[`m15${i + 1}`] = studentScore.scores.m15[i] ? studentScore.scores.m15[i] : null;
      newScores[`m45${i + 1}`] = studentScore.scores.m45[i] ? studentScore.scores.m45[i] : null;
    }

    return newScores;
  });

  return newStudentScores;
}

export function convertObjectKeysToArray(scores) {
  const newScores = {
    name: scores.name,
    _id: scores._id,
    studentId: scores.student._id,
    final: scores.final,
    oral: [],
    m15: [],
    m45: [],
  };

  for (let i = 0; i < 5; i++) {
    newScores.oral.push(scores[`oral${i + 1}`] ? scores[`oral${i + 1}`] : null);
    newScores.m15.push(scores[`m15${i + 1}`] ? scores[`m15${i + 1}`] : null);
    newScores.m45.push(scores[`m45${i + 1}`] ? scores[`m45${i + 1}`] : null);
  }

  return newScores;
}
