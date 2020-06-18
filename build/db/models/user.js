"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'comments'
    });
  };

  return User;
};