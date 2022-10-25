import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const classes = [...Array(15)].map((_) => ({
  id: faker.datatype.uuid(),
  className: sample(['10A1', '10A2', '10A3', '11A1', '11A2', '11A3', '12A1', '12A2', '12A3']),
  grade: sample([10, 11, 12]),
  schoolYear: faker.datatype.number({ min: 2015, max: new Date().getFullYear() }),
  quantity: faker.datatype.number({ min: 30, max: 50 }),
  teacher: faker.name.fullName(),
}));

export default classes;
