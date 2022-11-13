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
      newScores[`oral${i + 1}`] = studentScore.scores.oral[i];
      newScores[`m15${i + 1}`] = studentScore.scores.m15[i];
      newScores[`m45${i + 1}`] = studentScore.scores.m45[i];
    }

    return newScores;
  });

  return newStudentScores;
}

export function convertObjectKeysToArray(scores) {
  const newScores = {
    name: scores.name,
    id: scores.id,
    final: scores.final,
    oral: [],
    m15: [],
    m45: [],
  };

  for (let i = 0; i < 5; i++) {
    newScores.oral.push(scores[`oral${i + 1}`]);
    newScores.m15.push(scores[`m15${i + 1}`]);
    newScores.m45.push(scores[`m45${i + 1}`]);
  }

  return newScores;
}
