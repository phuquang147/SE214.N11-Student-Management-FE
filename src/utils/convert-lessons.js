const _ = require('lodash');

const convertLessons = (lessons) => {
  const mappedLessons = _.map(lessons, (row, rowIndex) => {
    return _.map(row, (cell, cellIndex) => {
      if (cell) {
        if (
          rowIndex > 0 &&
          lessons[rowIndex - 1][cellIndex] &&
          cell.subjectId === lessons[rowIndex - 1][cellIndex].subjectId &&
          cell.teacherId === lessons[rowIndex - 1][cellIndex].teacherId
        )
          return {
            type: 'used',
          };

        let rowSpan = 1;
        for (let i = rowIndex + 1; i < 10; i++) {
          if (
            lessons[i][cellIndex] &&
            lessons[i][cellIndex].subjectId === cell.subjectId &&
            lessons[i][cellIndex].teacherId === cell.teacherId
          )
            rowSpan++;
          else break;
        }

        return {
          type: 'start',
          start: rowIndex,
          ...cell,
          rowSpan: rowSpan,
        };
      }
      return cell;
    });
  });

  return mappedLessons;
};

export default convertLessons;
