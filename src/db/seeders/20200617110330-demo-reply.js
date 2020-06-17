const faker = require('faker');

const replies = [];

for (let i = 0; i < 50; i += 1) {
  replies.push({
    content: faker.lorem.sentence(),
    commentId: faker.random.number({ min: 1, max: 52 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

for (let i = 0; i < 50; i += 1) {
  replies.push({
    content: faker.lorem.sentence(),
    commentId: faker.random.number({ min: 1, max: 52 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('replies', replies, {}),

  down: (queryInterface) => queryInterface.bulkDelete('replies', null, {}),
};
