"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Comment.associate = models => {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Comment.hasMany(models.Reply, {
      foreignKey: 'commentId',
      as: 'replies'
    });
  };

  return Comment;
};