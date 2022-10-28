import { faker } from '@faker-js/faker';
import { convertArrayToObjectKeys } from '~/utils/convert-scores';

const scores = [...Array(20)].map((_, index) =>
  convertArrayToObjectKeys({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    oral: [...Array(5)].map((_, index) => Math.floor(Math.random() * 11)),
    m15: [...Array(5)].map((_, index) => Math.floor(Math.random() * 11)),
    m45: [...Array(5)].map((_, index) => Math.floor(Math.random() * 11)),
    final: Math.floor(Math.random() * 11),
  }),
);

export default scores;
