module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "likes",
    {
      quantity: {
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
