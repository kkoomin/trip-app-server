module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "review",
    {
      content: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
