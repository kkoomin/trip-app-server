module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "city",
    {
      name_kor: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      name_eng: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      desc: {
        type: DataTypes.STRING(500),
        allowNull: true
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
