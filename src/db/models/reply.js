module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      content: DataTypes.STRING,
    },
    {}
  );
  Reply.associate = (models) => {
    // associations can be defined here
    Reply.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'comment',
      onDelete: 'CASCADE',
    });
  };
  return Reply;
};
