module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      content: DataTypes.STRING,
      commentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Reply.associate = (models) => {
    // associations can be defined here
    Reply.belongsTo(models.Comment, {
      foreignKey: 'replyId',
      as: 'comment',
    });
    Reply.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return Reply;
};
