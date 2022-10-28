export function convertArrayToObjectKeys(scores) {
  const newScores = {
    name: scores.name,
    id: scores.id,
    final: scores.final,
  };

  for (let i = 0; i < 5; i++) {
    newScores[`oral${i + 1}`] = scores.oral[i];
    newScores[`m15${i + 1}`] = scores.m15[i];
    newScores[`m45${i + 1}`] = scores.m45[i];
  }

  return newScores;
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
