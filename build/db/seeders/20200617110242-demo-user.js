"use strict";

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    name: 'seun',
    email: 'seun@mail.com',
    password: '$2a$06$loVt9DxXF97PGJxkjyfJj.PVHNz5FUjNhU4yXIzTK4HQ2EesmuoPi',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'obayomi',
    email: 'oba@mail.com',
    password: '$2a$06$loVt9DxXF97PGJxkjyfJj.PVHNz5FUjNhU4yXIzTK4HQ2EesmuoPi',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'martins',
    email: 'mart@mail.com',
    password: '$2a$06$loVt9DxXF97PGJxkjyfJj.PVHNz5FUjNhU4yXIzTK4HQ2EesmuoPi',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.dropAllTables()
};