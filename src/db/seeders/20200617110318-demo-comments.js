const faker = require('faker');

const comments = [];

for (let i = 0; i < 10; i += 1) {
  comments.push({
    content: faker.lorem.sentence(),
    userId: faker.random.number({
      min: 1,
      max: 12,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

for (let i = 0; i < 10; i += 1) {
  comments.push({
    content: faker.lorem.sentence(),
    userId: faker.random.number({
      min: 1,
      max: 12,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Comments', comments, {}),

  down: (queryInterface) => queryInterface.bulkDelete('Comments', null, {}),
};
