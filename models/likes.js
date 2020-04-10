module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "likes",
    {},
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
