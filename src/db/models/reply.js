module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      content: DataTypes.STRING,
      commentId: DataTypes.INTEGER,
    },
    {}
  );
  Reply.associate = (models) => {
    // associations can be defined here
    Reply.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'comment',
    });
    Reply.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Reply;
};
