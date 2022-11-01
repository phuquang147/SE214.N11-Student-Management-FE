import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const teachers = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  birthdate: faker.date.birthdate(),
  address: faker.address.streetAddress(),
  gender: sample(['Nam', 'Nữ']),
  status: sample(['Đang dạy', 'Đã nghỉ']),
  subject: sample(['Toán', 'Văn']),
}));

export default teachers;
