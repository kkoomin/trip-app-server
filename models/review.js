module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "review",
    {
      title: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  );
};
